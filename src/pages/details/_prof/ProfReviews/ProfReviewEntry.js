import React from 'react';
import PropTypes from 'prop-types';
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

const propTypes = {

    review: PropTypes.shape({
        // id of the prof
        id: PropTypes.number.isRequired,

        // the review's prof comments
        comments: PropTypes.string,

        // true or false depending on whether if the author liked or disliked the prof
        approval: PropTypes.bool.isRequired,

        // average rating for the clearness for the prof
        clear: PropTypes.number.isRequired,

        // average rating for the engagingness of the prof
        engaging: PropTypes.number.isRequired,

        // average rating for the grading of the prof
        grading: PropTypes.number.isRequired,
        
        // the major of the author or "" if the author doesn't have a major
        userMajor: PropTypes.string,

        // the profile picture file name of the author
        profilePic: PropTypes.string.isRequired,

        // the id of the course
        courseId: PropTypes.string.isRequired,

        // the department that the course taught by the prof is in
        courseDept: PropTypes.string.isRequired,

        // the course number
        courseNum: PropTypes.string.isRequired,

        // the course topic number
        courseTopic: PropTypes.number,
        
        // the grade the author achieved in the course
        grade: PropTypes.string,

        // the number of likes the comment has
        numLiked: PropTypes.number.isRequired,

        // the number of dislikes the comment has
        numDisliked: PropTypes.number.isRequired,

        // true or false depending on whether if the the review was written by the logged-in user
        writtenByUser: PropTypes.bool.isRequired,

        // true or false depending on whether if the like was pressed by the logged-in user
        likePressed: PropTypes.bool.isRequired,

        // true or false depending on whether if the dislike was pressed by the logged-in user
        dislikePressed: PropTypes.bool.isRequired,

        // the "time-ago" format the review was last updated
        dateString: PropTypes.string.isRequired,

        // the date the review was last updated
        date: PropTypes.instanceOf(Date).isRequired,

        // the year the author had the prof
        year: PropTypes.number.isRequired,

        // the semester the author had the prof
        semester: PropTypes.string.isRequired,

        // first name of the author
        firstName: PropTypes.string.isRequired,

        // last name of the author
        lastName: PropTypes.string.isRequired,

        // true or false depending on whether the author decided to keep their review anonymous or not
        anonymous: PropTypes.bool.isRequired,
    }),

    // handles a user press of the like button
    handleLike: PropsTypes.func.isRequired,

    // handles a user press of the dislike button
    handleDislike: PropTypes.func.isRequired,

    // handles a user press of the report button
    handleReport: PropTypes.func.isRequired,
}

function ProfReviewEntry(props) {

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

    //generate report comment button
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

    // determine the author name to be shown depending on whether the author is anonymous
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