
import React from 'react'
import { Fade } from "react-awesome-reveal"
import Contributor from './../_utils/Contributor'

function AboutComponent(props) {
    return (
        <main>
            <div className='main-sub about container-fluid'>
                <h1 className='display-3 about-header'>About</h1>

                <Fade triggerOnce duration='2000'>
                    <h2 className='about-header-2 about-header-2-long'>Welcome to UT Review</h2>
                    <div className='d-flex justify-content-center'>
                        <div className='col-lg-8'>
                            <p>What starts here changes your course schedule. Literally. UT Review is a course planning website made for UT students, by UT students.
                            We've been through and understand the struggles of choosing courses/professors every semester and we want to
                            make this process easier for everyone. Here at UT Review, you can find everything you need to make more informed course planning decisions, from grade distributions to pre-requisites to
                            other students' opinions.
                            </p>
                            <p>
                                UT Review would not be possible without the reviews from students like you. Had a bad prof? We want to know. Had a great one? Tell us as well. Found a course completely and utterly useless? Leave a review. Your experiences can help more than 50,000 students like you every month choose great courses and avoid not so great ones.
                            </p>
                            <p>
                                You can help shape the future of UT Review! Let us know what we can improve on or what you think we're already doing a good job with. We're always looking
                                for new ideas, new features to implement, and new ways to improve your experience.
                            </p>
                        </div>
                    </div>
                </Fade>

                <Fade triggerOnce duration='2000'>
                    <h2 className='about-header-2'>Meet the Team</h2>
                    <div className='d-flex justify-content-center'>
                        <div className='col-lg-8'>
                            <div className='contributors'>
                                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 justify-content-center'>
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
                            {/* <p className='lead special-thanks-title'>Nick Hinojosa</p>
                            <blockquote className="blockquote text-center">
                                <p className="mb-0 special-thanks-content">for your continued support of our website</p>
                            </blockquote>
                            <br /> */}
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
                            <ul class="list-group credits" style={{ color: 'black' }}>
                                <div className="list-group-item flex-column align-items-start credit">
                                    <div className="d-flex justify-content-center">
                                        <p className="lead special-thanks-title">Home Page Photo</p>
                                    </div>
                                    <span>Background vector created by <a className='utcolor' href="https://www.freepik.com/vectors/background"> starline - www.freepik.com </a></span>
                                </div>

                                <div className="list-group-item flex-column align-items-start credit">
                                    <div className="d-flex justify-content-center">
                                        <p className="lead special-thanks-title">Corgi Photos</p>
                                    </div>
                                    <span>Photo by <a className='utcolor' href="https://unsplash.com/@florenciapotter?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"> Florencia Potter</a> on <a className='utcolor' href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"> Unsplash</a></span>
                                    <br />
                                    <span>Photos by <a className='utcolor' href="https://unsplash.com/@alvannee?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Alvan Nee</a> on <a className='utcolor' href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
                                    <br />
                                    <span>Photo by <a className='utcolor' href="https://www.pexels.com/@glenn-970339?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels">Gleen</a> from <a className='utcolor' href="https://www.pexels.com/photo/high-angle-photo-of-a-corgi-looking-upwards-2664417/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels">Pexels</a></span>
                                    <br />
                                    <span>Photo by <a className='utcolor' href="https://www.pexels.com/@julia-khalimova-826746?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels">Julia Khalimova</a> from <a className='utcolor' href="https://www.pexels.com/photo/brown-and-white-corgi-puppy-sitting-on-brown-rock-near-body-of-water-3649170/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels">Pexels</a></span>
                                    <br />
                                    <span>Photo by <a className='utcolor' href="https://unsplash.com/@cyanfoto?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Claudie-Ann Tremblay-cantin</a> on <a className='utcolor' href="https://unsplash.com/s/photos/corgi?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
                                    <br />
                                    <span>Photo by <a className='utcolor' href="https://unsplash.com/@coleito?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Cole Keister</a> on <a className='utcolor' href="https://unsplash.com/s/photos/corgi?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
                                    <br />
                                    <span>Photo by <a className='utcolor' href="https://unsplash.com/@nkvitovska?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Nataliia Kvitovska</a> on <a className='utcolor' href="https://unsplash.com/s/photos/corgi?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
                                    <br />
                                    <span>Photo by <a className='utcolor' href="https://pixabay.com/users/huoadg5888-8934889/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4415649">huoadg5888</a> from <a className='utcolor' href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4415649">Pixabay</a></span>
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