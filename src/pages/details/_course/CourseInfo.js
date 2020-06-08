import React from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import './../CourseDetails.css'

function CourseInfo(props) {
	return (
		<div className="CourseInfo">
			<div className="card">
				<div className="card-header">
					<h2> {props.courseDep} {props.courseNo} </h2>
				</div>
				<div className="card-body">
					<h5 className="card-title"> {props.courseName} </h5>
					<p> The scope and nature of professional activities of electrical engineers, including problem-solving techniques; analysis and design methods; engineering professional ethics; analysis of analog resistive circuits, including Thevenin/Norton equivalents, mesh analysis, and nodal analysis; and operational amplifiers (DC response). Substantial teamwork is required for laboratory work in this course. Three lecture hours and two laboratory hours a week for one semester.</p>
				</div>
			</div>
		</div>
	);
}

export default CourseInfo;