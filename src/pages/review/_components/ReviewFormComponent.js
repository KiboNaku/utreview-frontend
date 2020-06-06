import React from 'react'
import Select from 'react-select'
import { StyledRating } from './Rating'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { BinaryFeedback } from 'react-simple-user-feedback'
import './../ReviewForm.css'

function ReviewFormComponent(props) {
    return (
        <div>
            <div className="container-fluid">
                <form onSubmit={props.handleSubmit}>
                    <table className="table table-borderless ReviewForm" id='ReviewForm'>
                        <thead>
                            <tr>
                                <th scope="col" colSpan="2"> Course Review </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> Course Number:
                                    {console.log(props.data.CourseNumberError)}
										{props.data.CourseNumberError ? (
                                        <td>
                                            <small className="text-danger">{props.data.CourseNumberError}</small>
                                        </td>
                                    ) : null}
                                </td>
                                <td>
                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        name="courseNumber"
                                        options={props.data.courseNumList}
                                        onChange={props.handleCourseNumberChange}
                                        placeholder="Select course..."
                                        isClearable={true}
                                        isSearchable={true}
                                    />
                                </td>
                            </tr>
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
                                        cols="50"
                                        type="textArea"
                                        value={props.data.CourseComment}
                                        placeholder="Comments (Optional)"
                                        name="CourseComment"
                                        onChange={props.handleChange}
                                    />
                                </th>
                            </tr>
                        </tbody>
                        <thead>
                            <tr className="border border-dark border-bottom-0">
                                <th scope="col" colSpan="2"> Professor Review </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> Professor Name:
										{props.data.ProfessorNameError ? (
                                        <td>
                                            <small className="text-danger">{props.data.ProfessorNameError}</small>
                                        </td>
                                    ) : null}
                                </td>
                                <td>
                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        name="ProfessorName"
                                        options={props.data.professorNameList}
                                        onChange={props.handleProfessorNameChange}
                                        placeholder="Select professor..."
                                        isClearable={true}
                                        isSearchable={true}
                                    />
                                </td>
                            </tr>
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
                                <td> <StyledRating
                                    type="rating"
                                    value={props.data.GradingDifficulty}
                                    icon={<RadioButtonCheckedIcon />}
                                    emptyIcon={<RadioButtonUncheckedIcon />}
                                    name="GradingDifficulty"
                                    onChange={props.handleChange}
                                /></td>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                    <textarea
                                        cols="50"
                                        type="textArea"
                                        value={props.data.ProfessorComment}
                                        placeholder="Comments (Optional)"
                                        name="ProfessorComment"
                                        onChange={props.handleChange}
                                    />
                                </th>
                            </tr>
                        </tbody>
                    </table>


                    <br />
                    <br />
                    <div className="text-center">
                        <input type="submit" className="btn btn-outline-primary" value="Submit" onSubmit={props.handleSubmit} />
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ReviewFormComponent