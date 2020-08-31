import React from 'react';
import PropTypes from 'prop-types';
import ProfLink from './../../../_utils/ProfLink'
import { Link } from 'react-router-dom'

const propTypes = {
    course: PropTypes.shape({
        // course id
        id: PropTypes.number.isRequired,

        // course's department abbreviation
        courseDept: PropTypes.string.isRequired,

        // course number
        courseNum: PropTypes.string.isRequired,

        // course title
        courseTitle: PropTypes.string.isRequired,

        // course description
        courseDes: PropTypes.string.isRequired,

        // course's topic id
        topicId: PropTypes.number.isRequired,

        // course's topic number
        topicNum: PropTypes.number.isRequired,

        // course's parent topic's id
        parentId: PropTypes.number,

        // course's parent topic's title
        parentTitle: PropTypes.string,

        // list of children topics, only if course is a parent topic
        topicsList: PropTypes.arrayOf(
            PropTypes.shape({
                // course id
                id: PropTypes.number,

                // course's topic number
                topicNum: PropTypes.number,

                // course's title
                title: PropTypes.string
            })
        ),

        // median letter grade obtained in the course
        medianGrade: PropTypes.string,
    }),

    // prof's id
    id: PropTypes.number.isRequired,

    // prof's first name
    firstName: PropTypes.string.isRequired,

    // prof's last name
    lastName: PropTypes.string.isRequired,

    // percent of ratings that have positive approval for the prof
    percentLiked: PropTypes.number,

    // average clear rating for the prof
    clear: PropTypes.number,

    // average engaging rating for the prof
    engaging: PropTypes.number,

    // average grading rating for the prof
    grading: PropTypes.number,

    // average eCIS rating for the prof
    eCIS: PropTypes.number

}

function CourseProfEntry(props) {

    // determine rating values depending on whether the value is null of if the value exists
    let percentLiked = props.percentLiked !== null ? `${props.percentLiked}%` : "N/A"
    let eCIS = props.eCIS !== null ? `${props.eCIS}` : "N/A"
    let clear = props.clear !== null ? `${props.clear}` : "N/A"
    let engaging = props.engaging !== null ? `${props.engaging}` : "N/A"
    let grading = props.grading !== null ? `${props.grading}` : "N/A"
    
    // generate the syllabi link with the course/prof combination
    let profFirst = props.firstName
    let profLast = props.lastName
    profFirst = profFirst.split(" ")
    profFirst = profFirst[0]
    profLast = profLast.split(" ")
    profLast = profLast[profLast.length - 1]
    let syllabiLink = `https://utdirect.utexas.edu/apps/student/coursedocs/nlogon/?semester=&department=${props.course.courseDept}&course_number=${props.course.courseNum}&course_title=&unique=&instructor_first=${profFirst}&instructor_last=${profLast}&course_type=In+Residence&search=Search`
   
    return (
        <tr key={props.id} className="table-information-text">
            <td>
                <ProfLink 
                    profId={props.id}
                    firstName={props.firstName}
                    lastName={props.lastName}
                />
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

CourseProfEntry.propTypes = propTypes

export default CourseProfEntry;