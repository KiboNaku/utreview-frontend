import React from 'react';
import CourseLink from './../../../_utils/CourseLink'
import { Link } from 'react-router-dom'
import './CourseInfo.css'
import './UserRatings.scss'

function CourseInfo(props) {

	let crossListed
	if (props.crossListed !== null && props.crossListed.length > 0) {
		let crossListedCourses = props.crossListed.map(course => {
			return (
				<CourseLink
					className="parent-topic"
					courseId={course.id}
					courseDept={course.dept}
					courseNum={course.num}
					topicNum={course.topicNum}
					display="name"
				/>
			)
		})

		crossListed = (
			<div className="parent-topic-wrapper">
				<span>Cross listed: </span>
				{crossListedCourses}
			</div>
		)
	}

	let parentTopic = (
		<div className="parent-topic-wrapper">
			<span>Parent Topic: </span>
			<CourseLink 
				className="parent-topic"
				courseId={props.parentId}
				courseDept={props.courseDept}
				courseNum={props.courseNum}
				courseTitle={props.parentTitle}
				topicNum={0}
				display="title"
			/>
		</div>
	)

	return (
		<div className="course-info">
			<div className="course-code"> {props.courseDept} {props.courseNum} </div>
			<div className="course-name"> {props.courseTitle} </div>
			<hr className="course-name-underline"></hr>
			<p className="course-description"> {props.courseDes} </p>
			{props.topicNum > 0 ? parentTopic : null}
			{props.crossListed !== null ? crossListed : null}
			<p className="median-grade">Median Grade: {props.medianGrade !== null ? props.medianGrade : "N/A"}</p>
			<div className="view-reviews-wrapper" align="center">
				<a class="view-reviews" role="button" onClick={props.handleScrollToReview}>View Reviews</a>
			</div>
		</div>
	);
}

export default CourseInfo;