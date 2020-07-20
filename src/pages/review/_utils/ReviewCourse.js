import React from 'react'
import { StyledRating } from './Rating'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import { BinaryFeedback } from 'react-simple-user-feedback'

function ReviewCourse(props) {
    let likeIcon = props.data.courseRating.likePressed ?
        <ThumbUpRoundedIcon style={{ fill: '#a6cd57' }} /> : <ThumbUpRoundedIcon style={{ fill: 'gray' }} />
    let dislikeIcon = props.data.courseRating.dislikePressed ?
        <ThumbDownRoundedIcon style={{ fill: '#ed7f7b' }} /> : <ThumbDownRoundedIcon style={{ fill: 'gray' }} />

    const likeButton = (
        <span
            className="btn-like btn-approval"
            onClick={() => props.handleLike('course')}
        >
            {likeIcon}
        </span>
    )

    const dislikeButton = (
        <span
            className="btn-dislike btn-approval"
            onClick={() => props.handleDislike('course')}
        >
            {dislikeIcon}
        </span>
    )


    return (

        <table className="table table-borderless review-form">
            <tbody>
                <tr>
                    <td> Approval:
                        {props.data.error.course.approval ? (
                            <td>
                                <small className="text-danger">{props.data.error.course.approval}</small>
                            </td>
                        ) : null}
                    </td>
                    <td>
                        {likeButton}
                        {dislikeButton}
                    </td>
                </tr>
                <tr>
                    <td> Usefulness:
                        {props.data.error.course.usefulness ? (
                            <td>
                                <small className="text-danger">{props.data.error.course.usefulness}</small>
                            </td>
                        ) : null}
                    </td>
                    <td> <StyledRating
                        type="rating"
                        value={props.data.courseRating.usefulness}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="usefulness"
                        onChange={props.handleCourseRatingChange}
                    /></td>
                </tr>
                <tr>
                    <td> Difficulty:
                        {props.data.error.difficulty ? (
                            <td>
                                <small className="text-danger">{props.data.error.difficulty}</small>
                            </td>
                        ) : null}
                    </td>
                    <td> <StyledRating
                        type="rating"
                        value={props.data.courseRating.difficulty}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="difficulty"
                        onChange={props.handleCourseRatingChange}
                    /></td>
                </tr>
                <tr>
                    <td> Workload:
                        {props.data.error.workload ? (
                            <td>
                                <small className="text-danger">{props.data.error.workload}</small>
                            </td>
                        ) : null}
                    </td>
                    <td> <StyledRating
                        type="rating"
                        value={props.data.courseRating.workload}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="workload"
                        onChange={props.handleCourseRatingChange}
                    /></td>
                </tr>
                <tr>
                    <th colSpan="2">

                        <textarea
                            className="form-control" rows="5"
                            value={props.data.courseRating.comments}
                            placeholder="Please elaborate (optional)."
                            name="comments"
                            onChange={props.handleCourseRatingChange}></textarea>
                    </th>
                </tr>
            </tbody>
        </table>
    )
}

export default ReviewCourse