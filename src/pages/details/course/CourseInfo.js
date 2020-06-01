import React from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

function CourseInfo(props) {
	return (
		<div className="CourseInfo">
			<div className="parentCircle">
				<div className="circle"></div>
				<div className="childCourseName">
					<h1> {props.courseDep} {props.courseNo} </h1>
				</div>
			</div>			
			<p> {props.courseName} </p>
			<p> Description: {props.courseDes}</p>
		</div>
	);
}

export default CourseInfo;