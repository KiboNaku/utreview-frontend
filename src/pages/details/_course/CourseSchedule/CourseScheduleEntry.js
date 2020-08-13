import React from 'react';
import { Link } from 'react-router-dom'

function CourseScheduleEntry(props) {

    let prof = null
    if(props.profId !== null){
        const profPath = props.profFirst.toLowerCase().replace(" ", "") + "_" + props.profLast.toLowerCase().replace(" ", "")
        prof = (
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
    }

    let semester = 9
    if(props.semester === "Summer"){
        semester = 6
    }else if(props.semester === "Spring"){
        semester = 2
    }

    let semYear = props.year.toString() + semester.toString()

    let uniqueNumString = props.uniqueNum.toString()
    while(uniqueNumString.length < 5){
        let temp = "0"
        temp += uniqueNumString
        uniqueNumString = temp
    }

    let uniqueNumLink = `https://utdirect.utexas.edu/apps/registrar/course_schedule/${semYear}/${uniqueNumString}/`
    let uniqueNum = <a className="utcolor" href={uniqueNumLink} rel="noopener noreferrer" target="_blank"> {uniqueNumString} </a>
    
    let enrollment = props.seatsTaken === null || props.maxEnrollment === null ? "N/A" : props.seatsTaken + "/" + props.maxEnrollment

    let location
    if(props.location !== null && props.location !== "N/A"){
        if(props.location === "WEB"){
            location = "Online"
        }else{
            let buildingName = props.location.split(" ")[0]

            let locationLink = `https://utdirect.utexas.edu/apps/campus/buildings/nlogon/maps/UTM/${buildingName}/`
            location = <a className="utcolor" href={locationLink} rel="noopener noreferrer" target="_blank"> {props.location} </a>
        }
    }
    
    return (
        <tr key={props.id}>
            <td>
                {props.uniqueNum !== null ? uniqueNum: "N/A"}
            </td>
            <td align="center">
                {prof !== null ? prof : "N/A"}
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
        </tr>
    );
}

export default CourseScheduleEntry;