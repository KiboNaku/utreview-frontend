import React from 'react';
import NotFound from './../not-found/NotFound'
import ProfInfo from './_prof/ProfInfo/ProfInfo';
import ProfRatings from './_prof/ProfInfo/ProfRatings';
import ProfCourses from './_prof/ProfCourses/ProfCourses';
import ProfReviews from './_prof/ProfReviews/ProfReviews';
import ProfAddReview from './_prof/ProfReviews/ProfAddReview';
import ProfSchedule from './_prof/ProfSchedule/ProfSchedule'
import { getProfInfo, getProfId } from './_prof/ProfFunctions'
import Loading from './../_utils/Loading'
import { withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './Details.css'
import './ProfDetails.css'

class ProfDetails extends React.Component {
    constructor(props) {
        super(props)
        const profInfo = {
            id: 1,
            firstName: "Yale",
            lastName: "Patt"
        }

        const profRatings = {
            percentLiked: 67,
            clear: 4.3,
            engaging: 2.3,
            grading: 4.9,
            eCIS: 4.3,
            numRatings: 10
        }

        const profCourses = [
            {
                id: 1,
                courseDept: "EE",
                courseNum: "302",
                topicNum: 0,
                percentLiked: 70,
                eCIS: 4.2,
                difficulty: 3.4,
                usefulness: 4.9,
                workload: 2.5
            },
            {
                id: 2,
                courseDept: "EE",
                courseNum: "460N",
                topicNum: -1,
                percentLiked: 32,
                eCIS: 3.6,
                difficulty: 3.4,
                usefulness: 4.9,
                workload: 2.5
            },
            {
                id: 3,
                courseDept: "EE",
                courseNum: "306",
                topicNum: 1,
                percentLiked: 85,
                eCIS: 4.8,
                difficulty: 3.4,
                usefulness: 4.9,
                workload: 2.5
            },
        ]

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
                courseId: 1,
                courseDept: 'EE',
                courseNum: '302',
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
                courseId: 1,
                courseDept: 'EE',
                courseNum: '302',
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
                courseId: 1,
                courseDept: 'EE',
                courseNum: '302',
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

        const profSchedule = {
            currentSem: currentSem,
            futureSem: currentSem
        }

        const profReviews = [
            {
                id: 1,
                comments: "I fucking hated this class",
                approval: false,
                clear: 1,
                engaging: 5,
                grading: 5,
                userMajor: 'Electrical and Computer Engineering',
                profilePic: "corgi1.jpg",
                courseId: 1,
                courseDept: 'EE',
                courseNum: '302',
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
                clear: 5,
                engaging: 2,
                grading: 3,
                userMajor: 'Electrical and Computer Engineering',
                profilePic: "corgi1.jpg",
                courseId: 2,
                courseDept: 'EE',
                courseNum: '306',
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
                clear: 1,
                engaging: 2,
                grading: 3,
                userMajor: 'Business Honors',
                profilePic: "corgi1.jpg",
                courseId: 3,
                courseDept: 'EE',
                courseNum: '460N',
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

        this.reviewRef = React.createRef()

        this.state = {
            profInfo: profInfo,
            profRatings: profRatings,
            profCourses: profCourses,
            profReviews: profReviews,
            profSchedule: profSchedule,
            validProf: true,
            loaded: false
        }    

        this.handleScrollToReview = this.handleScrollToReview.bind(this)

    }

    handleScrollToReview(){
        const scrollToRef = () => window.scrollTo(0, this.reviewRef.current.offsetTop - 100)
        scrollToRef()
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

        let profId = null
        if(this.props.location.state === undefined){

            let profPath = window.location.pathname.split("/").pop()
            let profString = {
                profString: profPath
            }

            getProfId(profString).then(res => {
                if (res.error) {
                    this.setState({validProf: false})
                } else {
                    profId = res.profId
                    const prof = {
                        profId: profId,
                        loggedIn: loggedIn,
                        userEmail: email
                    }
                    this.profDetailsRequest(prof)
                }
            })       

        }else{
            if(this.props.location.state.profId === undefined){

                let profPath = window.location.pathname.split("/").pop()
                let profString = {
                    profString: profPath
                }

                getProfId(profString).then(res => {
                    if (res.error) {
                        this.setState({validProf: false})
                    } else {
                        profId = res.profId
                        const prof = {
                            profId: profId,
                            loggedIn: loggedIn,
                            userEmail: email
                        }
                        this.profDetailsRequest(prof)
                    }
                })

            }else{
                profId = this.props.location.state.profId
                const prof = {
                    profId: profId,
                    loggedIn: loggedIn,
                    userEmail: email
                }
                this.profDetailsRequest(prof)
            }
        }

    }

    profDetailsRequest = (prof) => {

        getProfInfo(prof).then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                let profRevs = res.prof_reviews.map(review => {
                    let dateTimeParsed = review.date.split(' ')
                    let dateParsed = dateTimeParsed[0].split('-')
                    let dateString = dateParsed[1] + "/" + dateParsed[2] + "/" + dateParsed[0]
                    let date = dateString + " " + dateTimeParsed[1]
                    return {
                        ...review,
                        date: new Date(date).getTime()
                    }
                })
                this.setState({
                    profInfo: res.prof_info,
                    profRatings: res.prof_rating,
                    profSchedule: res.prof_schedule,
                    profCourses: res.prof_courses,
                    profReviews: profRevs,
                    loaded: true
                })
            }
        })
    }

    render() {

        let loading = <Loading />

        let content = (
            <div className="profDetails">
                <div className="prof-stats">
                    <ProfInfo
                        {...this.state.profInfo} handleScrollToReview={this.handleScrollToReview}
                    />
                    <ProfRatings
                        {...this.state.profRatings}
                    />
                </div>
                <div className="prof-tables">
                    <ProfCourses profInfo={this.state.profInfo} profCourses={this.state.profCourses} key={this.state.profCourses}/>
                </div>

                <ProfSchedule profSchedule={this.state.profSchedule} key={this.state.profSchedule.currentSem}/>
                <ProfAddReview
                    {...this.state.profInfo}
                />
                <div ref={this.reviewRef}>
                    <ProfReviews profReviews={this.state.profReviews} key={this.state.profReviews} />
                </div>
                
            </div>
        )

        return (
            <main className="prof-details-main">
                <div className="main-sub">
                {this.state.validProf ? (this.state.loaded ? content : loading): <NotFound />}
                </div>
            </main>
        );
    }
}

export default withRouter(ProfDetails);