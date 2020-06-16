import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

function CourseRatings(props) {

    const useStyles = makeStyles((theme) => ({
        aligned: {

        },
    }));
    const classes = useStyles()

    const StyledRating = withStyles({
        iconFilled: {
            color: '#bf5700',
        },
    })(Rating);

    const percentLikedValue = props.percentLiked === null ? 0 : props.percentLiked
    const percentLiked = props.percentLiked === null ? "N/A" : props.percentLiked

    const difficultyValue = props.difficulty === null ? 0 : props.difficulty
    const difficulty = props.difficulty === null ? "N/A" : props.difficulty

    const workloadValue = props.workload === null ? 0 : props.workload
    const workload = props.workload === null ? "N/A" : props.workload

    const usefulnessValue = props.usefulness === null ? 0 : props.usefulness
    const usefulness = props.usefulness === null ? "N/A" : props.usefulness

    const eCISValue = props.eCIS === null ? 0 : props.eCIS
    const eCIS = props.eCIS === null ? "N/A" : props.eCIS
    return (
        <div className="CourseRatings">
            <div className="card card-body">
            <h3 className="rating-heading"> User Ratings </h3>
            <div className="rating">
                <p className="p-rating"> Liked: {`${percentLiked}%`} </p>
                <div className="progress">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${percentLikedValue}%`, backgroundColor: '#bf5700' }}
                        aria-valuenow={percentLikedValue}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        
                    </div>
                </div>
            </div>
            <div className="userRatings">
                <div className="rating">
                    <p className="p-rating"> eCIS: {eCIS} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={eCISValue}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon fontSize="large" />}
                        readOnly
                    />
                </div>
                <div className="rating">
                    <p className="p-rating"> Usefulness: {usefulness} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={usefulnessValue}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon fontSize="large" />}
                        readOnly
                    />
                </div>
            </div>

            <div className="userRatings">
                <div className="rating">
                    <p className="p-rating"> Workload: {workload} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={workloadValue}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon fontSize="large" />}
                        readOnly
                    />
                </div>
                <div className="rating">
                    <p className="p-rating"> Difficulty: {difficulty} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={difficultyValue}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon fontSize="large" />}
                        readOnly
                    />
                </div>
            </div>
            </div>

            

        </div>
    );
}

export default CourseRatings;