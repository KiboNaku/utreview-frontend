import React from 'react';
import { Link } from 'react-router-dom'

function ProfCourseEntry(props) {
    
    let percentLiked = props.percentLiked !== null ? `${props.percentLiked}%` : "N/A"
    let eCIS = props.eCIS !== null ? `${props.eCIS}` : "N/A"
    let difficulty = props.difficulty !== null ? `${props.difficulty}` : "N/A"
    let usefulness = props.usefulness !== null ? `${props.usefulness}` : "N/A"
    let workload = props.workload !== null ? `${props.workload}` : "N/A"

    let courseName = props.courseDept + " " + props.courseNum
    let coursePath = props.courseDept.toLowerCase().replace(' ', '') + "_" + props.courseNum.toLowerCase()
    if(props.topicNum >= 0){
        coursePath += "_" + props.topicNum.toString()
    } 

    let profFirst = props.prof.firstName
    let profLast = props.prof.lastName
    profFirst = profFirst.split(" ")
    profFirst = profFirst[0]
    profLast = profLast.split(" ")
    profLast = profLast[profLast.length - 1]
    let syllabiLink = `https://utdirect.utexas.edu/apps/student/coursedocs/nlogon/?semester=&department=${props.courseDept}&course_number=${props.courseNum}&course_title=&unique=&instructor_first=${profFirst}&instructor_last=${profLast}&course_type=In+Residence&search=Search`
    
    return (
        <tr>
            <td>  
                <Link
                    className="utcolor"
                    to={{
                        pathname: `/course-results/${coursePath}`,
                    }}
                > {courseName}
                </Link>
            </td>
            <td>{percentLiked}</td>
            <td>{eCIS}</td>
            <td>{usefulness}</td>
            <td>{difficulty}</td>
            <td>{workload}</td>
            <td>
                <a href={syllabiLink} rel="noopener noreferrer" target="_blank"> Syllabi </a>
            </td>
            <td role="button" data-toggle="modal" data-target={`#grade-distributions-modal-${props.prof.id}-${props.id}-prof`} className="gradesIcon">
            </td>
        </tr>
    );
}

export default ProfCourseEntry;