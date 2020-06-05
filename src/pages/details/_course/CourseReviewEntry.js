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
import Login from './../../popups/Login'
import Signup from './../../popups/Signup'
import './../CourseDetails.css'

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
        <ThumbUpRoundedIcon style={{ fill: 'blue' }} /> : <ThumbDownRoundedIcon style={{ fill: 'red' }} />

    let likeIcon = props.review.likePressed ?
        <ThumbUpRoundedIcon style={{ fill: 'blue' }} /> : <ThumbUpRoundedIcon style={{ fill: 'gray' }} />
    let dislikeIcon = props.review.dislikePressed ?
        <ThumbDownRoundedIcon style={{ fill: 'red' }} /> : <ThumbDownRoundedIcon style={{ fill: 'gray' }} />
    const useStyles = makeStyles((theme) => ({
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    }));
    const classes = useStyles()
    const StyledRating = withStyles({
        iconFilled: {
            color: '#0080ff',
        },
    })(Rating);

    const loginLink = (
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
    return (
        <div className="list-group-item">
            <div className="d-flex">
                <div className="userDes">
                    <Avatar className={classes.large} src={props.review.profPic}>  </Avatar>
                    <span> {props.review.userMajor} student, taught by </span>
                    <a href="https://www.google.com" > {props.review.profName} </a>
                    <div className="reviewDate">
                        <span> {props.review.date} </span>
                    </div>
                </div>
                <div className="userRev">
                    <span>{props.review.review}</span>
                    <div className="LikeDislike">
                        {localStorage.usertoken ? likeButton: loginLink}
                        <span> {props.review.numLiked} </span>
                        {localStorage.usertoken ? dislikeButton: loginLink}
                        <span> {props.review.numDisliked} </span>
                    </div>
                </div>
                <div className="userRat">
                    {thumbsIcon}
                    <div>
                        <p className="p-review"> Difficulty: </p>
                        <StyledRating
                            defaultValue={props.review.difficulty}
                            icon={<RadioButtonCheckedIcon />}
                            emptyIcon={<RadioButtonUncheckedIcon />}
                            readOnly
                        />
                    </div>
                    <div>
                        <p className="p-review"> Workload: </p>
                        <StyledRating
                            defaultValue={props.review.workload}
                            icon={<RadioButtonCheckedIcon />}
                            emptyIcon={<RadioButtonUncheckedIcon />}
                            readOnly
                        />
                    </div>
                    <div>
                        <p className="p-review"> Usefulness: </p>
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