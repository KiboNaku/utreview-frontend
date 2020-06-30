import React from 'react';
import ProfInfo from './_prof/ProfInfo/ProfInfo';
import ProfRatings from './_prof/ProfInfo/ProfRatings';
import ProfCourses from './_prof/ProfCourses/ProfCourses';
import ProfReviews from './_prof/ProfReviews/ProfReviews';
import ProfAddReview from './_prof/ProfReviews/ProfAddReview';
import ProfSchedule from './_prof/ProfSchedule/ProfSchedule'
import { getProfInfo } from './_prof/ProfFunctions'
import Loading from './../_utils/Loading'
import { withRouter, Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './ProfDetails.css'
class ProfDetails extends React.Component {
    constructor(props) {
        super(props)
        const profInfo = {
            profName: "Yale Patt"
        }

        const profRatings = {
            percentLiked: 67,
            clear: 4.3,
            engaging: 2.3,
            grading: 4.9,
            eCIS: 4.3
        }

        const profCourses = [
            {
                id: 1,
                name: 'EE 302',
                percentLiked: 70,
                eCIS: 4.2,
                difficulty: 3.4,
                usefulness: 4.9,
                workload: 2.5

            },
            {
                id: 2,
                name: 'EE 460N',
                percentLiked: 32,
                eCIS: 3.6,
                difficulty: 3.4,
                usefulness: 4.9,
                workload: 2.5
            },
            {
                id: 3,
                name: 'EE 306',
                percentLiked: 85,
                eCIS: 4.8,
                difficulty: 3.4,
                usefulness: 4.9,
                workload: 2.5
            },
        ]

        const profSchedule = [
            {
                uniqueNo: 12345,
                maxEnrollment: 60,
                seatsTaken: 30,
                timeFrom: 900,
                timeTo: 1030,
                days: "M W",
                location: "EER 5.820",
                course: "EE 302"
            },
            {
                uniqueNo: 12345,
                maxEnrollment: 60,
                seatsTaken: 30,
                timeFrom: 900,
                timeTo: 1030,
                days: "M W",
                location: "EER 5.820",
                course: "EE 460N"
            },
            {
                uniqueNo: 12345,
                maxEnrollment: 60,
                seatsTaken: 30,
                timeFrom: 900,
                timeTo: 1030,
                days: "M W",
                location: "EER 5.820",
                course: "EE 306"
            }
        ]

        const profReviews = [
            {
                key: 1,
                review: "I fucking hated this class",
                liked: false,
                clear: 1,
                engaging: 5,
                grading: 5,
                userMajor: 'Electrical and Computer Engineering',
                profPic: "https://images.dog.ceo/breeds/pembroke/n02113023_12785.jpg",
                courseName: 'EE 302',
                numLiked: 2,
                numDisliked: 0,
                likePressed: false,
                dislikePressed: false,
                date: new Date("2018-04-09")
            },
            {
                key: 2,
                review: "This was the most inspiring class of my life",
                liked: true,
                clear: 5,
                engaging: 2,
                grading: 3,
                userMajor: 'Electrical and Computer Engineering',
                profPic: "https://images.dog.ceo/breeds/pembroke/n02113023_12785.jpg",
                courseName: 'EE 306',
                numLiked: 1,
                numDisliked: 2,
                likePressed: true,
                dislikePressed: false,
                date: new Date("2019-06-09")
            },
            {
                key: 3,
                review: "Why did I even take this class",
                liked: false,
                clear: 1,
                engaging: 2,
                grading: 3,
                userMajor: 'Business Honors',
                profPic: "https://images.dog.ceo/breeds/pembroke/n02113023_12785.jpg",
                courseName: 'EE 460N',
                numLiked: 5,
                numDisliked: 2,
                likePressed: false,
                dislikePressed: true,
                date: new Date("2018-04-10")
            },
        ]

        this.state = {
            profInfo: profInfo,
            profRatings: profRatings,
            profCourses: profCourses,
            profReviews: profReviews,
            profSchedule: profSchedule,
            validProf: true,
            loaded: true
        }

        const profId = null
        if(this.props.location.state === null){
            let profPath = window.location.pathname.split("/").pop()
            let profString = {
                profString: profPath
            }
            getProfId(profString).then(res => {
                if (res.error) {
                    alert(res.error)
                    this.setState({
                        validProf: false
                    })
                } else {
                    profId = res.profId
                }
            })
        }else{
            profId = this.props.location.state
        }

        if(this.state.validProf){
            let loggedIn = false
            let email = ''
            const token = localStorage.usertoken
            if (token) {
                const decoded = jwt_decode(token)
                loggedIn = true
                email = decoded.identity.email
            }

            const prof = {
                profId: profId,
                loggedIn: loggedIn,
                userEmail: email
            }
            
            getProfInfo(prof).then(res => {
                if (res.error) {
                    alert(res.error)
                } else {
                    let profRevs = res.prof_reviews.map(review => {
                        return {
                            ...review,
                            date: new Date(review.date)
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

    }

    componentDidMount() {

    }

    render() {

        let loading = (
            <Loading />
        )
        
        let invalidProf = (
            <h1> This course doesn't exist </h1>
        )

        let content = (
            <div className="profDetails">
                <div className="prof-stats">
                    <ProfInfo
                        {...this.state.profInfo}
                    />
                    <ProfRatings
                        {...this.state.profRatings}
                    />

                </div>
                <div className="prof-tables">
                    <ProfCourses {...this.state} />
                </div>

                <ProfSchedule {...this.state} />
                <ProfAddReview
                    {...this.state.profInfo}
                />
                <ProfReviews {...this.state} />
            </div>
        )
        return (
            <main className="prof-details-main">
                <div className="main-sub">
                {this.state.validProf ? (this.state.loaded ? content : loading): invalidProf}
                </div>

            </main>

        );
    }

}

export default withRouter(ProfDetails);