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
            id: 1,
            courseDept: "EE",
            courseNum: "302",
            courseTitle: "Topics in Electrical Engineering",
            courseDes: "The scope and nature of professional activities of electrical engineers, including problem-solving techniques; analysis and design methods; engineering professional ethics; analysis of analog resistive circuits, including Thevenin/Norton equivalents, mesh analysis, and nodal analysis; and operational amplifiers (DC response). Substantial teamwork is required for laboratory work in this course. Three lecture hours and two laboratory hours a week for one semester.",
            topicId: 2,
            topicNum: 0,
            parentId: 1,
            parentTitle: "Topics in Electrical Engineering",
            topicsList: [
                {
                    'id': 2,
                    'topicNum': 1,
                    'title': "Introduction to Electrical Engineering (Circuits)"
                },
                {
                    'id': 3,
                    'topicNum': 2,
                    'title': "Introduction to Electrical Engineering (Electricity)"
                },
            ]
        }

        const courseRatings = {
            percentLiked: 50,
            difficulty: 4.3,
            usefulness: 3.2,
            workload: 4.9,
            eCIS: 4.3,
            numRatings: 2
        }

        const courseProfs = [
            {
                id: 1,
                firstName: 'Emanuel',
                lastName: 'Tutuc',
                percentLiked: 70,
                eCIS: 4.2,
                clear: 3.4,
                engaging: 4.9,
                grading: 2.5

            },
            {
                id: 2,
                firstName: 'Yale',
                lastName: 'Patt',
                percentLiked: 32,
                eCIS: 3.6,
                clear: 3.4,
                engaging: 4.9,
                grading: 2.5
            },
            {
                id: 3,
                firstName: 'Seth',
                lastName: 'Bank',
                percentLiked: 85,
                eCIS: 4.8,
                clear: 3.4,
                engaging: 4.9,
                grading: 2.5
            },
        ]

        const courseRequisites = {
            preReqs: "Credit with a grade of at least C- or registration for Mathematics 408C or 408K",
            restrictions: "Electrical Engineering 302 and 302H may not both be counted"
        }

        const currentSem = [
            {
                id: 1,
                uniqueNum: 12345,
                maxEnrollment: 60,
                seatsTaken: 30,
                timeFrom: "9:00 AM",
                timeTo: "10:30 AM",
                days: "M W",
                location: "EER 5.820",
                profId: 1,
                profFirst: 'Yale',
                profLast: 'Patt',
                semester: "Fall",
                year: 2020,
                crossListed: [
                    {
                        'id': 5,
                        'dept': "ECE",
                        'num': "319",
                        'title': "Introduction to Electrical Engineering",
                        'topicNum': 0
                    }
                ]
            },
            {
                id: 2,
                uniqueNum: 12345,
                maxEnrollment: 60,
                seatsTaken: 30,
                timeFrom: "9:00 AM",
                timeTo: "10:30 AM",
                days: "M W",
                location: "EER 5.820",
                profId: 1,
                profFirst: 'Yale',
                profLast: 'Patt',
                semester: "Fall",
                year: 2020,
                crossListed: [
                    {
                        'id': 5,
                        'dept': "ECE",
                        'num': "319",
                        'title': "Introduction to Electrical Engineering",
                        'topicNum': 0
                    }
                ]
            },
            {
                id: 3,
                uniqueNum: 12345,
                maxEnrollment: 60,
                seatsTaken: 30,
                timeFrom: "9:00 AM",
                timeTo: "10:30 AM",
                days: "M W",
                location: "EER 5.820",
                profId: 1,
                profFirst: 'Yale',
                profLast: 'Patt',
                semester: "Fall",
                year: 2020,
                crossListed: [
                    {
                        'id': 5,
                        'dept': "ECE",
                        'num': "319",
                        'title': "Introduction to Electrical Engineering",
                        'topicNum': 0
                    }
                ]
            }
        ]

        const courseSchedule = {
            currentSem: currentSem,
            futureSem: currentSem
        }

        const courseReviews = [
            {
                id: 1,
                comments: "I fucking hated this class",
                approval: false,
                usefulness: 1,
                difficulty: 5,
                workload: 5,
                userMajor: 'Electrical and Computer Engineering',
                profilePic: "default.jpg",
                profId: 1,
                profFirst: 'Yale',
                profLast: 'Patt',
                grade: "A",
                numLiked: 2,
                numDisliked: 0,
                likePressed: false,
                dislikePressed: false,
                date: new Date("2019-12-23"),
                semester: "Fall",
                year: 2019,
            },
            {
                id: 2,
                comments: "This was the most inspiring class of my life",
                approval: true,
                usefulness: 5,
                difficulty: 2,
                workload: 3,
                userMajor: 'Electrical and Computer Engineering',
                profilePic: "default.jpg",
                profId: 2,
                profFirst: 'Seth',
                profLast: 'Bank',
                grade: "B-",
                numLiked: 1,
                numDisliked: 2,
                likePressed: true,
                dislikePressed: false,
                date: new Date("2018-06-23"),
                semester: "Spring",
                year: 2019,
            },
            {
                id: 3,
                comments: "Why did I even take this class",
                approval: false,
                usefulness: 1,
                difficulty: 2,
                workload: 3,
                userMajor: 'Business Honors',
                profilePic: "default.jpg",
                profId: 3,
                profFirst: 'Emanuel',
                profLast: 'Tutuc',
                numLiked: 5,
                numDisliked: 2,
                grade: "B",
                likePressed: false,
                dislikePressed: true,
                date: new Date("2020-07-23"),
                semester: "Spring",
                year: 2020,
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
            isParent: courseInfo.topicNum == 0,
            courseURL: props.location.pathname
        }

    }

    componentDidUpdate (){
        const courseURL = this.props.location.pathname
        console.log(this.state.courseURL)
        console.log(courseURL)
        if(courseURL !== this.state.courseURL){
            this.setState({loaded: false, courseURL: courseURL})
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
        console.log(this.props.location)
        if(this.props.location.state === undefined){
            console.log("State undefined")
            let coursePath = window.location.pathname.split("/").pop()
            let courseString = {
                courseString: coursePath
            }
            getCourseId(courseString).then(res => {
                if (res.error) {
                    alert(res.error)
                    this.setState({validProf: false})
                } else {
                    courseId = res.courseId
                    console.log(courseId)
                    const course = {
                        courseId: courseId,
                        loggedIn: loggedIn,
                        userEmail: email
                    }
                    this.courseDetailsRequest(course)
                }
            })
        }else{
            if(this.props.location.state.courseId === undefined){
                let coursePath = window.location.pathname.split("/").pop()
                let courseString = {
                    courseString: coursePath
                }
                getCourseId(courseString).then(res => {
                    if (res.error) {
                        alert(res.error)
                        this.setState({validProf: false})
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
            }else{
                courseId = this.props.location.state.courseId
                console.log(" Course id " + courseId)
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
        console.log("course details request")
        getCourseInfo(course).then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                console.log("Got course info")
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

    render() {

        let loading = <Loading />
    
        
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
                <div className="topics-requisites">
                    {this.state.isParent ? childTopics : null}
                    <CourseRequisites
                        {...this.state.courseRequisites}
                    />
                </div>
                
                <div className="course-tables">
                    <CourseProfs courseProfs = {this.state.courseProfs} key={this.state.courseProfs} />
                </div>

                <CourseSchedule courseSchedule = {this.state.courseSchedule} key={this.state.courseSchedule.currentSem}/>
                <CourseAddReview
                    {...this.state.courseInfo}
                />
                <CourseReviews courseReviews = {this.state.courseReviews} key={this.state.courseReviews}/>
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