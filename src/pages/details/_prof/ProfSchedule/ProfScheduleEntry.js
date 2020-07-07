import React from 'react';
import { withRouter, Link } from 'react-router-dom'

function ProfScheduleEntry(props) {
    let crossListed = props.crossListed.map(course =>{
        let coursePath = course.dept.toLowerCase().replace(' ', '') + "_" + course.num.toLowerCase()
        if(course.topicNum >= -1){
            coursePath += "_" + course.topicNum.toString()
        } 
        return (
            <li>
                <Link
                    className="utcolor"
                    to={{
                        pathname: `course-results/${coursePath}`,
                    }}
                > {course.dept} {course.num}
                </Link>
            </li>
        )
    })
    let courseName = props.courseDept + " " + props.courseNum
    let coursePath = props.courseDept.toLowerCase().replace(' ', '') + "_" + props.courseNum.toLowerCase()
    if(props.topicNum >= 0){
        coursePath += "_" + props.topicNum.toString()
    } 
	return (
        <tr>
            <td>
                {props.uniqueNum}
            </td>
            <td align="center">
                <Link
                    className="utcolor"
                    to={{
                        pathname: `course-results/${coursePath}`,
                        state: {
                            courseId: props.courseId
                        }
                    }}
                > {courseName}
                </Link>
            </td>
            <td align="center">
                {props.seatsTaken}/{props.maxEnrollment}
            </td>
            <td align="center">
                {props.timeFrom} - {props.timeTo}
            </td>
            <td align="center">
                {props.days}
            </td>
            <td align="center">
                {props.location}
            </td>
            <td align="center">
                {props.crossListed.length > 0 ? <ul>{crossListed}</ul> : "N/A"}
            </td>
        </tr>
    );
}

export default ProfScheduleEntry;