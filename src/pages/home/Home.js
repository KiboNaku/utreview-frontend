import React, { Component } from 'react'
import SearchBarHome from './../_utils/SearchBarHome'
import './Home.css'
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="all-wrapper">
                <div className="home-wrapper">
                    <div className="top-wrapper">
                        <img alt="top background" className="top-background"
                        src={require('./../../res/img/utreview-homebackground.jpg')} />
                    </div>

                    <div className="bottom-wrapper">     
                        
                        <img alt="circle logo" className="circle-logo"
                        src={require('./../../res/img/utreview-homelogotransparent-orangewhite.png')} />   
                        
                        <div className="floating-box">
                            <div className="floating-box-content">
                                <div className="find-your-class">
                                    <img alt="magnifying class icon" className="magnifying-glass"
                                    src={require('./../../res/img/magnifying glass.png')} />
                                    <br></br>
                                    <div className="floating-box-text">
                                        Find your class.
                                    </div>
                                </div>
                                <div className="plan-your-schedule">
                                    <img alt="schedule icon" className="schedule"
                                    src={require('./../../res/img/schedule.png')} />
                                    <br></br>
                                    <div className="floating-box-text">
                                        Plan your schedule.
                                    </div>
                                </div>
                                <div className="leave-a-review">
                                    <img alt="checklist icon" className="checklist"
                                    src={require('./../../res/img/checklist.png')} />
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
                            What starts <span className="sentence-underline">here</span> <br></br>
                            <div className="bottom-sentence">changes your course schedule</div>
                        </div>

                        <div className="arrow">
                            <div className="curve"></div>
                            <div className="point"></div>
                        </div>

                        <div className="background-credits-mobile">
                            <a className="credits" href="https://www.freepik.com/vectors/background">
                                Background vector created by starline - www.freepik.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home