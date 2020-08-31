import React from 'react';
import PropTypes from 'prop-types'
import ProfLink from './../../../_utils/ProfLink'
import { Link } from 'react-router-dom'

const propTypes = {
    // id of the scheduled course instance
    id: PropTypes.number.required,

    // unique number of the scheduled course
    uniqueNum: PropTypes.number.required,

    // string representation of the days of the week the lecture is held
    days: PropTypes.string,

    // string representation of the time of day the lecture starts
    timeFrom: PropTypes.string,

    // string representation of the time of day the lecture ends
    timeTo: PropTypes.string,

    // max number of seats allowed for the course
    maxEnrollment: PropTypes.number,

    // number of seats currently taken for the course
    seatsTaken: PropTypes.number,

    // location of the lecture (building and room number or Online)
    location: PropTypes.string,

    // id of the prof teaching the course
    profId: PropTypes.number,

    // first name of the prof teaching the course
    profFirst: PropTypes.string,

    // last name of the prof teaching the course
    profLast: PropTypes.string,

    // string representation of the semester the course is scheduled for
    semester: PropTypes.string,

    // year the course is scheduled for
    year: PropTypes.number,

    // list of courses the course is cross listed with
    crossListed: PropTypes.arrayOf(
        PropTypes.shape({
            // id of the cross listed course
            id: PropTypes.number,

            // department abbreviation of the cross listed course
            dept: PropTypes.string,

            // cross listed course number
            num: PropTypes.string,

            // title of the cross listed course
            title: PropTypes.string,

            // topic number of the cross listed course
            topicNum: PropTypes.number
        })
    )
}

function CourseScheduleEntry(props) {

    // generate the link to the prof page for the scheduled prof
    let prof = null
    if (props.profId !== null) {
        prof = (
            <ProfLink
                profId={props.profId}
                firstName={props.profFirst}
                lastName={props.profLast}
            />
        )
    }

    // calculate numerical representation for the semester
    let semester = 9
    if (props.semester === "Summer") {
        semester = 6
    } else if (props.semester === "Spring") {
        semester = 2
    }

    // generate link to the official UT course schedule, using the unique number
    let semYear = props.year.toString() + semester.toString()
    let uniqueNumString = props.uniqueNum.toString()
    while (uniqueNumString.length < 5) {
        let temp = "0"
        temp += uniqueNumString
        uniqueNumString = temp
    }

    let uniqueNumLink = `https://utdirect.utexas.edu/apps/registrar/course_schedule/${semYear}/${uniqueNumString}/`
    let uniqueNum = <a className="utcolor" href={uniqueNumLink} rel="noopener noreferrer" target="_blank"> {uniqueNumString} </a>

    let enrollment = props.seatsTaken === null || props.maxEnrollment === null ? "N/A" : props.seatsTaken + "/" + props.maxEnrollment

    // generate link to the UT building's site, using the building location
    let location
    if (props.location !== null && props.location !== "N/A") {
        if (props.location === "WEB") {
            location = "Online"
        } else {
            let buildingName = props.location.split(" ")[0]

            let locationLink = `https://utdirect.utexas.edu/apps/campus/buildings/nlogon/maps/UTM/${buildingName}/`
            location = <a className="utcolor" href={locationLink} rel="noopener noreferrer" target="_blank"> {props.location} </a>
        }
    }

    return (
        <tr key={props.id} className="table-information-text">
            <td>
                {props.uniqueNum !== null ? uniqueNum : "N/A"}
            </td>
            <td>
                {prof !== null ? prof : "N/A"}
            </td>
            <td>
                {enrollment}
            </td>
            <td>
                {props.timeFrom !== null ? (props.timeFrom + " - " + props.timeTo) : "N/A"}
            </td>
            <td>
                {props.days !== "" ? props.days : "N/A"}
            </td>
            <td>
                {props.location !== null && props.location !== "N/A" ? location : "N/A"}
            </td>
        </tr>
    );
}

CourseScheduleEntry.propTypes = propTypes

export default CourseScheduleEntry;