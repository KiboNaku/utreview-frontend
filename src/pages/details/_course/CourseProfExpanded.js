import React from 'react';

function CourseProfExpanded(props) {

    let percentLiked = props.percentLiked !== null ? `${props.percentLiked}%` : "N/A%"
    let eCIS = props.eCIS !== null ? `${props.eCIS}/5` : "N/A"
    let prof_id = "prof" + props.id.toString()
    return (
        <tr>
            <td colspan="6" id={prof_id} className="collapse">
                <div >
                    Hidden by default
                </div>
            </td>
        </tr>
    );
}

export default CourseProfExpanded

