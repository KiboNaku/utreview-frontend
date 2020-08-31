import React from 'react';
import PropTypes from 'prop-types';
import CourseLink from './../../../_utils/CourseLink'
import { Link } from 'react-router-dom'

const propTypes = {

    // id of the prof
    id: PropTypes.number.isRequired,

    // first name of the prof
    firstName: PropTypes.string.isRequired,

    // last name of the prof
    lastName: PropTypes.string.isRequired,

    // the median grade that the prof gives with all courses factored in
    medianGrade: PropTypes.string.isRequired,

    // scrolls to the review section of the page
    handleScrollToReview: PropTypes.func.isRequired,
    
    // the department that the course taught by the prof is in
    courseDept: PropTypes.string.isRequired,

    // percentage of students who liked the prof
    courseNum: PropTypes.string.isRequired,

    // average rating for the clearness for the prof
    topicNum: PropTypes.number,

    // percentage of people who liked the course taught by the prof
    percentLiked: PropTypes.number,

    // average rating for difficulty of the course taught by the prof
    difficulty: PropTypes.number,
    
    // average rating for usefulness of the course taught by the prof
    usefulness: PropTypes.number,

    // average rating for workload of the course taught by the prof
    workload: PropTypes.number,

    // average rating for eCIS of the course taught by the prof
    eCIS: PropTypes.number
}

function ProfCourseEntry(props) {

    // determine rating values depending on whether if they are null or exist
    let percentLiked = props.percentLiked !== null ? `${props.percentLiked}%` : "N/A"
    let eCIS = props.eCIS !== null ? `${props.eCIS}` : "N/A"
    let difficulty = props.difficulty !== null ? `${props.difficulty}` : "N/A"
    let usefulness = props.usefulness !== null ? `${props.usefulness}` : "N/A"
    let workload = props.workload !== null ? `${props.workload}` : "N/A"

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
                <CourseLink 
                    courseId={props.id}
                    courseDept={props.courseDept}
                    courseNum={props.courseNum}
                    topicNum={props.topicNum}
                    display="name"
                />
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

ProfCourseEntry.props = propTypes;

export default ProfCourseEntry;