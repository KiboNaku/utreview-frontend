import React from 'react'
import Select from 'react-select'
import { StyledRating } from './../_utils/Rating'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { BinaryFeedback } from 'react-simple-user-feedback'
import './../ReviewForm.css'

function ReviewFormComponent(props) {
    return (
        <div style={{ width: "100%", backgroundColor: "#9cadb7" }}>
            <div className="container-fluid col-12 col-sm-10 col-md-8 col-lg-6 border rounded" style={{ backgroundColor: "white" }}>

                <form className="px-4 py-5" onSubmit={props.handleSubmit}>

                    <h4 className="pb-4">Let us know about your experience.</h4>

                    <ol className="px-5">

                        <li className="py-2">

                            <span >
                                Choose your course:
                            </span>

                            <Select
                                className="basic-single col-12 col-sm-10 col-md-8 mt-2"
                                classNamePrefix="select"
                                name="courseNumber"
                                options={props.data.courseNumList}
                                onChange={props.handleCourseNumberChange}
                                placeholder="Course"
                                isClearable={true}
                                isSearchable={true}
                            />
                        </li>

                        <li className="py-3">

                            <span>
                                Choose your professor:
                            </span>

                            <Select
                                className="basic-single col-12 col-sm-10 col-md-8 mt-2"
                                classNamePrefix="select"
                                name="ProfessorName"
                                options={props.data.professorNameList}
                                onChange={props.handleProfessorNameChange}
                                placeholder="Professor"
                                isClearable={true}
                                isSearchable={true}
                            />
                        </li>

                        <li className="py-3">
                            <span>
                                Give us your review for (insert course):
                            </span>
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
                                                placeholder="Feel free to elaborate with additional comments (optional)."
                                                name="CourseComment"
                                                onChange={props.handleChange}></textarea>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </li>

                        <li className="py-3">

                            <span>
                                Give us your review for (insert professor):
                            </span>
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
                                                placeholder="Feel free to elaborate with additional comments (optional)."
                                                name="ProfessorComment"
                                                onChange={props.handleChange}></textarea>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                    </ol>

                    <div className="text-center pt-4">
                        <input type="submit" className="btn btn-lg btn-outline-primary" value="Submit" onSubmit={props.handleSubmit} />
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ReviewFormComponent