import React from 'react';
import './ProfInfo.css'
function ProfInfo(props) {
	return (
		<div className="profInfo">
			<div className="course-code"> {props.firstName} {props.lastName} </div>
			<hr className="course-name-underline"></hr>
			<h5>Median Grade: {props.medianGrade !== null ? props.medianGrade : "N/A"}</h5>
			<a className="utcolor" role="button" onClick={props.handleScrollToReview}>View Reviews</a>
		</div>
	);
}

export default ProfInfo;