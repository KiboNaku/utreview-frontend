import React from 'react';

function CourseProfEntry(props) {

    let percentLiked = props.percentLiked !== null ? `${props.percentLiked}%` : "N/A%"
    let eCIS = props.eCIS !== null ? `${props.eCIS}` : "N/A"
    let clear = props.clear !== null ? `${props.clear}` : "N/A"
    let engaging = props.engaging !== null ? `${props.engaging}` : "N/A"
    let grading = props.grading !== null ? `${props.grading}` : "N/A"
    let prof_id = "prof" + props.id.toString()
    return ( 
        <tr role="button" data-toggle="collapse" data-target={`#${[prof_id]}`}>
            <td>
                <a href="https://www.google.com" > {props.name} </a>
            </td>
            <td align="center">{percentLiked}</td>
            <td align="center">{eCIS}</td>  
            <td align="center">{clear}</td>
            <td align="center">{engaging}</td>
            <td align="center">{grading}</td>
        </tr> 
    );
}

export default CourseProfEntry;