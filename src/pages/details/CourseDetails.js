import React from 'react';
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

class CourseDetails extends React.Component {
    constructor(props) {
        super(props)

        this.reviewRef = React.createRef()

        this.state = {
            title: null,
            courseInfo: null,
            courseRatings: null,
            courseRequisites: null,
            courseProfs: null,
            courseReviews: null,
            courseSchedule: null,
            loaded: false,
            validCourse: true,
            isParent: null,
            courseURL: props.location.pathname,
        }

        this.handleScrollToReview = this.handleScrollToReview.bind(this)

    }

    handleScrollToReview() {
        const scrollToRef = () => window.scrollTo(0, this.reviewRef.current.offsetTop - 100)
        scrollToRef()
    }

    componentDidUpdate() {
        const courseURL = this.props.location.pathname
        if (courseURL !== this.state.courseURL) {
            this.setState({ loaded: false, courseURL: courseURL })
            this.componentDidMount()
        }
    }

    componentDidMount() {

        let loggedIn = false
        let email = ''
        const token = localStorage.usertoken
        if (token) {
            const decoded = jwt_decode(token)
            loggedIn = true
            email = decoded.identity.email
        }

        let courseId = null
        if (this.props.location.state === undefined) {

            let coursePath = window.location.pathname.split("/").pop()
            let courseString = {
                courseString: coursePath
            }

            getCourseId(courseString).then(res => {
                if (res.error) {
                    this.setState({ validCourse: false })
                } else {
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
            if (this.props.location.state.courseId === undefined) {

                let coursePath = window.location.pathname.split("/").pop()
                let courseString = {
                    courseString: coursePath
                }

                getCourseId(courseString).then(res => {
                    if (res.error) {
                        this.setState({ validCourse: false })
                    } else {
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

    courseDetailsRequest = (course) => {

        getCourseInfo(course).then(res => {
            if (res.error) {
                alert(res.error)
            } else {
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

        let loading = <Loading />

        let childTopics = null
        let crossListed = null
        let content = null

        if (this.state.loaded) {
            childTopics = (
                <div className="course-topics">
                    <CourseTopics
                        {...this.state.courseInfo}
                    />
                </div>
            )

            crossListed = this.state.courseSchedule.futureSem && this.state.courseSchedule.futureSem.length > 0 ? this.state.courseSchedule.futureSem[0].crossListed : null

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
                        {this.state.validCourse ? (this.state.loaded ? content : loading) : <NotFound title={this.props.notFoundPageTitle} mainTitle={this.props.mainTitle} description={this.props.notFoundPageDescription}/>}
                    </div>
                </main>
            </div>
        );
    }
}

export default withRouter(CourseDetails);