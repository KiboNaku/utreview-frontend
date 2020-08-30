import React from 'react';
import PropTypes from 'prop-types';
import './ProfInfo.css'
import './../../_course/CourseInfo/UserRatings.scss'

const propTypes = {
    // id of the prof
    id: PropTypes.number.isRequired,

    // first name of the prof
    firstName: PropTypes.string.isRequired,

    // last name of the prof
    lastName: PropTypes.string.isRequired,

    // the median grade that the prof gives with all courses factored in
	medianGrade: PropTypes.string.isRequired,

	// scrolls to the review section of the page
	handleScrollToReview: PropTypes.func.isRequired
}

function ProfInfo(props) {
	return (
		<div className="prof-info">
			<div className="prof-name-info"> {props.firstName} {props.lastName} </div>
			<hr className="course-name-underline"></hr>
			<div className="median-grade">Median Grade: {props.medianGrade !== null ? props.medianGrade : "N/A"}</div>
			
			
			<div className="view-reviews-prof-wrapper" align="center">
				<a class="view-reviews-prof" role="button" onClick={props.handleScrollToReview}>View Reviews</a>
			</div>
		</div>
	);
}

ProfInfo.props = propTypes;

export default ProfInfo;