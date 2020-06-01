import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import './CourseDetails.css'

function CourseAddReview(props) {
    return (
        <div className="courseAddReview" >
            <p> Have you taken {props.courseDep} {props.courseNo}? </p>
            <Link to="/add-review">
                <button className="btn btn-primary" type="button">
                    Add a Review
                </button>
            </Link>

        </div>
    );
}

export default withRouter(CourseAddReview);