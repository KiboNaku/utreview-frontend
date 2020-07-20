
import React from 'react'
import { Fade } from "react-awesome-reveal"
import Contributor from './../_utils/Contributor'

function AboutComponent(props) {
    return (
        <main>
            <div className='main-sub about container-fluid'>
                <h1 className='display-3 about-header'>About</h1>

                <Fade triggerOnce duration='2000'>
                    <h2 className='about-header-2'>Meet the Team</h2>
                    <div className='d-flex justify-content-center'>
                        <div className='col-lg-8'>
                            <div className='contributors'>
                                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3'>
                                    <div className='col'>
                                        <Contributor
                                            name={props.data.contributors[0].name}
                                            description={props.data.contributors[0].description}
                                            image={props.data.contributors[0].image}
                                        />
                                    </div>
                                    <div className='col'>
                                        <Contributor
                                            name={props.data.contributors[3].name}
                                            description={props.data.contributors[3].description}
                                            image={props.data.contributors[3].image}
                                        />
                                    </div>
                                    <div className='col'>
                                        <Contributor
                                            name={props.data.contributors[1].name}
                                            description={props.data.contributors[1].description}
                                            image={props.data.contributors[1].image}
                                        />
                                    </div>
                                    <div className='col'>
                                        <Contributor
                                            name={props.data.contributors[2].name}
                                            description={props.data.contributors[2].description}
                                            image={props.data.contributors[2].image}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
                <Fade triggerOnce duration='2000'>
                    <h2 className='about-header-2'>Special Thanks</h2>
                    <div className='d-flex justify-content-center'>
                        <div className='col-lg-8'>
                            <p className='lead special-thanks-title'>Nick Hinojosa</p>
                            <blockquote className="blockquote text-center">
                                <p className="mb-0 special-thanks-content">for your continued support of our website</p>
                            </blockquote>
                            <br />
                            <p className='lead special-thanks-title'>UW Flow</p>
                            <blockquote className="blockquote text-center">
                                <p className="mb-0 special-thanks-content">for the website inspiration</p>
                            </blockquote>
                        </div>
                    </div>

                </Fade>


                <Fade triggerOnce duration='2000'>
                    <h2 className='about-header-2'>Credits</h2>
                    <div className='d-flex justify-content-center'>
                        <div className='col-lg-8'>
                            <ul class="list-group credits">
                                <div className="list-group-item flex-column align-items-start credit">
                                    <div className="d-flex justify-content-center">
                                        <p className="h5"><u>Home Page Photo</u></p>
                                    </div>
                                    <span>Photo by <a className='utcolor' href="https://unsplash.com/@joelfilip?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Joel Filipe</a> on <a className='utcolor' href="https://unsplash.com/@joelfilip?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
                                </div>

                                <div className="list-group-item flex-column align-items-start credit">
                                    <div className="d-flex justify-content-center">
                                        <p className="h5"><u>Corgi Photos</u></p>
                                    </div>
                                    <span>Photo by <a className='utcolor' href="https://unsplash.com/@florenciapotter?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"> Florencia Potter</a> on <a className='utcolor' href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"> Unsplash</a></span>
                                    <br />
                                    <span>Photos by <a className='utcolor' href="https://unsplash.com/@alvannee?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Alvan Nee</a> on <a className='utcolor' href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
                                </div>

                            </ul>
                        </div>
                    </div>
                </Fade>
            </div>
        </main>
    )
}

export default AboutComponent