import React from 'react';
import './ProfInfo.css'
import './../../_course/CourseInfo/UserRatings.css'

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

export default ProfInfo;