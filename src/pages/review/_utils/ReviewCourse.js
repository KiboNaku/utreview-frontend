import React from 'react'
import { StyledRating } from './Rating'
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
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
    const commentsPlaceholder = `(Optional) Please elaborate on your experience with this course.`
    const commentsDescription = `What did you like/dislike about the course's format/organizaton?
    How much did you learn from the course? Was the course content applicable to your future career?
    Would you recommmend this course to others?
    Is there anything about this course that future students would find helpful to know about?`

    const approvalDescription = `Did you like the course overall?`
    const usefulnessDescription = `Did you find the course content to be applicable to your future career?
    1 - Not applicable at all, 5 - Very applicable`
    const difficultyDescription = `How difficult was learning the course material?
    1 - Not difficult at all, 5 - Very difficult`
    const workloadDescription = `How demanding/time-consuming was the workload for this course?
    1 - Not demanding at all, 5 - Very demanding`

    const [approvalOpen, approvalSetOpen] = React.useState(false);
    const handleApprovalClose = () => {
        approvalSetOpen(false);
    };
    const handleApprovalOpen = () => {
        approvalSetOpen(true);
    };

    const [usefulnessOpen, usefulnessSetOpen] = React.useState(false);
    const handleUsefulnessClose = () => {
        usefulnessSetOpen(false);
    };
    const handleUsefulnessOpen = () => {
        usefulnessSetOpen(true);
    };

    const [difficultyOpen, difficultySetOpen] = React.useState(false);
    const handleDifficultyClose = () => {
        difficultySetOpen(false);
    };
    const handleDifficultyOpen = () => {
        difficultySetOpen(true);
    };

    const [workloadOpen, workloadSetOpen] = React.useState(false);
    const handleWorkloadClose = () => {
        workloadSetOpen(false);
    };
    const handleWorkloadOpen = () => {
        workloadSetOpen(true);
    };

    const [commentsOpen, commentsSetOpen] = React.useState(false);
    const handleCommentsClose = () => {
        commentsSetOpen(false);
    };
    const handleCommentsOpen = () => {
        commentsSetOpen(true);
    };


    return (

        <table className="table table-borderless review-form">
            <tbody>
                <tr>
                <td style={{
                        alignItems: 'center'}} >
                            <span>Approval </span>
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
                                            <HelpOutlineIcon className="info-icon" style= {{fontSize: 15}} />
                                        </button>
                                    </span>

                                </StyledTooltip>
                            </ClickAwayListener>

                        :
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
                <td style={{
                        alignItems: 'center'}} >
                            <span>Usefulness </span>
                            <ClickAwayListener onClickAway={handleUsefulnessClose}>
                                <StyledTooltip
                                    title={usefulnessDescription}
                                    placement="right"
                                    arrow
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    onOpen={handleUsefulnessOpen}
                                    onClose={handleUsefulnessClose}
                                    open={usefulnessOpen}
                                >
                                    <span>
                                        <button type="button" className="info-tooltip" onClick={handleUsefulnessOpen}>
                                            <HelpOutlineIcon className="info-icon" style= {{fontSize: 15}} />
                                        </button>
                                    </span>

                                </StyledTooltip>
                            </ClickAwayListener>

                        :
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
                <td style={{
                        alignItems: 'center'}} >
                            <span>Difficulty </span>
                            <ClickAwayListener onClickAway={handleDifficultyClose}>
                                <StyledTooltip
                                    title={difficultyDescription}
                                    placement="right"
                                    arrow
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    onOpen={handleDifficultyOpen}
                                    onClose={handleDifficultyClose}
                                    open={difficultyOpen}
                                >
                                    <span>
                                        <button type="button" className="info-tooltip" onClick={handleDifficultyOpen}>
                                            <HelpOutlineIcon className="info-icon" style= {{fontSize: 15}} />
                                        </button>
                                    </span>

                                </StyledTooltip>
                            </ClickAwayListener>

                        :
                    {props.data.error.course.difficulty ? (
                        <td>
                            <small className="text-danger">{props.data.error.course.difficulty}</small>
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
                <td style={{
                        alignItems: 'center'}} >
                            <span>Workload </span>
                            <ClickAwayListener onClickAway={handleWorkloadClose}>
                                <StyledTooltip
                                    title={workloadDescription}
                                    placement="right"
                                    arrow
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    onOpen={handleWorkloadOpen}
                                    onClose={handleWorkloadClose}
                                    open={workloadOpen}
                                >
                                    <span>
                                        <button type="button" className="info-tooltip" onClick={handleWorkloadOpen}>
                                            <HelpOutlineIcon className="info-icon" style= {{fontSize: 15}} />
                                        </button>
                                    </span>

                                </StyledTooltip>
                            </ClickAwayListener>

                        :
                    {props.data.error.course.workload ? (
                        <td>
                            <small className="text-danger">{props.data.error.course.workload}</small>
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
                <td style={{
                        alignItems: 'center'}} >
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
                                            <HelpOutlineIcon className="info-icon" style= {{fontSize: 15}} />
                                        </button>
                                    </span>

                                </StyledTooltip>
                            </ClickAwayListener>

                        :
                    </td>
                </tr>
                <tr>
                    <th colSpan="2">

                        <textarea
                            className="form-control" rows="5"
                            value={props.data.courseRating.comments}
                            placeholder={commentsPlaceholder}
                            name="comments"
                            onChange={props.handleCourseRatingChange}></textarea>
                    </th>
                </tr>
            </tbody>
        </table>
    )
}

export default ReviewCourse