import React from 'react';
import PropTypes from 'prop-types'
import ProfLink from './../../../_utils/ProfLink'
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

const propTypes = {
    review: PropTypes.shape({
        // review id
        id: PropTypes.number.isRequired,

        // review's course comments
        comments: PropTypes.string,

        // review's course approval rating
        approval: PropTypes.bool.isRequired,

        // review's course difficulty rating
        difficulty: PropTypes.number.isRequired,

        // review's course usefulness rating
        usefulness: PropTypes.number.isRequired,

        // review's course workload rating
        workload: PropTypes.number.isRequired,

        // review author's major
		userMajor: PropTypes.string,
		
		// review author's profile pic file name
		profilePic: PropTypes.string.isRequired,
		
		// review's prof id
		profId: PropTypes.number.isRequired,
		
		// review's prof first name
		profFirst: PropTypes.string.isRequired,
		
		// review's prof last name
		profLast: PropTypes.string.isRequired,

		// grade the author achieved in the course
		grade: PropTypes.string,
		
		// how many likes the review's course comment received
		numLiked: PropTypes.number.isRequired,
		
		// how many dislikes the review's course comment received
        numDisliked: PropTypes.number.isRequired,

        // indicates whether the review was written by the current logged in user
        writtenByUser: PropTypes.bool.isRequired,

        // indicates whether the review was liked by the current logged in user
		likePressed: PropTypes.bool.isRequired,
		
		// indicates whether the review was disliked by the current logged in user
		dislikePressed: PropTypes.bool.isRequired,
		
		// time ago format of when the review was last updated
		dateString: PropTypes.string.isRequired,
		
		// Date object representing when the review was last updated
		date: PropTypes.instanceOf(Date),
		
		// year the review's author took the course
		year: PropTypes.number.isRequired,

		// semester season the review's author took the course
		semester: PropTypes.number.isRequired,

		// review's author first name
		firstName: PropTypes.string.isRequired,

		// review's author last name
		lastName: PropTypes.string.isRequired,

		// indicate whether the review's author wants to remain anonymous
		anonymous: PropTypes.bool.isRequired,
    }),

    // handles a user press of the like button
    handleLike: PropTypes.func.isRequired,

    // handles a user press of the dislike button
    handleDislike: PropTypes.func.isRequired,

    // handles a user press of the report button
    handleReport: PropTypes.func.isRequired
}

function CourseReviewEntry(props) {
    // generate icons for the like button, dislike button, report button, and review author approval
    let thumbsIcon = props.review.approval ?
        <ThumbUpRoundedIcon style={{ fill: '#a6cd57' }} /> : <ThumbDownRoundedIcon style={{ fill: '#ed7f7b' }} />
    let likeIcon = props.review.likePressed ?
        <ThumbUpRoundedIcon style={{ fill: '#a6cd57' }} /> : <ThumbUpRoundedIcon style={{ fill: 'gray' }} />
    let dislikeIcon = props.review.dislikePressed ?
        <ThumbDownRoundedIcon style={{ fill: '#ed7f7b' }} /> : <ThumbDownRoundedIcon style={{ fill: 'gray' }} />
    let reportIcon = <FlagRoundedIcon style={{ fill: 'gray' }} />

    // generate styles for profile pic avatar
    const useStyles = makeStyles((theme) => ({
        large: {
            width: theme.spacing(8),
            height: theme.spacing(8),
        },
    }));
    const classes = useStyles()

    // generate styled rating
    const StyledRating = withStyles({
        iconFilled: {
            color: '#bf5700',
        },
    })(Rating);

    // generate report comment button
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
    
    // generate login button for the like icon (in case the user isn't logged in)
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
    
    // generate login button for the dislike icon (in case the user isn't logged in)
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
    
    // generate the like comment button
    const likeButton = (
        <button
            className="likeButton"
            onClick={() => props.handleLike(props.review.id)}
        >
            {likeIcon}
        </button>
    )

    // generate the dislike comment button
    const dislikeButton = (
        <button
            className="dislikeButton"
            onClick={() => props.handleDislike(props.review.id)}
        >
            {dislikeIcon}
        </button>
    )
    
    // determine the author name to be shown depending on whether author is anonymous
    let author = props.review.writtenByUser ? "You," : 
                !props.review.anonymous ? props.review.firstName + " " + props.review.lastName :
                props.review.userMajor !== null ? props.review.userMajor + " student," : 
                "Student"

    return (
        <div className="list-group-item review-list-item">
            <div className="course-review-entry">
                <div className="userDes">
                    <Avatar className={classes.large} alt={props.review.profilePic} src={require('./../../../../res/img/profile-pictures/' + props.review.profilePic)}>  </Avatar>
                    <div className="userText">
                        <span> {author} taught by </span>
                        <ProfLink
                            profId={props.review.profId}
                            firstName={props.review.profFirst}
                            lastName={props.review.profLast}
                        />
                        <span>, {props.review.semester} {props.review.year}</span>
                    </div>
                </div>
                <div className="userRev">
                    <p className="review-text">{props.review.comments}</p>
                    <small className="review-date"> - {props.review.dateString}</small>
                    <br />
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
                            <span className="p-review"> Difficulty: </span>
                        </div>
                        <StyledRating
                            defaultValue={props.review.difficulty}
                            icon={<RadioButtonCheckedIcon />}
                            emptyIcon={<RadioButtonUncheckedIcon />}
                            readOnly
                        />
                    </div>
                    <div className="rowRating">
                        <div className="col">
                            <span className="p-review"> Workload: </span>
                        </div>

                        <StyledRating
                            defaultValue={props.review.workload}
                            icon={<RadioButtonCheckedIcon />}
                            emptyIcon={<RadioButtonUncheckedIcon />}
                            readOnly
                        />
                    </div>
                    <div className="rowRating">
                        <div className="col">
                            <span className="p-review"> Usefulness: </span>
                        </div>
                        <StyledRating
                            defaultValue={props.review.usefulness}
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

CourseReviewEntry.propTypes = propTypes

export default CourseReviewEntry;