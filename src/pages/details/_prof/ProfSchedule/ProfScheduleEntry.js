import React from 'react';
import { Link } from 'react-router-dom'

function ProfScheduleEntry(props) {
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

    let courseName = props.courseDept + " " + props.courseNum
    let coursePath = props.courseDept.toLowerCase().replace(' ', '') + "_" + props.courseNum.toLowerCase()
    if (props.topicNum >= 0) {
        coursePath += "_" + props.topicNum.toString()
    }

    let semester = 9
    if(props.semester === "Summer"){
        semester = 6
    }else if(props.semester === "Spring"){
        semester = 2
    }
    let semYear = props.year.toString() + semester.toString()

    let uniqueNumLink = `https://utdirect.utexas.edu/apps/registrar/course_schedule/${semYear}/${props.uniqueNum}/`
    let uniqueNum = <a href={uniqueNumLink} rel="noopener noreferrer" target="_blank"> {props.uniqueNum} </a>

    let enrollment = props.seatsTaken === null || props.maxEnrollment === null ? "N/A" : props.seatsTaken + "/" + props.maxEnrollment
    
    let course = (
        <Link
            className="utcolor"
            to={{
                pathname: `/course-results/${coursePath}`,
                state: {
                    courseId: props.courseId
                }
            }}
        > {courseName}
        </Link>
    )
    
    let location
    if(props.location !== null && props.location !== "N/A"){
        if(props.location === "WEB"){
            location = "Online"
        }else{
            let buildingName = props.location.split()[0]
            let locationLink = `https://utdirect.utexas.edu/apps/campus/buildings/nlogon/maps/UTM/${buildingName}/`
            location = <a className="utcolor" href={locationLink} rel="noopener noreferrer" target="_blank"> {props.location} </a>
        }
    }
    
    return (
        <tr>
            <td align="center">
                {props.uniqueNum !== null ? uniqueNum: "N/A"}
            </td>
            <td align="center">
                {props.courseId !== null ? course : "N/A"}
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
                {props.location !== null && props.location !== "N/A" ? location : "N/A"}
            </td>
            <td align="center">
                {props.crossListed.length > 0 ? <ul>{crossListed}</ul> : "N/A"}
            </td>
        </tr>
    );
}

export default ProfScheduleEntry;