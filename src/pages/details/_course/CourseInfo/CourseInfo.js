import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import './CourseInfo.css'

function CourseInfo(props) {
	let parentPath = props.courseDept.toLowerCase().replace(' ', '') + "_" + props.courseNum.toLowerCase()
	parentPath += "_" + props.topicNum.toString()
	let parentTopic = (
		<div>
			<span>Parent Topic: </span>
			<Link
				className="utcolor"
				to={{
					pathname: `course-results/${parentPath}`,
				}}
			> {props.parentTitle}
			</Link>
		</div>
	)
	return (
		<div className="course-info">
			<div className="course-code"> {props.courseDept} {props.courseNum} </div>
			<div className="course-name"> {props.courseTitle} </div>
			<hr></hr>
			<p> {props.courseDes} </p>
			{props.topicNum > 0 ? parentTopic: null}
		</div>
	);
}

export default CourseInfo;