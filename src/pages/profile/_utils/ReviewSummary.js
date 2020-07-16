import React from 'react'
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded'
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded'
import ReviewDetails from './ReviewDetails'

function ReviewSummary(props) {

    let courseLikeIcon = props.data.courseRating.approval ?
        <ThumbUpRoundedIcon style={{ fill: '#a6cd57' }} /> : <ThumbUpRoundedIcon style={{ fill: 'gray' }} />
    let courseDislikeIcon = !props.data.courseRating.approval ?
        <ThumbDownRoundedIcon style={{ fill: '#ed7f7b' }} /> : <ThumbDownRoundedIcon style={{ fill: 'gray' }} />

    let profLikeIcon = props.data.profRating.approval ?
        <ThumbUpRoundedIcon style={{ fill: '#a6cd57' }} /> : <ThumbUpRoundedIcon style={{ fill: 'gray' }} />
    let profDislikeIcon = !props.data.profRating.approval ?
        <ThumbDownRoundedIcon style={{ fill: '#ed7f7b' }} /> : <ThumbDownRoundedIcon style={{ fill: 'gray' }} />

    return (
        <div className="col-sm-4 review-container">
            <div className="card">
                <div className="card-body">
                    <i className="fas fa-trash trash-icon" onClick={() => props.deleteReview(props.data.id)}></i>
                    <p>
                        <span><b>{props.data.semester.semester} {props.data.semester.year}</b></span>
                    </p>
                    <p>
                        <span style={{ marginRight: '20px' }}><b>{props.data.course.dept.abr} {props.data.course.num}</b></span>
                        <span className='btn-approval'>{courseLikeIcon}</span>
                        {courseDislikeIcon}
                    </p>
                    <p>
                        <span style={{ marginRight: '20px' }}><b>{props.data.prof.firstName} {props.data.prof.lastName}</b></span>
                        <span className='btn-approval'>{profLikeIcon}</span>
                        {profDislikeIcon}
                    </p>
                    <p><small>Last updated: {props.data.date}</small></p>

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
    )
}

export default ReviewSummary;