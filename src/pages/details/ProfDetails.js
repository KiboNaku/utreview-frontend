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
import MetaTags from 'react-meta-tags';
import './Details.css'
import './ProfDetails.css'

class ProfDetails extends React.Component {
    constructor(props) {
        super(props)

        this.reviewRef = React.createRef()

        this.state = {
            title: null,
            profInfo: null,
            profRatings: null,
            profCourses: null,
            profReviews: null,
            profSchedule: null,
            validProf: true,
            loaded: false
        }

        this.handleScrollToReview = this.handleScrollToReview.bind(this)

    }

    handleScrollToReview() {
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
        if (this.props.location.state === undefined) {

            let profPath = window.location.pathname.split("/").pop()
            let profString = {
                profString: profPath
            }

            getProfId(profString).then(res => {
                if (res.error) {
                    this.setState({ validProf: false })
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

        } else {
            if (this.props.location.state.profId === undefined) {

                let profPath = window.location.pathname.split("/").pop()
                let profString = {
                    profString: profPath
                }

                getProfId(profString).then(res => {
                    if (res.error) {
                        this.setState({ validProf: false })
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

            } else {
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

                const { firstName, lastName } = res.prof_info
                this.setState({
                    title: firstName + " " + lastName,
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

        let content = null
        if (this.state.loaded) {
            content = (
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
                        <ProfCourses profInfo={this.state.profInfo} profCourses={this.state.profCourses} key={this.state.profCourses} />
                    </div>

                    <ProfSchedule profSchedule={this.state.profSchedule} key={this.state.profSchedule.currentSem} />
                    <ProfAddReview
                        {...this.state.profInfo}
                    />
                    <div ref={this.reviewRef}>
                        <ProfReviews profReviews={this.state.profReviews} key={this.state.profReviews} />
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

                <main className="prof-details-main">
                    <div className="main-sub">
                        {this.state.validProf ? (this.state.loaded ? content : loading) : <NotFound title={this.props.notFoundPageTitle} mainTitle={this.props.mainTitle} description={this.props.notFoundPageDescription}/>}
                    </div>
                </main>
            </div>
        );
    }
}

export default withRouter(ProfDetails);