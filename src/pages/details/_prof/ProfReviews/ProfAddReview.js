import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom'

const propTypes = {
    // id of the prof
    id: PropTypes.number.isRequired,

    // first name of the author
    firstName: PropTypes.string.isRequired,

    // last name of the author
    lastName: PropTypes.string.isRequired,

    // the median grade that the prof gives with all courses factored in
	medianGrade: PropTypes.string.isRequired
}

function ProfAddReview(props) {
    
    // generate the URL path name for the specific prof
    const profPath = props.firstName.toLowerCase().replace(/ /g,'') + "_" + props.lastName.toLowerCase().replace(/ /g,'')
    
    // generate the link for the page to add the review for the specific prof
    const addReviewLink = (
        <Link className="utcolor"
            to={{
                pathname: `/add-review/`,
                search: `?prof=${profPath}`,
                state: {
                    profId: props.id,
                    profFirst: props.firstName,
                    profLast: props.lastName
                }
            }}>

            <button style={{ height: "50px", width: "175px", fontSize: "20px" }} className="btn btn-dark font-weight-bold" type="button">
                Add a Review
            </button>
        </Link>
    )

    // generate button to login modal in case the user isn't logged in
    const loginLink = (
        <div>
            <button style={{ height: "50px", width: "175px", fontSize: "20px" }} className="btn btn-dark font-weight-bold" type="button" data-toggle="modal" data-target="#login-modal">
                Add a Review
            </button>
        </div>
    )

    return (
        <div className="profAddReview" >
            <h3 className="add-review-text"> Have you taken {props.firstName} {props.lastName}? </h3>
            <div className="add-review">
                {localStorage.usertoken ? addReviewLink : loginLink}
            </div>
        </div>
    );
}

ProfAddReview.props = propTypes;

export default withRouter(ProfAddReview);