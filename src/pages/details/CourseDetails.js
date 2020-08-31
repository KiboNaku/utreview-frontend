import React from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import NotFound from './../not-found/NotFound'
import CourseInfo from './_course/CourseInfo/CourseInfo';
import CourseTopics from './_course/CourseInfo/CourseTopics';
import CourseRatings from './_course/CourseInfo/CourseRatings';
import CourseProfs from './_course/CourseProfs/CourseProfs';
import CourseReviews from './_course/CourseReviews/CourseReviews';
import CourseAddReview from './_course/CourseReviews/CourseAddReview';
import CourseRequisites from './_course/CourseInfo/CourseRequisites'
import CourseSchedule from './_course/CourseSchedule/CourseSchedule'
import { getCourseInfo, getCourseId } from './_course/CourseFunctions'
import Loading from './../_utils/Loading'
import { withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './Details.css'
import './CourseDetails.css'
import MetaTags from 'react-meta-tags';

const propTypes = {
    // specific title for this page, dependent on course name, used in meta tags
    title: PropTypes.string.isRequired,

    // main title (UT Review), used in meta tags
    mainTitle: PropTypes.string.isRequired,

    // specific description for this page, dependent on the course, used in meta tags
    description: PropTypes.string.isRequired,

    // title of page if not found, used in meta tags
    notFoundPageTitle: PropTypes.string.isRequired,

    // description of page if not found, used in meta tags
    notFoundPageDescription: PropTypes.string.isRequired,

    // prop sent when page accessed through the React Link component
    location: PropTypes.shape({

        // url of the link
        pathname: PropTypes.string,

        // stores information not included in the pathname
        state: PropTypes.shape({

            // id of the course being displayed
            courseId: PropTypes.number
        }),
    })
}

class CourseDetails extends React.Component {

    constructor(props) {
        super(props)

        // reference to the CourseReviews component
        this.reviewRef = React.createRef()

        this.state = {
            // specific title for this page, dependent on course name, used in meta tags
            title: null,

            // stores basic course information (name, dept, number, description, median grade)
            // also stores info about topic courses and cross-listed courses
            courseInfo: null,

            // stores user rating information about the course (approval, eCIS, workload, difficulty, usefulness)
            courseRatings: null,

            // stores course pre-requisites and restrictions information
            courseRequisites: null,

            // stores information about profs that teach the course
            courseProfs: null,

            // stores information about the ratings and comments for the course
            courseReviews: null,

            // stores information about when this course is scheduled
            courseSchedule: null,

            // is set to true, when all the api requests to fetch the course information have finished
            loaded: false,

            // is set to false, when the user inputs the wrong link for a course
            validCourse: true,

            // true if the course is a parent topic course, false otherwise
            isParent: null,

            // the url of this page for the specific course
            courseURL: props.location.pathname,
        }

        this.handleScrollToReview = this.handleScrollToReview.bind(this)

    }

    // scrolls to review component
    handleScrollToReview() {
        const scrollToRef = () => window.scrollTo(0, this.reviewRef.current.offsetTop - 100)
        scrollToRef()
    }

    componentDidUpdate() {
        // handles rerendering if the user clicks on a link to a different course page
        const courseURL = this.props.location.pathname
        if (courseURL !== this.state.courseURL) {
            this.setState({ loaded: false, courseURL: courseURL })
            this.componentDidMount()
        }
    }

    componentDidMount() {

        // get user email if logged in
        let loggedIn = false
        let email = ''
        const token = localStorage.usertoken
        if (token) {
            const decoded = jwt_decode(token)
            loggedIn = true
            email = decoded.identity.email
        }

        // find courseId, either from url or from props
        let courseId = null
        if (this.props.location.state === undefined) {

            // state is undefined, so parse url to find course name
            let coursePath = window.location.pathname.split("/").pop()
            let courseString = {
                courseString: coursePath
            }

            // use course name to find the course id
            getCourseId(courseString).then(res => {
                if (res.error) {
                    this.setState({ validCourse: false })
                } else {

                    // after finding course id, fetch course details info
                    courseId = res.courseId
                    const course = {
                        courseId: courseId,
                        loggedIn: loggedIn,
                        userEmail: email
                    }
                    this.courseDetailsRequest(course)
                }
            })

        } else {
            // state is defined, so check the state to see if it has courseId
            if (this.props.location.state.courseId === undefined) {

                // courseId is undefined, so parse url to find course name
                let coursePath = window.location.pathname.split("/").pop()
                let courseString = {
                    courseString: coursePath
                }

                // use course name to find the course id
                getCourseId(courseString).then(res => {
                    if (res.error) {
                        this.setState({ validCourse: false })
                    } else {

                        // after finding course id, fetch course details info
                        courseId = res.courseId
                        const course = {
                            courseId: courseId,
                            loggedIn: loggedIn,
                            userEmail: email
                        }
                        this.courseDetailsRequest(course)
                    }
                })

            } else {

                // get courseId from state, then fetch course details info
                courseId = this.props.location.state.courseId
                const course = {
                    courseId: courseId,
                    loggedIn: loggedIn,
                    userEmail: email
                }
                this.courseDetailsRequest(course)

            }
        }
    }

    // makes an api request to fetch all course details information
    courseDetailsRequest = (course) => {

        getCourseInfo(course).then(res => {
            if (res.error) {
                alert(res.error)
            } else {

                // create new Date() object for each review date
                let courseRevs = res.course_reviews.map(review => {
                    let dateTimeParsed = review.date.split(' ')
                    let dateParsed = dateTimeParsed[0].split('-')
                    let dateString = dateParsed[1] + "/" + dateParsed[2] + "/" + dateParsed[0]
                    let date = dateString + " " + dateTimeParsed[1]
                    return {
                        ...review,
                        date: new Date(date).getTime()
                    }
                })

                // set state variables with data fetched from the backend
                const { courseDept, courseNum, courseTitle } = res.course_info
                this.setState({
                    title: courseDept + " " + courseNum + " - " + courseTitle,
                    courseInfo: res.course_info,
                    courseRatings: res.course_rating,
                    courseRequisites: res.course_requisites,
                    courseSchedule: res.course_schedule,
                    courseProfs: res.course_profs,
                    courseReviews: courseRevs,
                    isParent: res.is_parent,
                    loaded: true
                })
            }
        })
    }

    render() {

        // if (this.state.courseInfo !== null) {
        //     axios
        //         .post('/api/utplus_course', {
        //             courseDept: this.state.courseInfo.courseDept,
        //             courseNum: this.state.courseInfo.courseNum
        //         })
        //         .then(response => {
        //             console.log(response.data)
        //         })
        // }

        let loading = <Loading />
        let childTopics = null
        let crossListed = null
        let content = null

        // only display if course details info has loaded
        if (this.state.loaded) {

            // child topics if the course is a parent topic
            childTopics = (
                <div className="course-topics">
                    <CourseTopics
                        {...this.state.courseInfo}
                    />
                </div>
            )

            // cross listed courses, if any
            crossListed = this.state.courseSchedule.futureSem && this.state.courseSchedule.futureSem.length > 0 ? this.state.courseSchedule.futureSem[0].crossListed : null

            // main course details content
            content = (
                <div className="CourseDetails">
                    <div className="course-stats">
                        <CourseInfo
                            {...this.state.courseInfo} crossListed={crossListed} handleScrollToReview={this.handleScrollToReview}
                        />
                        <CourseRatings
                            {...this.state.courseRatings}
                        />
                    </div>
                    <div className="course-details-block-wrapper">
                        <div className="topics-requisites">
                            {this.state.isParent ? childTopics : null}
                            <CourseRequisites
                                {...this.state.courseRequisites}
                            />
                        </div>
                        <div className="prof-schedule-tables">
                            <div className="course-tables">
                                <CourseProfs courseInfo={this.state.courseInfo} courseProfs={this.state.courseProfs} key={this.state.courseProfs} />
                            </div>
                            <CourseSchedule courseSchedule={this.state.courseSchedule} key={this.state.courseSchedule.currentSem} />
                        </div>
                    </div>
                    <div className="course-reviews-block-wrapper">
                        <div className="add-review-wrapper">
                            <CourseAddReview
                                {...this.state.courseInfo}
                            />
                        </div>
                        <div ref={this.reviewRef} className="course-reviews-wrapper">
                            <CourseReviews courseReviews={this.state.courseReviews} key={this.state.courseReviews} />
                        </div>
                    </div>
                </div>
            )

        }

        return (
            <div>
                <MetaTags>
                    <title>{this.state.title ? this.state.title : this.props.title} | {this.props.mainTitle}</title>
                    <meta name="description" content={this.props.description} />
                </MetaTags>
                <main className="course-details-main">
                    <div className="main-sub">
                        {this.state.validCourse ? (this.state.loaded ? content : loading) : <NotFound title={this.props.notFoundPageTitle} mainTitle={this.props.mainTitle} description={this.props.notFoundPageDescription} />}
                    </div>
                </main>
            </div>
        );
    }
}

CourseDetails.propTypes = propTypes

export default withRouter(CourseDetails);