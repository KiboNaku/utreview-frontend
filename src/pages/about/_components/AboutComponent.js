
import React from 'react'
import Contributor from './../_utils/Contributor'

function AboutComponent() {
    return (
        <main>
            <div className='main-sub about container-fluid'>
                <h1 className='display-3 about-header'>About</h1>

                <h2 className='about-header-2'>Meet the Team</h2>
                <div className='d-flex justify-content-center'>
                    <div className='col-lg-8'>
                        <div className='contributors'>
                            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3'>
                                <div className='col'>
                                    <Contributor
                                        name='Andy Ni'
                                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
                                        image='https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=960&q=80'
                                    />
                                </div>
                                <div className='col'>
                                    <Contributor
                                        name='Iris Zhang'
                                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                        image='https://images.unsplash.com/photo-1553776590-89774e24b34a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
                                    />
                                </div>
                                <div className='col'>
                                    <Contributor
                                        name='Yangle Xue'
                                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
                                        image='https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className='about-header-2'>Special Thanks</h2>
                <div className='d-flex justify-content-center'>
                    <div className='col-lg-8'>
                        <p className='lead'>Nick Hinojosa</p>
                        <blockquote className="blockquote text-center">
                            <p className="mb-0">for your continued support of our website</p>
                        </blockquote>
                        <br />
                        <p className='lead'>UW Flow</p>
                        <blockquote className="blockquote text-center">
                            <p className="mb-0">for the website inspiration</p>
                        </blockquote>
                    </div>
                </div>

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
            </div>
        </main>
    )
}

export default AboutComponent