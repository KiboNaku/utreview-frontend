import React from 'react'
import { Link, withRouter } from 'react-router-dom';

function CourseLink(props) {

    let coursePath = props.courseDept.toLowerCase().replace(/ /g,'') + "_" + props.courseNum.toLowerCase()
    if (props.topicNum > -1) {
        coursePath += "_" + props.topicNum.toString()
    }

    return (
        <Link
            className={ props.className === undefined ? "utcolor" : props.className}
            to={{
                pathname: `/course-results/${coursePath}`,
                state: {
                    courseId: props.courseId
                }
            }}
        > {props.display === "title" ? props.courseTitle : props.courseDept + " " + props.courseNum}
        </Link>
    )
}
export default CourseLink