import React from 'react';
import PropTypes from 'prop-types';
import CourseLink from './../../../_utils/CourseLink'
import { Link } from 'react-router-dom'
import './CourseInfo.css'
import './UserRatings.scss'

const propTypes = {
    // course id
    id: PropTypes.number.isRequired,

	// course's department abbreviation
	courseDept: PropTypes.string.isRequired,

    // course number
    courseNum: PropTypes.string.isRequired,

    // course title
    courseTitle: PropTypes.string.isRequired,

    // course description
	courseDes: PropTypes.string.isRequired,
	
	// course's topic id
	topicId: PropTypes.number.isRequired,

	// course's topic number
    topicNum: PropTypes.number.isRequired,
	
	// course's parent topic's id
	parentId: PropTypes.number,
	
	// course's parent topic's title
	parentTitle: PropTypes.string,
	
	// list of children topics, only if course is a parent topic
    topicsList: PropTypes.arrayOf(
		PropTypes.shape({
			// course id
			id: PropTypes.number,

			// course's topic number
			topicNum: PropTypes.number,
			
			// course's title
			title: PropTypes.string
		})
	),
	
	// median letter grade obtained in the course
	medianGrade: PropTypes.string,

	// list of courses the course is cross listed with
	crossListed: PropTypes.arrayOf(
		PropTypes.shapeOf({
			// id of the cross listed course
			id: PropTypes.number,

			// department abbreviation of the cross listed course
			dept: PropTypes.string,

			// cross listed course number
			num: PropTypes.string,

			// title of the cross listed course
			title: PropTypes.string,

			// topic number of the cross listed course
			topicNum: PropTypes.number
		})
	),

	// handles scrolling to the review component
	handleScrollToReview: PropTypes.func.isRequired
}

function CourseInfo(props) {

	let crossListed

	// if the course is cross listed with another course, generate
	// the list of cross listed courses
	if (props.crossListed !== null && props.crossListed.length > 0) {

		// generate list of links to cross listed courses
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

	// generate component for displaying a link to the parent topic, if applicable
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

CourseInfo.propTypes = propTypes

export default CourseInfo;