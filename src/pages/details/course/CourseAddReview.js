import React from 'react';
import { withRouter, Link } from 'react-router-dom'
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
        <Link to="/login">
            <button className="btn btn-primary" type="button">
                Add a Review
                </button>
        </Link>
    )
    return (
        <div className="courseAddReview" >
            <p> Have you taken {props.courseDep} {props.courseNo}? </p>
                {localStorage.usertoken ? addReviewLink: loginLink}
        </div>
    );
}

export default withRouter(CourseAddReview);