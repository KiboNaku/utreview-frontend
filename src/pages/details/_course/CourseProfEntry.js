import React from 'react';

function CourseProfEntry(props) {

    let percentLiked = props.percentLiked !== null ? `${props.percentLiked}%`: "N/A%"
    let eCIS = props.eCIS !== null ? `${props.eCIS}/5`: "N/A"
	return (
        <tr>
            <td>
                <a href = "https://www.google.com" > {props.name} </a>
            </td>
            <td>{percentLiked}</td>
            <td>{eCIS}</td>
        </tr>
    );
}

export default CourseProfEntry;