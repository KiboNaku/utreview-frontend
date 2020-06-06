import React from 'react'
import { StyledRating } from './../_utils/Rating'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { BinaryFeedback } from 'react-simple-user-feedback'

function ReviewCourse(props) {
    return (

        <table className="table table-borderless review-form">
            <tbody>
                <tr>
                    <td> Approval:
                {props.data.CourseApprovalError ? (
                            <td>
                                <small className="text-danger">{props.data.CourseApprovalError}</small>
                            </td>
                        ) : null}
                    </td>
                    <td><BinaryFeedback
                        type="binaryFeedback"
                        value={props.data.CourseApproval}
                        name="CourseApproval"
                        onPositiveClick={() => props.handlePositiveClick('CourseApproval')}
                        onNegativeClick={() => props.handleNegativeClick('CourseApproval')}
                    /></td>
                </tr>
                <tr>
                    <td> Usefulness:
                {props.data.UsefulnessError ? (
                            <td>
                                <small className="text-danger">{props.data.UsefulnessError}</small>
                            </td>
                        ) : null}
                    </td>
                    <td> <StyledRating
                        type="rating"
                        value={props.data.Usefulness}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="Usefulness"
                        onChange={props.handleChange}
                    /></td>
                </tr>
                <tr>
                    <td> Difficulty:
                {props.data.DifficultyError ? (
                            <td>
                                <small className="text-danger">{props.data.DifficultyError}</small>
                            </td>
                        ) : null}
                    </td>
                    <td> <StyledRating
                        type="rating"
                        value={props.data.Difficulty}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="Difficulty"
                        onChange={props.handleChange}
                    /></td>
                </tr>
                <tr>
                    <td> Workload:
                {props.data.WorkloadError ? (
                            <td>
                                <small className="text-danger">{props.data.WorkloadError}</small>
                            </td>
                        ) : null}
                    </td>
                    <td> <StyledRating
                        type="rating"
                        value={props.data.Workload}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="Workload"
                        onChange={props.handleChange}
                    /></td>
                </tr>
                <tr>
                    <th colSpan="2">

                        <textarea
                            className="form-control" rows="5"
                            value={props.data.CourseComment}
                            placeholder="Please elaborate (optional)."
                            name="CourseComment"
                            onChange={props.handleChange}></textarea>
                    </th>
                </tr>
            </tbody>
        </table>
    )
}

export default ReviewCourse