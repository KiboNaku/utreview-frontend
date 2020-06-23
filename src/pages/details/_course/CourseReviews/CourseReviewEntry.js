import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Rating from '@material-ui/lab/Rating';
import Login from '../../../popups/Login'
import Signup from '../../../popups/Signup'

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

function CourseReviewEntry(props) {
    let thumbsIcon = props.review.liked ?
        <ThumbUpRoundedIcon style={{ fill: '#a6cd57' }} /> : <ThumbDownRoundedIcon style={{ fill: '#ed7f7b' }} />

    let likeIcon = props.review.likePressed ?
        <ThumbUpRoundedIcon style={{ fill: '#a6cd57' }} /> : <ThumbUpRoundedIcon style={{ fill: 'gray' }} />
    let dislikeIcon = props.review.dislikePressed ?
        <ThumbDownRoundedIcon style={{ fill: '#ed7f7b' }} /> : <ThumbDownRoundedIcon style={{ fill: 'gray' }} />
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

    const likeLoginLink = (
        <span>
            <button
                className="likeButton"
                data-toggle="modal" data-target="#login-modal"
                type="button"
            >
                {likeIcon}
            </button>
            <Login />
            <Signup />
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
            <Login />
            <Signup />
        </span>
    )

    const likeButton = (
        <button
            className="likeButton"
            onClick={() => props.handleLike(props.review.key)}
        >
            {likeIcon}
        </button>
    )

    const dislikeButton = (
        <button
            className="dislikeButton"
            onClick={() => props.handleDislike(props.review.key)}
        >
            {dislikeIcon}
        </button>
    )

    const semester = "Fall 2020"
    return (
        <div className="list-group-item review-list-item">
            <div className="course-review-entry">
                <div className="userDes">
                    <Avatar className={classes.large} src={props.review.profPic}>  </Avatar>
                    <div className="userText">
                        <span> {props.review.userMajor} student, taught by </span>
                        <a href="https://www.google.com">{props.review.profName}</a>
                        <span>, {semester}</span>
                    </div>
                </div>
                <div className="userRev">
                    <p className="review-text">{props.review.review}</p>
                    <small className="review-date"> - {props.review.date.toLocaleDateString()}</small>
                    <div className="LikeDislike">
                        {localStorage.usertoken ? likeButton : likeLoginLink}
                        <span> {props.review.numLiked} </span>
                        {localStorage.usertoken ? dislikeButton : dislikeLoginLink}
                        <span> {props.review.numDisliked} </span>
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

export default CourseReviewEntry;