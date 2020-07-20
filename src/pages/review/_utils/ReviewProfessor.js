import React from 'react'
import { StyledRating } from './Rating'
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import { BinaryFeedback } from 'react-simple-user-feedback'

function ReviewProfessor(props) {
    let likeIcon = props.data.profRating.likePressed ?
        <ThumbUpRoundedIcon style={{ fill: '#a6cd57' }} /> : <ThumbUpRoundedIcon style={{ fill: 'gray' }} />
    let dislikeIcon = props.data.profRating.dislikePressed ?
        <ThumbDownRoundedIcon style={{ fill: '#ed7f7b' }} /> : <ThumbDownRoundedIcon style={{ fill: 'gray' }} />

    const likeButton = (
        <span
            className="btn-like btn-approval"
            onClick={() => props.handleLike('prof')}
        >
            {likeIcon}
        </span>
    )

    const dislikeButton = (
        <span
            className="btn-dislike btn-approval"
            onClick={() => props.handleDislike('prof')}
        >
            {dislikeIcon}
        </span>
    )

    const approvalDescription = `Did you like the professor overall?`
    const clearDescription = `How well did the professor explain the course material?
    1 - Explained poorly, 5 - Explained very well`
    const engagingDescription = `How good was the professor at keeping your attention during lecture?
    1 - Could not keep my attention, 5 - Kept my attention very well`
    const gradingDescription = `How strict was the professor when grading your work?
    1 - Not strict at all, 5 - Very strict`

    const [engagingOpen, engagingSetOpen] = React.useState(false);
    const handleEngagingClose = () => {
        engagingSetOpen(false);
    };
    const handleEngagingOpen = () => {
        engagingSetOpen(true);
    };

    return (

        <table className="table table-borderless review-form">
            <tbody>
                <tr>
                    <td> Approval:
                        {props.data.error.prof.approval ? (
                            <td>
                                <small className="text-danger">{props.data.error.prof.approval}</small>
                            </td>
                        ) : null}
                    </td>
                    <td>
                        {likeButton}
                        {dislikeButton}
                    </td>
                </tr>
                <tr>
                    <td> Clear:
                        {props.data.error.clear ? (
                            <td>
                                <small className="text-danger">{props.data.error.clear}</small>
                            </td>
                        ) : null}
                    </td>
                    <td> <StyledRating
                        type="rating"
                        value={props.data.profRating.clear}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="clear"
                        onChange={props.handleProfRatingChange}
                    /></td>
                </tr>
                <tr>
                    <td style={{
                        display: 'flex',
                        alignItems: 'center'}} >
                            <span>Engaging  </span>
                            <ClickAwayListener onClickAway={handleEngagingClose}>
                                <Tooltip
                                    title={engagingDescription}
                                    placement="right"
                                    arrow
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    onOpen={handleEngagingOpen}
                                    onClose={handleEngagingClose}
                                    open={engagingOpen}
                                >
                                    <span>
                                        <button type="button" className="info-tooltip" onClick={handleEngagingOpen}>
                                            <HelpOutlineIcon className="info-icon" style= {{fontSize: 15}} />
                                        </button>
                                    </span>

                                </Tooltip>
                            </ClickAwayListener>

                        :
                    {props.data.error.engaging ? (
                        <td>
                            <small className="text-danger">{props.data.error.engaging}</small>
                        </td>
                    ) : null}
                    </td>
                <td> <StyledRating
                    type="rating"
                    value={props.data.profRating.engaging}
                    icon={<RadioButtonCheckedIcon />}
                    emptyIcon={<RadioButtonUncheckedIcon />}
                    name="engaging"
                    onChange={props.handleProfRatingChange}
                /></td>
                </tr>
            <tr>
                <td> Grading Difficulty:
                        {props.data.error.grading ? (
                        <td>
                            <small className="text-danger">{props.data.error.grading}</small>
                        </td>
                    ) : null}
                </td>
                <td>
                    <StyledRating
                        type="rating"
                        value={props.data.profRating.grading}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="grading"
                        onChange={props.handleProfRatingChange}
                    />
                </td>
            </tr>
            <tr>
                <th colSpan="2">

                    <textarea
                        className="form-control"
                        rows="5"
                        value={props.data.profRating.comments}
                        placeholder="Please elaborate (optional)."
                        name="comments"
                        onChange={props.handleProfRatingChange}></textarea>
                </th>
            </tr>
            </tbody>
        </table >
    )
}

export default ReviewProfessor