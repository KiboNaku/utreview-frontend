import React from 'react';
import './CourseDetails.css'

function CourseRequisites(props) {
    const prerequisites = props.preRequisites.map( prereq =>{
        return <li> {prereq} </li>
    })
    const corequisites = props.coRequisites.map( coreq =>{
        return <li> {coreq} </li>
    })
    const antirequisites = props.antiRequisites.map( antireq =>{
        return <li> {antireq} </li>
    })
	return (
		<div className="courseRequisites">
			<h1> Requisites </h1>	
            <div>
                <h5> Prerequisites </h5>
                <ul>
                    {prerequisites}
                </ul>
            </div>
            <div>
                <h5> Corequisites </h5>
                <ul>
                    {corequisites}
                </ul>
            </div>
            <div>
                <h5> Antirequisites </h5>
                <ul>
                    {antirequisites}
                </ul>
            </div>			
		</div>
	);
}

export default CourseRequisites;