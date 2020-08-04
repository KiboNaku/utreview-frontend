import React from 'react'
import { StyledRating } from './Rating'
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { withStyles } from "@material-ui/core/styles";
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

    const StyledTooltip = withStyles({
        tooltip: {
            color: "white",
            backgroundColor: "#bf5700",
            fontSize: "12px"
        },
        arrow: {
            color: "#bf5700"
        }
    })(Tooltip);
    const commentsPlaceholder = `(Optional) Please elaborate on your experience with this professor.`
    const commentsDescription = `What did you like/dislike about the professor's teaching style?
    Was the professor approachable and accessible during office hours?
    How difficult were this professor's assignments and exams?
    Would you recommmend this professor to others?
    Is there anything about this professor that future students would find helpful to know about?`

    const approvalDescription = `Did you like the professor overall?`
    const clearDescription = `How well did the professor explain the course material?
    1 - Explained poorly, 5 - Explained very well`
    const engagingDescription = `How good was the professor at keeping your attention during lecture?
    1 - Could not keep my attention, 5 - Kept my attention very well`
    const gradingDescription = `How strict was the professor when grading your work?
    1 - Not strict at all, 5 - Very strict`

    const [approvalOpen, approvalSetOpen] = React.useState(false);
    const handleApprovalClose = () => {
        approvalSetOpen(false);
    };
    const handleApprovalOpen = () => {
        approvalSetOpen(true);
    };

    const [clearOpen, clearSetOpen] = React.useState(false);
    const handleClearClose = () => {
        clearSetOpen(false);
    };
    const handleClearOpen = () => {
        clearSetOpen(true);
    };

    const [engagingOpen, engagingSetOpen] = React.useState(false);
    const handleEngagingClose = () => {
        engagingSetOpen(false);
    };
    const handleEngagingOpen = () => {
        engagingSetOpen(true);
    };

    const [gradingOpen, gradingSetOpen] = React.useState(false);
    const handleGradingClose = () => {
        gradingSetOpen(false);
    };
    const handleGradingOpen = () => {
        gradingSetOpen(true);
    };

    const [commentsOpen, commentsSetOpen] = React.useState(false);
    const handleCommentsClose = () => {
        commentsSetOpen(false);
    };
    const handleCommentsOpen = () => {
        commentsSetOpen(true);
    };

    return (

        <div className="review-form">
            <div className="review-row">
                <div className="col" style={{ alignItems: 'center' }} >
                    <span>Approval<small className='text-danger'> *</small></span>
                    <ClickAwayListener onClickAway={handleApprovalClose}>
                        <StyledTooltip
                            title={approvalDescription}
                            placement="right"
                            arrow
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onOpen={handleApprovalOpen}
                            onClose={handleApprovalClose}
                            open={approvalOpen}
                        >
                            <span>
                                <button type="button" className="info-tooltip" onClick={handleApprovalOpen}>
                                    <HelpOutlineIcon className="info-icon" style={{ fontSize: 15 }} />
                                </button>
                            </span>

                        </StyledTooltip>
                    </ClickAwayListener>

                        :
                    {props.data.error.prof.approval ? (
                        <div>
                            <small className="text-danger">{props.data.error.prof.approval}</small>
                        </div>
                    ) : null}
                </div>
                <div className="approval-buttons">
                    {likeButton}
                    {dislikeButton}
                </div>
            </div>
            <div className="review-row">
                <div className="col" style={{ alignItems: 'center' }} >
                    <span>Clear<small className='text-danger'> *</small></span>
                    <ClickAwayListener onClickAway={handleClearClose}>
                        <StyledTooltip
                            title={clearDescription}
                            placement="right"
                            arrow
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onOpen={handleClearOpen}
                            onClose={handleClearClose}
                            open={clearOpen}
                        >
                            <span>
                                <button type="button" className="info-tooltip" onClick={handleClearOpen}>
                                    <HelpOutlineIcon className="info-icon" style={{ fontSize: 15 }} />
                                </button>
                            </span>

                        </StyledTooltip>
                    </ClickAwayListener>

                        :
                    {props.data.error.prof.clear ? (
                        <div>
                            <small className="text-danger">{props.data.error.prof.clear}</small>
                        </div>
                    ) : null}
                </div>
                <div className="review-rating">
                    <StyledRating
                        type="rating"
                        value={props.data.profRating.clear}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="clear"
                        onChange={props.handleProfRatingChange}
                    />
                </div>
            </div>
            <div className="review-row">
                <div className="col" style={{ alignItems: 'center' }} >
                    <span>Engaging<small className='text-danger'> *</small></span>
                    <ClickAwayListener onClickAway={handleEngagingClose}>
                        <StyledTooltip
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
                                    <HelpOutlineIcon className="info-icon" style={{ fontSize: 15 }} />
                                </button>
                            </span>

                        </StyledTooltip>
                    </ClickAwayListener>

                        :
                    {props.data.error.prof.engaging ? (
                        <div>
                            <small className="text-danger">{props.data.error.prof.engaging}</small>
                        </div>
                    ) : null}
                </div>
                <div className="review-rating">
                    <StyledRating
                        type="rating"
                        value={props.data.profRating.engaging}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="engaging"
                        onChange={props.handleProfRatingChange}
                    />
                </div>
            </div>
            <div className="review-row">
                <div className="col" style={{ alignItems: 'center' }} >
                    <span>Grading<small className='text-danger'> *</small></span>
                    <ClickAwayListener onClickAway={handleGradingClose}>
                        <StyledTooltip
                            title={gradingDescription}
                            placement="right"
                            arrow
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onOpen={handleGradingOpen}
                            onClose={handleGradingClose}
                            open={gradingOpen}
                        >
                            <span>
                                <button type="button" className="info-tooltip" onClick={handleGradingOpen}>
                                    <HelpOutlineIcon className="info-icon" style={{ fontSize: 15 }} />
                                </button>
                            </span>

                        </StyledTooltip>
                    </ClickAwayListener>

                        :
                    {props.data.error.prof.grading ? (
                        <div>
                            <small className="text-danger">{props.data.error.prof.grading}</small>
                        </div>
                    ) : null}
                </div>
                <div className="review-rating">
                    <StyledRating
                        type="rating"
                        value={props.data.profRating.grading}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="grading"
                        onChange={props.handleProfRatingChange}
                    />
                </div>
            </div>
            <div className="review-row">
                <div className="col" style={{ alignItems: 'center' }} >
                    <span>Comments </span>
                    <ClickAwayListener onClickAway={handleCommentsClose}>
                        <StyledTooltip
                            title={commentsDescription}
                            placement="right"
                            arrow
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onOpen={handleCommentsOpen}
                            onClose={handleCommentsClose}
                            open={commentsOpen}
                        >
                            <span>
                                <button type="button" className="info-tooltip" onClick={handleCommentsOpen}>
                                    <HelpOutlineIcon className="info-icon" style={{ fontSize: 15 }} />
                                </button>
                            </span>

                        </StyledTooltip>
                    </ClickAwayListener>

                        :
                </div>
            </div>
            <div>
                <textarea
                    className="form-control"
                    rows="5"
                    value={props.data.profRating.comments}
                    placeholder={commentsPlaceholder}
                    name="comments"
                    onChange={props.handleProfRatingChange}
                    maxlength="1000"
                >
                </textarea>
            </div>
        </div >
    )
}

export default ReviewProfessor