import React from 'react';

function CourseProfEntry(props) {

    
	return (
        <tr>
            <td>
                <a href = "https://www.google.com" > {props.firstName} {props.lastName} </a>
            </td>
            <td>{props.percentLiked}%</td>
            <td>{props.eCIS}/5</td>
        </tr>
    );
}

export default CourseProfEntry;