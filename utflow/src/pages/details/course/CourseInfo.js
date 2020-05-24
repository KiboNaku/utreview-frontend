import React from 'react';

function CourseInfo(props) {
	return (
		<div className="CourseInfo">
			<h1> {props.courseDep} {props.courseNo} </h1>
			<p> {props.courseName} </p>
			<p> {props.courseDes}</p>
		</div>
	);
}

export default CourseInfo;