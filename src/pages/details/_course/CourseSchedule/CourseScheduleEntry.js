import React from 'react';

function CourseScheduleEntry(props) {

	return (
        <tr>
            <td>
                {props.uniqueNo}
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
                <a href = "https://www.google.com" > {props.professor} </a>
            </td>
        </tr>
    );
}

export default CourseScheduleEntry;