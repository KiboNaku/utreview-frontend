import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

function ProfRatings(props) {

    const useStyles = makeStyles((theme) => ({
        aligned: {

        },
    }));

    const StyledRating = withStyles({
        iconFilled: {
            color: '#bf5700',
        },
    })(Rating);

    const percentLikedValue = props.percentLiked === null ? 0 : props.percentLiked
    const percentLiked = props.percentLiked === null ? "N/A" : props.percentLiked

    const clearValue = props.clear === null ? 0 : props.clear
    const clear = props.clear === null ? "N/A" : props.clear

    const engagingValue = props.engaging === null ? 0 : props.engaging
    const engaging = props.engaging === null ? "N/A" : props.engaging

    const gradingValue = props.grading === null ? 0 : props.grading
    const grading = props.grading === null ? "N/A" : props.grading

    const eCISValue = props.eCIS === null ? 0 : props.eCIS
    const eCIS = props.eCIS === null ? "N/A" : props.eCIS

    const numRatings = props.numRatings
    return (
        <div className="prof-ratings">
            <h3 className="rating-heading"> User Ratings ({numRatings})</h3>
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
                        icon={<RadioButtonCheckedIcon style={{color: "#fbfbfb"}} fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon style={{color: "#fbfbfb"}} fontSize="large" />}
                        readOnly
                    />
                </div>
                <div className="rating">
                    <p className="p-rating"> Clear: {clear} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={clearValue}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon style={{color: "#fbfbfb"}} fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon style={{color: "#fbfbfb"}} fontSize="large" />}
                        readOnly
                    />
                </div>
            </div>

            <div className="userRatings">
                <div className="rating">
                    <p className="p-rating"> Engaging: {engaging} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={engagingValue}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon style={{color: "#fbfbfb"}} fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon style={{color: "#fbfbfb"}} fontSize="large" />}
                        readOnly
                    />
                </div>
                <div className="rating">
                    <p className="p-rating"> Grading: {grading} </p>
                    <StyledRating
                        style={{ verticalAlign: "middle" }}
                        defaultValue={gradingValue}
                        precision={0.1}
                        icon={<RadioButtonCheckedIcon style={{color: "#fbfbfb"}} fontSize="large" />}
                        emptyIcon={<RadioButtonUncheckedIcon style={{color: "#fbfbfb"}} fontSize="large" />}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
}

export default ProfRatings;