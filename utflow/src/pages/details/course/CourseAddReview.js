import React from 'react';
import './CourseDetails.css'

function CourseAddReview(props) {
	return (
		<div className="courseAddReview" >
            <p> Have you taken {props.courseDep} {props.courseNo}? </p>
            <button className="btn btn-primary" type="button">
                Add a Review
            </button>	
		</div>
	);
}

export default CourseAddReview;