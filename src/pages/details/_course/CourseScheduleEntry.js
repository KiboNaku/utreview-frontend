import React from 'react';

function CourseScheduleEntry(props) {

	return (
        <tr>
            <td>
                {props.uniqueNo}
            </td>
            <td>
                {props.seatsTaken}/{props.maxEnrollment}
            </td>
            <td>
                {props.timeFrom} - {props.timeTo}
            </td>
            <td>
                {props.days}
            </td>
            <td>
                {props.location}
            </td>
            <td>
                <a href = "https://www.google.com" > {props.professor} </a>
            </td>
        </tr>
    );
}

export default CourseScheduleEntry;