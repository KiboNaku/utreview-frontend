import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import Login from '../../../popups/Login'
import Signup from '../../../popups/Signup'

function ProfAddReview(props) {
    const profPath = props.firstName.toLowerCase().replace(" ", "") + "_" + props.lastName.toLowerCase().replace(" ", "")
    const addReviewLink = (
        <Link className="utcolor"
            to={{
                pathname: `prof-results/${profPath}`,
                state: {
                    profId: props.id
                }
            }}>
            <button style={{ height: "50px", width: "175px", fontSize: "20px" }} className="btn btn-dark font-weight-bold" type="button">
                Add a Review
                </button>
                {props.firstName} {props.lastName}
        </Link>
    )
    const loginLink = (
        <div>
            <button style={{ height: "50px", width: "175px", fontSize: "20px" }} className="btn btn-dark font-weight-bold" type="button" data-toggle="modal" data-target="#login-modal">
                Add a Review
            </button>
            <Login />
            <Signup />
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

export default withRouter(ProfAddReview);