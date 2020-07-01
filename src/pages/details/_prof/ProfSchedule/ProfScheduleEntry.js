import React from 'react';

function ProfScheduleEntry(props) {

	return (
        <tr>
            <td>
                {props.uniqueNo}
            </td>
            <td align="center">
                <a href = "https://www.google.com" > {props.course} </a>
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
            
        </tr>
    );
}

export default ProfScheduleEntry;