import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import './CourseDetails.css'

function CourseRatings(props) {

    const useStyles = makeStyles((theme) => ({
        aligned: {

        },
    }));
    const classes = useStyles()

    const StyledRating = withStyles({
        iconFilled: {
            color: '#0080ff',
        },
    })(Rating);
    return (
        <div className="CourseRatings">
            <h1> User Ratings </h1>
            <div className="rating">
                <p className="p-rating"> Liked </p>
                <div className="progress">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${props.percentLiked}%` }}
                        aria-valuenow={props.percentLiked}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        {`${props.percentLiked}%`}
                    </div>
                </div>
            </div>
            <div className="d-flex">
                <div className="rating">
                    <p className="p-rating"> Difficulty: {props.difficulty} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={props.difficulty}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon fontSize="large" />}
                        readOnly
                    />
                </div>
                <div className="rating">
                    <p className="p-rating"> Usefulness: {props.usefulness} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={props.usefulness}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon fontSize="large" />}
                        readOnly
                    />
                </div>
            </div>

            <div className="d-flex">
                <div className="rating">
                    <p className="p-rating"> Workload: {props.workload} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={props.workload}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon fontSize="large" />}
                        readOnly
                    />
                </div>
                <div className="rating">
                    <p className="p-rating"> eCIS: {props.eCIS} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={props.eCIS}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon fontSize="large" />}
                        readOnly
                    />
                </div>
            </div>

        </div>
    );
}

export default CourseRatings;