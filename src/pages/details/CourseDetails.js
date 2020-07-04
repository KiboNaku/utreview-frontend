import React from 'react';
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
import { withRouter, Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './CourseDetails.css'

class CourseDetails extends React.Component {
    constructor(props) {
        super(props)
        const courseInfo = {
            courseDep: "EE",
            courseNo: "302",
            courseName: "Introduction to Electrical Engineering",
            courseDes: "The scope and nature of professional activities of electrical engineers, including problem-solving techniques; analysis and design methods; engineering professional ethics; analysis of analog resistive circuits, including Thevenin/Norton equivalents, mesh analysis, and nodal analysis; and operational amplifiers (DC response). Substantial teamwork is required for laboratory work in this course. Three lecture hours and two laboratory hours a week for one semester."
        }

        const courseRatings = {
            percentLiked: null,
            difficulty: 4.3,
            usefulness: null,
            workload: 4.9,
            eCIS: 4.3
        }

        const courseProfs = [
            {
                id: 1,
                name: 'Emanuel Tutuc',
                percentLiked: 70,
                eCIS: 4.2,
                clear: 3.4,
                engaging: 4.9,
                grading: 2.5

            },
            {
                id: 2,
                name: 'Yale Patt',
                percentLiked: 32,
                eCIS: 3.6,
                clear: 3.4,
                engaging: 4.9,
                grading: 2.5
            },
            {
                id: 3,
                name: 'Seth Bank',
                percentLiked: 85,
                eCIS: 4.8,
                clear: 3.4,
                engaging: 4.9,
                grading: 2.5
            },
        ]

        const courseRequisites = {
            preRequisites: [
                <p>
                    No prerequisites for EE 302
                </p>
            ],
            coRequisites: [
                <p>
                    Credit with a grade of at least C- or registration for
                    <Link to="/course-results/M 408C"> Mathematics 408C </Link>
                    or
                    <Link to="/course-results/M 408K"> 408K </Link>
                </p>
            ],
            antiRequisites: [
                <p>
                    <Link to="/course-results/EE 302"> Electrical Engineering 302 </Link>
                     and
                     <Link to="/course-results/EE 302H"> 302H </Link>
                     may not both be counted
                </p>
            ]
        }

        const courseSchedule = [
            {
                uniqueNo: 12345,
                maxEnrollment: 60,
                seatsTaken: 30,
                timeFrom: 900,
                timeTo: 1030,
                days: "M W",
                location: "EER 5.820",
                professor: "Yale Patt"
            },
            {
                uniqueNo: 12345,
                maxEnrollment: 60,
                seatsTaken: 30,
                timeFrom: 900,
                timeTo: 1030,
                days: "M W",
                location: "EER 5.820",
                professor: "Yale Patt"
            },
            {
                uniqueNo: 12345,
                maxEnrollment: 60,
                seatsTaken: 30,
                timeFrom: 900,
                timeTo: 1030,
                days: "M W",
                location: "EER 5.820",
                professor: "Yale Patt"
            }
        ]

        const courseReviews = [
            {
                key: 1,
                review: "I fucking hated this class",
                liked: false,
                usefulness: 1,
                difficulty: 5,
                workload: 5,
                userMajor: 'Electrical and Computer Engineering',
                profPic: "https://images.dog.ceo/breeds/pembroke/n02113023_12785.jpg",
                profName: 'Yale Patt',
                numLiked: 2,
                numDisliked: 0,
                likePressed: false,
                dislikePressed: false
            },
            {
                key: 2,
                review: "This was the most inspiring class of my life",
                liked: true,
                usefulness: 5,
                difficulty: 2,
                workload: 3,
                userMajor: 'Electrical and Computer Engineering',
                profPic: "https://images.dog.ceo/breeds/pembroke/n02113023_12785.jpg",
                profName: 'Seth Bank',
                numLiked: 1,
                numDisliked: 2,
                likePressed: true,
                dislikePressed: false
            },
            {
                key: 3,
                review: "Why did I even take this class",
                liked: false,
                usefulness: 1,
                difficulty: 2,
                workload: 3,
                userMajor: 'Business Honors',
                profPic: "https://images.dog.ceo/breeds/pembroke/n02113023_12785.jpg",
                profName: 'Emanuel Tutuc',
                numLiked: 5,
                numDisliked: 2,
                likePressed: false,
                dislikePressed: true
            },
        ]

        this.state = {
            courseInfo: courseInfo,
            courseRatings: courseRatings,
            courseRequisites: courseRequisites,
            courseProfs: courseProfs,
            courseReviews: courseReviews,
            courseSchedule: courseSchedule,
            loaded: false,
            validCourse: true,
            isParent: false
        }

        const courseId = null
        if(this.props.location.state === null){
            let coursePath = window.location.pathname.split("/").pop()
            let courseString = {
                courseString: coursePath
            }
            getCourseId(courseString).then(res => {
                if (res.error) {
                    alert(res.error)
                    this.setState({
                        validCourse: false
                    })
                } else {
                    courseId = res.courseId
                }
            })
        }else{
            courseId = this.props.location.state.courseId
        }

        if(this.state.validCourse){
            let loggedIn = false
            let email = ''
            const token = localStorage.usertoken
            if (token) {
                const decoded = jwt_decode(token)
                loggedIn = true
                email = decoded.identity.email
            }

            const course = {
                courseId: courseId,
                loggedIn: loggedIn,
                userEmail: email
            }
            
            getCourseInfo(course).then(res => {
                if (res.error) {
                    alert(res.error)
                } else {
                    let courseRevs = res.course_reviews.map(review => {
                        return {
                            ...review,
                            date: new Date(review.date)
                        }
                    })
                    this.setState({
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

    }

    componentDidMount() {

    }

    render() {

        let loading = (
            <Loading />
        )
        
        let invalidCourse = (
            <h1> This course doesn't exist </h1>
        )

        let childTopics = (
            <div className="course-topics">
                <CourseTopics 
                    {...this.state.courseInfo}
                />
            </div>
        )

        let addReview = (
            <CourseAddReview
                {...this.state.courseInfo}
            />
        )

        let content = (
            <div className="CourseDetails">
                <div className="course-stats">
                    <CourseInfo
                        {...this.state.courseInfo}
                    />
                    <CourseRatings
                        {...this.state.courseRatings}
                    />

                </div>
                {this.state.isParent ? childTopics : <br/>}
                <div className="course-tables">

                    <CourseRequisites
                        {...this.state.courseRequisites}
                    />
                    <CourseProfs {...this.state} />
                </div>

                <CourseSchedule {...this.state} />
                {this.state.isParent ? addReview : <br/>}
                <CourseReviews {...this.state} />
            </div>
        )
        return (
            <main className="course-details-main">
                <div className="main-sub">
                    {this.state.validCourse ? (this.state.loaded ? content : loading): invalidCourse}
                </div>

            </main>

        );
    }

}

export default withRouter(CourseDetails);