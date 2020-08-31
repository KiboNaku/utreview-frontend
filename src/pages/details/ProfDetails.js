import React from 'react';
import PropTypes from 'prop-types';
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

const propTypes = {
    // specific title for this page, dependent on prof name, used in meta tags
    title: PropTypes.string.isRequired,

    // main title (UT Review), used in meta tags
    mainTitle: PropTypes.string.isRequired,

    // specific description for this page, dependent on the prof, used in meta tags
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

            // id of the prof being displayed
            profId: PropTypes.number
        }),
    })
}


class ProfDetails extends React.Component {
    constructor(props) {
        super(props)

        // reference to the ProfReviews component
        this.reviewRef = React.createRef()

        this.state = {
            // specific title for this page, dependent on prof name, used in meta tags
            title: null,

            // stores basic prof information (first name, last name, prof id)
            profInfo: null,

            // stores user rating information about the prof (approval, eCIS, clear, engaging, grading rigor)
            profRatings: null,

            // stores information about the courses that the prof teaches
            profCourses: null,

            // stores information about the ratings and comments for the prof
            profReviews: null,

            // stores information about the time of the courses the prof teaches
            profSchedule: null,

            // is set to false, when the user inputs the wrong link for a prof
            validProf: true,

            // is set to true, when all the api requests to fetch the prof information have finished
            loaded: false
        }

        this.handleScrollToReview = this.handleScrollToReview.bind(this)

    }

    // scrolls to review component
    handleScrollToReview() {
        const scrollToRef = () => window.scrollTo(0, this.reviewRef.current.offsetTop - 100)
        scrollToRef()
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

        // find profId, either from url or from props
        let profId = null
        if (this.props.location.state === undefined) {

            // state is undefined, so parse url to find prof name
            let profPath = window.location.pathname.split("/").pop()
            let profString = {
                profString: profPath
            }

            // use prof name to find the prof id
            getProfId(profString).then(res => {
                if (res.error) {
                    this.setState({ validProf: false })
                } else {

                    // after finding prof id, fetch prof details info
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
            // state is defined, so check the state to see if it has profId
            if (this.props.location.state.profId === undefined) {

                // profId is undefined, so parse url to find prof name
                let profPath = window.location.pathname.split("/").pop()
                let profString = {
                    profString: profPath
                }

                // use prof name to find the prof id
                getProfId(profString).then(res => {
                    if (res.error) {
                        this.setState({ validProf: false })
                    } else {

                        // after finding prof id, fetch prof details info
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

                // get profId from state, then fetch prof details info
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

    // makes an api request to fetch all prof details information
    profDetailsRequest = (prof) => {

        getProfInfo(prof).then(res => {
            if (res.error) {
                alert(res.error)
            } else {

                // create new Date() object for each review date
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

                // set state variables with data fetched from the backend
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

        // if (this.state.profInfo !== null) {
        //     axios
        //         .post('/api/utplus_prof', {
        //             firstName: this.state.profInfo.firstName,
        //             lastName: this.state.profInfo.lastName
        //         })
        //         .then(response => {
        //             console.log(response.data)
        //         })
        // }

        let loading = <Loading />

        let content = null

         // only display if prof details info has loaded
        if (this.state.loaded) {

            // main prof details content
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

                    <div className="course-reviews-block-wrapper">
                    <div className="add-review-wrapper">
                    <ProfAddReview
                        {...this.state.profInfo}
                    />
                    </div>
                    <div ref={this.reviewRef} className="course-reviews-wrapper">
                        <ProfReviews profReviews={this.state.profReviews} key={this.state.profReviews} />
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

                <main className="prof-details-main">
                    <div className="main-sub">
                        {this.state.validProf ? (this.state.loaded ? content : loading) : <NotFound title={this.props.notFoundPageTitle} mainTitle={this.props.mainTitle} description={this.props.notFoundPageDescription}/>}
                    </div>
                </main>
            </div>
        );
    }
}

ProfDetails.propTypes = propTypes

export default withRouter(ProfDetails);