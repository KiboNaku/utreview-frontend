import React from 'react';

function ProfCourseEntry(props) {

    let percentLiked = props.percentLiked !== null ? `${props.percentLiked}%` : "N/A%"
    let eCIS = props.eCIS !== null ? `${props.eCIS}` : "N/A"
    let difficulty = props.difficulty !== null ? `${props.difficulty}` : "N/A"
    let usefulness = props.usefulness !== null ? `${props.usefulness}` : "N/A"
    let workload = props.workload !== null ? `${props.workload}` : "N/A"
    let prof_id = "prof" + props.id.toString()
    let courseName = props.courseDept + " " + props.courseNum
    let coursePath = props.courseDept.toLowerCase().replace(' ', '') + "_" + props.courseNum.toLowerCase()
    if(props.topicNum >= 0){
        coursePath += "_" + props.topicNum.toString()
    } 
    return (
        <tr>
            <td>
                <Link
                    className="utcolor"
                    to={{
                        pathname: `course-results/${coursePath}`,
                        state: {
                            courseId: course.id
                        }
                    }}
                > {courseName}
                </Link>
            </td>
            <td align="center">{percentLiked}</td>
            <td align="center">{eCIS}</td>
            <td align="center">{difficulty}</td>
            <td align="center">{usefulness}</td>
            <td align="center">{workload}</td>
            <td align="center">
                <a href="https://www.google.com" > Syllabi </a>
            </td>
            <td align="center">
                <a href="https://www.google.com" > UT Catalyst </a>
            </td>
        </tr>
    );
}

export default ProfCourseEntry;