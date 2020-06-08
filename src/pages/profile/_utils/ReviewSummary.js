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

                    {/* <table className='table table-borderless review-content'>
                        <thead>
                            <tr data-toggle='collapse' data-target={'#collapse' + props.data.id}>
                                <th style={{width: "40%"}} className='review-cell' scope="col">
                                    {props.data.CourseNumber} {props.data.CourseApproval ?
                                        <ThumbUpRoundedIcon style={{ fill: 'green' }} /> :
                                        <ThumbDownRoundedIcon style={{ fill: 'red' }} />}
                                </th>
                                <th style={{width: "10%"}} className='review-cell' scope="col">
                                </th>
                                <th style={{width: "40%"}} className='review-cell' scope="col">
                                    {props.data.ProfessorName} {props.data.ProfessorApproval ?
                                        <ThumbUpRoundedIcon style={{ fill: 'green' }} /> :
                                        <ThumbDownRoundedIcon style={{ fill: 'red' }} />}
                                </th>
                                <th style={{width: "10%"}} className='review-cell' scope="col">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody className='collapse' id={'collapse' + props.data.id}>
                            <tr>
                                <td> Usefulness: </td>
                                <td> {props.data.Usefulness}</td>
                                <td> Clear: </td>
                                <td> {props.data.Clear}</td>
                            </tr>
                            <tr>
                                <td> Difficulty: </td>
                                <td> {props.data.Difficulty}</td>
                                <td> Engaging: </td>
                                <td> {props.data.Engaging}</td>
                            </tr>
                            <tr>
                                <td> Workload: </td>
                                <td> {props.data.Workload}</td>
                                <td> Grading Difficulty: </td>
                                <td> {props.data.GradingDifficulty}</td>
                            </tr>
                        </tbody>
                    </table> */}
                    <ReviewDetails
                        data={props.data}
                        editReview={props.editReview}
                    />
    
                    <button type="button"
                        className="mr-1 ml-1 btn btn-outline-dark font-weight-bold"
                        data-toggle="modal"
                        data-target="#review-details-modal"
                    > More Details
                    </button>
                    <button
                        type="button"
                        className="mr-1 ml-1 btn btn-outline-dark font-weight-bold"
                        onClick={props.editReview}
                    > Edit Review
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewSummary;