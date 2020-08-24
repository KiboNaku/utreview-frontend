import React, { Component } from 'react'
import SearchBarHome from './../_utils/SearchBarHome'
import $ from './../../../node_modules/jquery'
import './Home.css'
import './Home.scss'
import MetaTags from 'react-meta-tags';

class Home extends Component {


    componentDidMount() {
        if (localStorage.getItem("logout-message")) {
            $("#toast-logout-success").toast("show")
            localStorage.removeItem("logout-message")
        }
    }

    render() {

        const homeBackDefault = require('./../../res/img/backgrounds/utreview-homebackground.jpg')
        const homeBackSmall = require('./../../res/img/backgrounds/utreview-homebackground-320w.jpg')
        const homeBackMed = require('./../../res/img/backgrounds/utreview-homebackground-640w.jpg')
        const homeBackBig = require('./../../res/img/backgrounds/utreview-homebackground-1024w.jpg')

        return (
            <div>
                <MetaTags>
                    <title>{this.props.title}</title>
                    <meta name="description" content={this.props.description} />
                </MetaTags>

                <div className="all-wrapper">
                    <div className="home-wrapper">
                        <div className="top-wrapper">

                            <picture>
                                <source media="(max-width:320px)" srcset={homeBackSmall} />
                                <source media="(max-width:640px)" srcset={homeBackMed} />
                                <source media="(max-width:1024px)" srcset={homeBackBig} />
                                <img src={homeBackDefault} alt="UT Review Home Page Background" className="top-background" />
                            </picture>
                            {/* <img alt="top background" className="top-background"
                                src={homeBackDefault} srcSet={`${homeBackSmall} 400w, ${homeBackMed} 650w, ${homeBackBig} 900w`} /> */}
                        </div>

                        <div className="bottom-wrapper">

                            <img alt="circle logo" className="circle-logo"
                                src={require('./../../res/img/other/utreview-homelogotransparent-orangewhite.png')} />

                            <div className="floating-box">
                                <div className="floating-box-content">
                                    <div className="find-your-class">
                                        <img alt="magnifying class icon" className="magnifying-glass"
                                            src={require('./../../res/img/icons/magnifying glass.png')} />
                                        <br></br>
                                        <div className="floating-box-text">
                                            Find your class.
                                    </div>
                                    </div>
                                    <div className="plan-your-schedule">
                                        <img alt="schedule icon" className="schedule"
                                            src={require('./../../res/img/icons/schedule.png')} />
                                        <br></br>
                                        <div className="floating-box-text">
                                            Plan your schedule.
                                    </div>
                                    </div>
                                    <div className="leave-a-review">
                                        <img alt="checklist icon" className="checklist"
                                            src={require('./../../res/img/icons/checklist.png')} />
                                        <br></br>
                                        <div className="floating-box-text">
                                            Leave a review.
                                    </div>
                                    </div>
                                </div>
                            </div>

                            <div className="search-wrapper-lg searchbar-wrapper-home">
                                < SearchBarHome />
                            </div>

                            <div className="homepage-sentence">
                                <div className="homepage-sentence-text">
                                    What starts <span className="sentence-underline">here</span> <br></br>
                                </div>
                                <div className="bottom-sentence homepage-sentence-text">
                                    changes your course schedule
                                </div>
                            </div>
                            <div className="fb-like-share">
                                <div id="fboverlay" class="fb-like px-2 py-2" data-href="https://www.facebook.com/utreview" data-width="" data-layout="button_count" data-action="recommend" data-size="small" data-share="true"></div>
                            </div>

                            {/* <div className="background-credits-mobile">
                                <a className="credits" href="https://www.freepik.com/vectors/background">
                                    Background vector created by starline - www.freepik.com
                            </a>
                            </div> */}
                        </div>
                    </div>
                    {/* <div className="background-credits">
                        <a className="credits" href="https://www.freepik.com/vectors/background">
                            Background vector created by starline - www.freepik.com
                    </a>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default Home