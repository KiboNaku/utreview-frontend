import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import Login from './../../popups/Login'
import Signup from './../../popups/Signup'
import './CourseDetails.css'

function CourseAddReview(props) {
    const addReviewLink = (
        <Link to="/add-review">
            <button className="btn btn-primary" type="button">
                Add a Review
                </button>
        </Link>
    )
    const loginLink = (
        <div>
            <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#login-modal">
                Add a Review
            </button>
            <Login />
            <Signup />
        </div>

    )
    return (
        <div className="courseAddReview" >
            <p> Have you taken {props.courseDep} {props.courseNo}? </p>
            {localStorage.usertoken ? addReviewLink : loginLink}
        </div>
    );
}

export default withRouter(CourseAddReview);