import React from 'react';
import './ProfInfo.css'
function ProfInfo(props) {
	return (
		<div className="profInfo">
			<div className="card prof-card">
				{/* <div className="card-header course-header">
					<h2> {props.courseDep} {props.courseNo} </h2>
				</div> */}
				<div className="card-body info-body">
					<h2 className="prof-title"> {props.firstName} {props.lastName} </h2>
					<a className="utcolor" role="button" onClick={props.handleScrollToReview}>View Reviews</a>
				</div>
			</div>
		</div>
	);
}

export default ProfInfo;