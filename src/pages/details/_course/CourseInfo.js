import React from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

function CourseInfo(props) {
	return (
		<div className="CourseInfo">
				<div className="childCourseName">
					<h1> {props.courseDep} </h1>
					<h1> {props.courseNo} </h1>
				</div>			
			<p> {props.courseName} </p>
			<p> Description: {props.courseDes}</p>
		</div>
	);
}

export default CourseInfo;