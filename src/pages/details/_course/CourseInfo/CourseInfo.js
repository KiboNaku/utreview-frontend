import React from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import './CourseInfo.css'

function CourseInfo(props) {
	let parentPath = props.courseDept.toLowerCase().replace(' ', '') + "_" + props.courseNum.toLowerCase()
	parentPath += "_0"
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
		<div className="CourseInfo">
			<div className="card course-card">
				{/* <div className="card-header course-header">
					<h2> {props.courseDep} {props.courseNo} </h2>
				</div> */}
				<div className="card-body info-body">
					<h2 className="course-title"> {props.courseDept} {props.courseNum} </h2>
					<h5 className="card-title course-title"> {props.courseTitle} </h5>
					<p> {props.courseDes} </p>
					{props.parentTitle != null ? parentTopic: <br/>}
				</div>
			</div>
		</div>
	);
}

export default CourseInfo;