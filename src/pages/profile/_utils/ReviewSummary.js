import React from 'react'
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded'
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded'
import ReviewDetails from './ReviewDetails'

function ReviewSummary(props) {

    // id: 2,
    // CourseNumber: "E E 306",
    // CourseApproval: true,
    // Usefulness: 4,
    // Difficulty: 2,
    // Workload: 2,
    // CourseComment: "course2 comment",

    // ProfessorName: "Patt, Yale",
    // ProfessorApproval: true,
    // Clear: 1,
    // Engaging: 2,
    // GradingDifficulty: 4,
    // ProfessorComment: "prof2 comment"

    return (
        <div className="col-4 review-container">
            <div className="card">
                <div className="card-body">
                    <p>
                        <span style={{ marginRight: '20px' }}><b>{props.data.CourseNumber}</b></span> {props.data.CourseApproval ?
                            <ThumbUpRoundedIcon style={{ fill: 'green' }} /> :
                            <ThumbDownRoundedIcon style={{ fill: 'red' }} />}
                    </p>
                    <p>
                        <span style={{ marginRight: '20px' }}><b>{props.data.ProfessorName}</b></span> {props.data.ProfessorApproval ?
                            <ThumbUpRoundedIcon style={{ fill: 'green' }} /> :
                            <ThumbDownRoundedIcon style={{ fill: 'red' }} />}
                    </p>

                    <ReviewDetails
                        data={props.data}
                        editReview={props.editReview}
                    />

                    <button type="button"
                        className="mr-1 ml-1 btn btn-outline-dark font-weight-bold"
                        data-toggle="modal"
                        data-target={"#review-details-modal" + props.data.id}
                    > More Details
                    </button>
                    <button
                        type="button"
                        className="mr-1 ml-1 btn btn-outline-dark font-weight-bold"
                        onClick={() => props.editReview(props.data.id)}
                    > Edit Review
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewSummary;