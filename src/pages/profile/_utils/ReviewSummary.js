import React from 'react'
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded'
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded'
import Confirm from './../../_utils/Confirm'
import ReviewDetails from './ReviewDetails'

function ReviewSummary(props) {

    let courseLikeIcon = props.data.course_rating.approval ?
        <ThumbUpRoundedIcon style={{ fill: '#a6cd57' }} /> : <ThumbUpRoundedIcon style={{ fill: 'gray' }} />
    let courseDislikeIcon = !props.data.course_rating.approval ?
        <ThumbDownRoundedIcon style={{ fill: '#ed7f7b' }} /> : <ThumbDownRoundedIcon style={{ fill: 'gray' }} />

    let profLikeIcon = props.data.professor_rating.approval ?
        <ThumbUpRoundedIcon style={{ fill: '#a6cd57' }} /> : <ThumbUpRoundedIcon style={{ fill: 'gray' }} />
    let profDislikeIcon = !props.data.professor_rating.approval ?
        <ThumbDownRoundedIcon style={{ fill: '#ed7f7b' }} /> : <ThumbDownRoundedIcon style={{ fill: 'gray' }} />
    let modalId = "#confirmModal" + props.data.id.toString()
    return (
        <div className="review-container">
            <div className="profile-review-wrapper"> 
                <Confirm
                    title="Delete Review"
                    message="Are you sure you want to delete this review?"
                    id={props.data.id}
                    handleOk={() => props.deleteReview(props.data.id)}
                />
                <p className="course-name-wrapper" 
                style={props.data.courseRating.approval ? {color: "#a6cd57"} : {color: "#ed7f7b"}}>
                    <span className="course-name">{props.data.course.dept.abr} {props.data.course.num}</span>
                </p>

                <p className="prof-name" 
                style={props.data.profRating.approval ? {color: "#a6cd57"} : {color: "#ed7f7b"}}>
                    <span>{props.data.prof.firstName} {props.data.prof.lastName}</span>
                </p>

                <p className="semester-date">
                    <span>{props.data.semester.semester} {props.data.semester.year}</span>
                </p>

                <p className="update-date"><small>Last updated: {props.data.date}</small></p>

                <ReviewDetails
                    data={props.data}
                    editReview={props.editReview}
                />
                <div className="button-wrapper1">
                    <button type="button"
                        className="review-buttons"
                        data-toggle="modal"
                        data-target={"#review-details-modal" + props.data.id}
                    > More Details
                    </button>
                </div>
                <br></br>
                <div className="button-wrapper2"> 
                    <button
                        type="button"
                        className="review-buttons"
                        onClick={() => props.editReview(props.data.id)}
                    > Edit Review
                    </button>
                </div>

                <div className="delete-review">
                    <div data-toggle="modal" data-target={modalId}>Delete</div>
                </div>
            </div>
        </div>
    )
}

export default ReviewSummary;