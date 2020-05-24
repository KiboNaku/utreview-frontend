import React from 'react';
import './CourseDetails.css'

function CourseRatings(props) {
    let diffPercent = (props.difficulty*100)/5;
    let usefulPercent = (props.usefulness*100)/5;
    let workloadPercent = (props.workload*100)/5;
    let eCISPercent = (props.eCIS*100)/5;
	return (
		<div className="CourseRatings">
			<h1> User Ratings </h1>
            <p> Liked </p>
			<div className="progress">
                <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{width: `${props.percentLiked}%`}} 
                    aria-valuenow={props.percentLiked} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                    >
                    {`${props.percentLiked}%`}
                </div>
            </div>
            <p> Difficulty </p>
			<div className="progress">
                <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{width: `${diffPercent}%`}} 
                    aria-valuenow={props.difficulty} 
                    aria-valuemin="0" 
                    aria-valuemax="5"
                    >
                    {`${props.difficulty}/5`}
                </div>
            </div>
            <p> Usefulness </p>
			<div className="progress">
                <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{width: `${usefulPercent}%`}} 
                    aria-valuenow={props.usefulness} 
                    aria-valuemin="0" 
                    aria-valuemax="5"
                    >
                    {`${props.usefulness}/5`}
                </div>
            </div>
            <p> Workload </p>
			<div className="progress">
                <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{width: `${workloadPercent}%`}} 
                    aria-valuenow={props.workload} 
                    aria-valuemin="0" 
                    aria-valuemax="5"
                    >
                    {`${props.workload}/5`}
                </div>
            </div>
            <p> eCIS </p>
			<div className="progress">
                <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{width: `${eCISPercent}%`}} 
                    aria-valuenow={props.eCIS} 
                    aria-valuemin="0" 
                    aria-valuemax="5"
                    >
                    {`${props.eCIS}/5`}
                </div>
            </div>
		</div>
	);
}

export default CourseRatings;