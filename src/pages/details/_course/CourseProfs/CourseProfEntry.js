import React from 'react';

function CourseProfEntry(props) {

    let percentLiked = props.percentLiked !== null ? `${props.percentLiked}%` : "N/A%"
    let eCIS = props.eCIS !== null ? `${props.eCIS}` : "N/A"
    let clear = props.clear !== null ? `${props.clear}` : "N/A"
    let engaging = props.engaging !== null ? `${props.engaging}` : "N/A"
    let grading = props.grading !== null ? `${props.grading}` : "N/A"
    let prof_id = "prof" + props.id.toString()
    const profPath = props.firstName.toLowerCase().replace(" ", "") + "_" + props.lastName.toLowerCase().replace(" ", "")
    return (
        <tr key={props.id}>
            <td>
                <Link
                    className="utcolor"
                    to={{
                        pathname: `prof-results/${profPath}`,
                        state: {
                            profId: props.id
                        }
                    }}
                > {props.firstName} {props.lastName}
                </Link>
            </td>
            <td align="center">{percentLiked}</td>
            <td align="center">{eCIS}</td>
            <td align="center">{clear}</td>
            <td align="center">{engaging}</td>
            <td align="center">{grading}</td>
            <td align="center">
                <a href="https://www.google.com" > Syllabi </a>
            </td>
            <td align="center">
                <a href="https://www.google.com" > UT Catalyst </a>
            </td>
        </tr>
    );
}

export default CourseProfEntry;