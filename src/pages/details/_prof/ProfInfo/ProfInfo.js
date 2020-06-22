import React from 'react';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import './ProfInfo.css'
function ProfInfo(props) {
	return (
		<div className="profInfo">
			<div className="card prof-card">
				{/* <div className="card-header course-header">
					<h2> {props.courseDep} {props.courseNo} </h2>
				</div> */}
				<div className="card-body info-body">
					<h2 className="prof-title"> {props.profName} </h2>
				</div>
			</div>
		</div>
	);
}

export default ProfInfo;