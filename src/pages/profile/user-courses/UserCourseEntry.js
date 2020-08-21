import React from 'react';
import CourseLink from './../../_utils/CourseLink'
import ProfLink from './../../_utils/ProfLink'
import { Link } from 'react-router-dom'

function UserCourseEntry(props) {

    let course =
        (
            <CourseLink
                courseId={props.courseId}
                courseDept={props.courseDept}
                courseNum={props.courseNum}
                topicNum={props.topicNum}
                display="name"
            />
        )

    let semester = 9
    if (props.semester === "Summer") {
        semester = 6
    } else if (props.semester === "Spring") {
        semester = 2
    }

    let semYear = props.year.toString() + semester.toString()

    let uniqueNumLink = `https://utdirect.utexas.edu/apps/registrar/course_schedule/${semYear}/${props.uniqueNum}/`
    let uniqueNum = <a className="utcolor" href={uniqueNumLink} rel="noopener noreferrer" target="_blank"> {props.uniqueNum} </a>
    let prof = (
        <ProfLink
            profId={props.profId}
            firstName={props.profFirst}
            lastName={props.profLast}
        />
    )

    return (
        <tr>
            <td>
                {props.uniqueNum !== null ? uniqueNum : "N/A"}
            </td>
            <td >
                {props.courseI !== null ? course : "N/A"}
            </td>
            <td >
                {props.profId !== null ? prof : "N/A"}
            </td>
            <td >
                <a>Add Review</a>
            </td>
        </tr>
    );
}

export default UserCourseEntry;