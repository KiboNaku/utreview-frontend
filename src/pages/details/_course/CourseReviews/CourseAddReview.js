import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const propTypes = {
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
}

function CourseAddReview(props) {

    // generate url pathname for the specific course
    let coursePath = props.courseDept.toLowerCase().replace(/ /g,'') + "_" + props.courseNum.toLowerCase()
    if(props.topicNum !== -1){
        coursePath += "_" + props.topicNum.toString()
    }  

    // generate link to add review page for the specific course
    const addReviewLink = (
        <Link
            to={{
                pathname: `/add-review/`,
                search: `?course=${coursePath}`,
                state: {
                    courseId: props.id,
                    courseDept: props.courseDept,
                    courseNum: props.courseNum,
                    courseTitle: props.courseTitle,
                    topicId: props.topicId,
                    parentId: props.parentId,
                    topicNum: props.topicNum,
                }
            }}
        >
            <button  className="add-review-button" type="button">
                <span className="add-review-button-text">Add a Review</span>
            </button>
        </Link>
    )

    // generate button to login modal (in case user isn't logged in)
    const loginLink = (
        <div>
            <button className="add-review-button" type="button" data-toggle="modal" data-target="#login-modal">
                Add a Review
            </button>
        </div>
    )
    
    return (
        <div className="courseAddReview">
            <h3 className="add-review-text"> Have you taken {props.courseDept} {props.courseNum}? </h3>
            <div className="add-review">
                {localStorage.usertoken ? addReviewLink : loginLink}
            </div>
        </div>
    );
}

CourseAddReview.propTypes = propTypes

export default withRouter(CourseAddReview);