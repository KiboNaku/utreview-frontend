import React from 'react';

function CourseProfExpanded(props) {

    let percentLiked = props.percentLiked !== null ? `${props.percentLiked}%` : "N/A%"
    let eCIS = props.eCIS !== null ? `${props.eCIS}/5` : "N/A"
    let prof_id = "prof" + props.id.toString()
    return (
        <tr id={prof_id} className="collapse">
            <td colspan="3" align="center">
                <div >
                    <a href="https://www.google.com" > Syllabi </a>
                </div>
            </td>
            <td colspan="3" align="center">
                <div >
                    <a href="https://www.google.com" > UT Catalyst </a>
                </div>
            </td>
        </tr>
    );
}

export default CourseProfExpanded

