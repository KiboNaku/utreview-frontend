import React from 'react';
import { Link } from 'react-router-dom'

function CourseProfEntry(props) {

    let percentLiked = props.percentLiked !== null ? `${props.percentLiked}%` : "N/A"
    let eCIS = props.eCIS !== null ? `${props.eCIS}` : "N/A"
    let clear = props.clear !== null ? `${props.clear}` : "N/A"
    let engaging = props.engaging !== null ? `${props.engaging}` : "N/A"
    let grading = props.grading !== null ? `${props.grading}` : "N/A"

    const profPath = props.firstName.toLowerCase().replace(" ", "") + "_" + props.lastName.toLowerCase().replace(" ", "")
    
    let profFirst = props.firstName
    let profLast = props.lastName
    profLast = profLast.split(" ")
    profLast = profLast[profLast.length - 1]
    let syllabiLink = `https://utdirect.utexas.edu/apps/student/coursedocs/nlogon/?semester=&department=${props.course.courseDept}&course_number=${props.course.courseNum}&course_title=&unique=&instructor_first=${profFirst}&instructor_last=${profLast}&course_type=In+Residence&search=Search`
   
    return (
        <tr key={props.id}>
            <td>
                <Link
                    className="utcolor"
                    to={{
                        pathname: `/prof-results/${profPath}`,
                        state: {
                            profId: props.id
                        }
                    }}
                > {props.firstName} {props.lastName}
                </Link>
            </td>
            <td colSpan="1">{percentLiked}</td>
            <td>{eCIS}</td>
            <td>{clear}</td>
            <td>{engaging}</td>
            <td>{grading}</td>
            <td >
                <a className="utcolor" href={syllabiLink} rel="noopener noreferrer" target="_blank"> Syllabi </a>
            </td>
            <td role="button" data-toggle="modal" data-target={`#grade-distributions-modal-${props.course.id}-${props.id}-course`} className="gradesIcon">
            </td>
        </tr>
    );
}

export default CourseProfEntry;