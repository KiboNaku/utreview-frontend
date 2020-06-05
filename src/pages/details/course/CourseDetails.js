import React from 'react';
import CourseInfo from './CourseInfo';
import CourseRatings from './CourseRatings';
import CourseProfs from './CourseProfs';
import CourseReviews from './CourseReviews';
import CourseAddReview from './CourseAddReview';
import CourseRequisites from './CourseRequisites'
import {getCourseInfo, getCourseProfs} from './CourseFunctions'
import Loading from './../../_components/Loading'
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
                name: 'Emanuel Tutuc',
                percentLiked: 70,
                eCIS: 4.2
            },
            {   
                name: 'Yale Patt',
                percentLiked: 32,
                eCIS: 3.6
            },
            {   
                name: 'Seth Bank',
                percentLiked: 85,
                eCIS: 4.8
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
            loaded: false
        }

        const { courseNum } = this.props.location.state
        console.log(courseNum)
        let loggedIn = false
        let email = ''
        const token = localStorage.usertoken
        if(token){
            const decoded = jwt_decode(token)
            loggedIn = true
            email = decoded.identity.email
        }
        
        const course = {
            courseNum: courseNum,
            loggedIn: loggedIn,
            userEmail: email
        }
        console.log("hello")
        getCourseInfo(course).then(res => {
            if (res.error) {
                alert(res.error)
            }else{
                let courseData = res.course_info
                let courseRating = res.course_rating
                let courseProfessors = res.course_profs
                let courseRevs = res.course_reviews
                this.setState({courseInfo: courseData, 
                    courseRatings: courseRating, 
                    courseProfs: courseProfessors,
                    courseReviews: courseRevs,
                    loaded: true})
            }
        })
    }

    componentDidMount() {
        
    }

    render() {

        let loading = (
            <Loading />
        )
        

        let content = (
            <div className="CourseDetails">
                <div className="d-flex">
                    <CourseRatings
                        {...this.state.courseRatings}
                    />
                    <CourseInfo
                        {...this.state.courseInfo}
                    />

                </div>
                <div className="d-flex">
                    
                    <CourseRequisites
                        {...this.state.courseRequisites}
                    />
                    <CourseProfs {...this.state}/>
                </div>

                <CourseAddReview
                    {...this.state.courseInfo}
                />
                <CourseReviews {...this.state}/>
            </div>
        )
        return (
            <div>
                {this.state.loaded ? content: loading}
            </div>
            
        );
    }

}

export default withRouter(CourseDetails);