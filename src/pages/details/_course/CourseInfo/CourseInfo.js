import React from 'react';
import { Link } from 'react-router-dom'
import './CourseInfo.css'
import './UserRatings.scss'

function CourseInfo(props) {
	let parentPath = props.courseDept.toLowerCase().replace(' ', '') + "_" + props.courseNum.toLowerCase()
	parentPath += "_0"
	let parentTopic = (
		<div className="parent-topic-wrapper">
			<span>Parent Topic: </span>
			<Link
				className="parent-topic"
				to={{
					pathname: `/course-results/${parentPath}`,
					state: {
						courseId: props.parentId
					}
				}}
			> {props.parentTitle}
			</Link>
		</div>
	)
	return (
		<div className="course-info">
			<div className="course-code"> {props.courseDept} {props.courseNum} </div>
			<div className="course-name"> {props.courseTitle} </div>
			<hr className="course-name-underline"></hr>
			<p className="course-description"> {props.courseDes} </p>
			{props.topicNum > 0 ? parentTopic: null}
			<p className="median-grade">Median Grade: {props.medianGrade !== null ? props.medianGrade : "N/A"}</p>
			<div className="view-reviews-wrapper" align="center">
				<a class="view-reviews" role="button" onClick={props.handleScrollToReview}>View Reviews</a>
			</div>
		</div>
	);
}

export default CourseInfo;