import React from 'react';
import CourseLink from './../../../_utils/CourseLink'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FlagRoundedIcon from '@material-ui/icons/FlagRounded';
import Rating from '@material-ui/lab/Rating';

/* 
    Properties:
    liked
    review
    profPic (img URL)
    profName
    difficulty
    workload
    usefulness
    numLiked
    numDisliked
*/

function ProfReviewEntry(props) {
    let thumbsIcon = props.review.approval ?
        <ThumbUpRoundedIcon style={{ fill: '#a6cd57' }} /> : <ThumbDownRoundedIcon style={{ fill: '#ed7f7b' }} />
    let likeIcon = props.review.likePressed ?
        <ThumbUpRoundedIcon style={{ fill: '#a6cd57' }} /> : <ThumbUpRoundedIcon style={{ fill: 'gray' }} />
    let dislikeIcon = props.review.dislikePressed ?
        <ThumbDownRoundedIcon style={{ fill: '#ed7f7b' }} /> : <ThumbDownRoundedIcon style={{ fill: 'gray' }} />
    let reportIcon = <FlagRoundedIcon style={{ fill: 'gray' }} />

    const useStyles = makeStyles((theme) => ({
        large: {
            width: theme.spacing(8),
            height: theme.spacing(8),
        },
    }));
    const classes = useStyles()
    const StyledRating = withStyles({
        iconFilled: {
            color: '#bf5700',
        },
    })(Rating);

    const reportButton = (
        <span>
            <button
                className="reportButton"
                onClick={() => props.handleReport(props.review.id)}
            >
                {reportIcon}
            </button>
        </span>
    )

    const likeLoginLink = (
        <span>
            <button
                className="likeButton"
                data-toggle="modal" data-target="#login-modal"
                type="button"
            >
                {likeIcon}
            </button>
        </span>
    )

    const dislikeLoginLink = (
        <span>
            <button
                className="likeButton"
                data-toggle="modal" data-target="#login-modal"
                type="button"
            >
                {dislikeIcon}
            </button>
        </span>
    )

    const likeButton = (
        <button
            className="likeButton"
            onClick={() => props.handleLike(props.review.id)}
        >
            {likeIcon}
        </button>
    )

    const dislikeButton = (
        <button
            className="dislikeButton"
            onClick={() => props.handleDislike(props.review.id)}
        >
            {dislikeIcon}
        </button>
    )

    let author = props.review.writtenByUser ? "You," : 
                !props.review.anonymous ? props.review.firstName + " " + props.review.lastName :
                props.review.userMajor !== null ? props.review.userMajor + " student," : 
                "Student"

    return (
        <div className="list-group-item review-list-item">
            <div className="prof-review-entry">
                <div className="userDes">
                    <Avatar className={classes.large} alt={props.review.profilePic} src={require('./../../../../res/img/profile-pictures/' + props.review.profilePic)}>  </Avatar>
                    <div className="userText">
                        <span> {author} enrolled in </span>
                        <CourseLink
                            courseId={props.review.courseId}
                            courseDept={props.review.courseDept}
                            courseNum={props.review.courseNum}
                            topicNum={props.review.courseTopic}
                            display="name"
                        />
                        <span>, {props.review.semester} {props.review.year}</span>
                    </div>
                </div>
                <div className="userRev">
                    <p className="review-text">{props.review.comments}</p>
                    <small className="review-date"> - {props.review.dateString}</small>
                    <div className="review-like-grade">
                        <div className="LikeDislike">
                            {localStorage.usertoken ? likeButton : likeLoginLink}
                            <span> {props.review.numLiked} </span>
                            {localStorage.usertoken ? dislikeButton : dislikeLoginLink}
                            <span> {props.review.numDisliked} </span>
                        </div>
                        <div className="review-grade">
                            <span> Grade: {props.review.grade !== null ? props.review.grade : "N/A"}</span>
                        </div>
                        <div className="review-report">
                            {reportButton}
                        </div>
                    </div>
                </div>
                <div className="userRat">
                    <div className="rowApproval">
                        <div className="col">
                            <span className="p-review"> Approval: </span>
                        </div>
                        <div>
                            {thumbsIcon}
                        </div>

                    </div>
                    <div className="rowRating">
                        <div className="col">
                            <span className="p-review"> Clear: </span>
                        </div>
                        <StyledRating
                            defaultValue={props.review.clear}
                            icon={<RadioButtonCheckedIcon />}
                            emptyIcon={<RadioButtonUncheckedIcon />}
                            readOnly
                        />
                    </div>
                    <div className="rowRating">
                        <div className="col">
                            <span className="p-review"> Engaging: </span>
                        </div>

                        <StyledRating
                            defaultValue={props.review.engaging}
                            icon={<RadioButtonCheckedIcon />}
                            emptyIcon={<RadioButtonUncheckedIcon />}
                            readOnly
                        />
                    </div>
                    <div className="rowRating">
                        <div className="col">
                            <span className="p-review"> Grading Rigor: </span>
                        </div>
                        <StyledRating
                            defaultValue={props.review.grading}
                            icon={<RadioButtonCheckedIcon />}
                            emptyIcon={<RadioButtonUncheckedIcon />}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfReviewEntry;