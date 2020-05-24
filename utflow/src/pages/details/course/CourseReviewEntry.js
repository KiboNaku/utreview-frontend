import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import './CourseDetails.css'

function CourseReviewEntry(props) {
    let thumbsIcon = props.liked ? 
    <ThumbUpRoundedIcon style={{fill: 'blue'}}/> : <ThumbDownRoundedIcon style={{fill: 'red'}}/>
    return (
        <div className="list-group-item">
            <div className="d-flex">
                <div className="userDes"> 
                    <Avatar src={props.profPic}>  </Avatar>
                    <span> {props.userMajor} student, taught by </span>
                    <a href = "https://www.google.com" > {props.profName} </a>
                </div>
                <div>
                    <span>{props.review}</span>
                </div>
                <div>
                    {thumbsIcon}
                    <p> Difficulty: {props.difficulty} </p>
                    <p> Workload {props.workload} </p>
                    <p> Usefulness: {props.usefulness} </p>
                </div>
            </div>
        </div>
    );
}

export default CourseReviewEntry;