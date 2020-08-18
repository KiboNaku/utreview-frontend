import React from 'react';
import CourseLink from './../../_utils/CourseLink'
import { Link } from 'react-router-dom'

function UserCourseEntry(props) {
    const profPath = props.profFirst.toLowerCase().replace(" ", "") + "_" + props.profLast.toLowerCase().replace(" ", "")
    let coursePath = props.courseDept.toLowerCase().replace(' ', '') + "_" + props.courseNum.toLowerCase()
    if (props.topicNum >= -1) {
        coursePath += "_" + props.topicNum.toString()
    }
    let course =
        (
            <CourseLink
                courseId={props.courseId}
                courseDept={props.courseDept}
                courseNum={props.courseNum}
                topicNum={props.topicNum}
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