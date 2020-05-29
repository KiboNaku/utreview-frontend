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
                <h3> Prerequisites </h3>
                <ul>
                    {prerequisites}
                </ul>
            </div>
            <div>
                <h3> Corequisites </h3>
                <ul>
                    {corequisites}
                </ul>
            </div>
            <div>
                <h3> Antirequisites </h3>
                <ul>
                    {antirequisites}
                </ul>
            </div>			
		</div>
	);
}

export default CourseRequisites;