import React from 'react';
import { withRouter, Link } from 'react-router-dom'

function CourseScheduleEntry(props) {
    const profPath = props.profFirst.toLowerCase().replace(" ", "") + "_" + props.profLast.toLowerCase().replace(" ", "")
    let crossListed = props.crossListed.map(course => {
        let coursePath = course.dept.toLowerCase().replace(' ', '') + "_" + course.num.toLowerCase()
        if (course.topicNum >= -1) {
            coursePath += "_" + course.topicNum.toString()
        }
        return (
            <li>
                <Link
                    className="utcolor"
                    to={{
                        pathname: `/course-results/${coursePath}`,
                        state: {
                            courseId: course.id
                        }
                    }}
                > {course.dept} {course.num}
                </Link>
            </li>
        )
    })
    let prof = (
        <Link
            className="utcolor"
            to={{
                pathname: `/prof-results/${profPath}`,
                state: {
                    profId: props.profId
                }
            }}
        > {props.profFirst} {props.profLast}
        </Link>
    )
    let enrollment = props.seatsTaken === null || props.maxEnrollment === null ? "N/A" : props.seatsTaken + "/" + props.maxEnrollment
    return (
        <tr key={props.id}>
            <td>
                {props.uniqueNum !== null ? props.uniqueNum: "N/A"}
            </td>
            <td align="center">
                {props.profId !== null ? prof : "N/A"}
            </td>
            <td align="center">
                {enrollment}
            </td>
            <td align="center">
                {props.timeFrom !== null ? (props.timeFrom + " - " + props.timeTo) : "N/A"}
            </td>
            <td align="center">
                {props.days !== "" ? props.days : "N/A"}
            </td>
            <td align="center">
                {props.location !== null ? props.location: "N/A"}
            </td>
            <td align="center">
                {props.crossListed.length > 0 ? <ul>{crossListed}</ul> : "N/A"}
            </td>
        </tr>
    );
}

export default CourseScheduleEntry;