import React from 'react';
import { withRouter, Link } from 'react-router-dom'

function CourseScheduleEntry(props) {
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
    return (
        <tr key={props.id}>
            <td>
                {props.uniqueNum}
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
                <Link
                    className="utcolor"
                    to={{
                        pathname: `prof-results/${props.profFirst}_${props.profLast}`,
                        state: {
                            profId: props.profId
                        }
                    }}
                > {props.profFirst} {props.profLast}
                </Link>
            </td>
            <td align="center">
                {props.crossListed.length > 0 ? <ul>{crossListed}</ul> : "N/A"}
            </td>
        </tr>
    );
}

export default CourseScheduleEntry;