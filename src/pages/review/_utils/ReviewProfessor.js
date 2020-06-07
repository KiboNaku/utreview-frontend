import React from 'react'
import { StyledRating } from './Rating'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { BinaryFeedback } from 'react-simple-user-feedback'

function ReviewProfessor(props) {
    return (

        <table className="table table-borderless review-form">

            <tbody>
                <tr>
                    <td> Approval:
                        {props.data.ProfessorApprovalError ? (
                            <td>
                                <small className="text-danger">{props.data.ProfessorApprovalError}</small>
                            </td>
                        ) : null}
                    </td>
                    <td> <BinaryFeedback
                        type="binaryFeedback"
                        value={props.data.ProfessorApproval}
                        name="ProfessorApproval"
                        onPositiveClick={() => props.handlePositiveClick('ProfessorApproval')}
                        onNegativeClick={() => props.handleNegativeClick('ProfessorApproval')}
                    /></td>
                </tr>
                <tr>
                    <td> Clear:
                        {props.data.ClearError ? (
                            <td>
                                <small className="text-danger">{props.data.ClearError}</small>
                            </td>
                        ) : null}
                    </td>
                    <td> <StyledRating
                        type="rating"
                        value={props.data.Clear}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="Clear"
                        onChange={props.handleChange}
                    /></td>
                </tr>
                <tr>
                    <td> Engaging:
                        {props.data.EngagingError ? (
                            <td>
                                <small className="text-danger">{props.data.EngagingError}</small>
                            </td>
                        ) : null}
                    </td>
                    <td> <StyledRating
                        type="rating"
                        value={props.data.Engaging}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="Engaging"
                        onChange={props.handleChange}
                    /></td>
                </tr>
                <tr>
                    <td> Helpful:
                        {props.data.HelpfulError ? (
                            <td>
                                <small className="text-danger">{props.data.HelpfulError}</small>
                            </td>
                        ) : null}
                    </td>
                    <td> <StyledRating
                        type="rating"
                        value={props.data.Helpful}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="Helpful"
                        onChange={props.handleChange}
                    /></td>
                </tr>
                <tr>
                    <td> Grading Difficulty:
                        {props.data.GradingDifficultyError ? (
                            <td>
                                <small className="text-danger">{props.data.GradingDifficultyError}</small>
                            </td>
                        ) : null}
                    </td>
                    <td>
                        <StyledRating
                            type="rating"
                            value={props.data.GradingDifficulty}
                            icon={<RadioButtonCheckedIcon />}
                            emptyIcon={<RadioButtonUncheckedIcon />}
                            name="GradingDifficulty"
                            onChange={props.handleChange}
                        />
                    </td>
                </tr>
                <tr>
                    <th colSpan="2">

                        <textarea
                            className="form-control"
                            rows="5"
                            value={props.data.ProfessorComment}
                            placeholder="Please elaborate (optional)."
                            name="ProfessorComment"
                            onChange={props.handleChange}></textarea>
                    </th>
                </tr>
            </tbody>
        </table>
    )
}

export default ReviewProfessor