import React, { Component } from 'react';
import NavBar from './../_components/NavBar';
import { BinaryFeedback } from 'react-simple-user-feedback';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import './ReviewForm.css'

class ReviewForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			CourseApproval: null,
			Usefulness: 0,
			Difficulty: 0,
			Workload: 0,
			CourseComment: "",
			ProfessorApproval: null,
			Clear: 0,
			Engaging: 0,
			Helpful: 0,
			GradingDifficulty: 0,
			ProfessorComment: "",

			CourseApprovalError: "",
			UsefulnessError: "",
			DifficultyError: "",
			WorkloadError: "",
			ProfessorApprovalError: "",
			ClearError: "",
			EngagingError: "",
			HelpfulError: "",
			GradingDifficultyError: ""
		}

		this.validate = this.validate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePositiveClick = this.handlePositiveClick.bind(this);
		this.handleNegativeClick = this.handleNegativeClick.bind(this);
	}

	validate() {
		let CourseApprovalError = "";
		let UsefulnessError = "";
		let DifficultyError = "";
		let WorkloadError = "";
		let ProfessorApprovalError = "";
		let ClearError = "";
		let EngagingError = "";
		let HelpfulError = "";
		let GradingDifficultyError = "";

		let emptyErrorMessage = 'This field cannot be empty.';

		if (this.state.CourseApproval === null) { CourseApprovalError = emptyErrorMessage; }
		if (this.state.Usefulness === 0) { UsefulnessError = emptyErrorMessage; }
		if (this.state.Difficulty === 0) { DifficultyError = emptyErrorMessage; }
		if (this.state.Workload === 0) { WorkloadError = emptyErrorMessage; }
		if (this.state.ProfessorApproval === null) { ProfessorApprovalError = emptyErrorMessage; }
		if (this.state.Clear === 0) { ClearError = emptyErrorMessage; }
		if (this.state.Engaging === 0) { EngagingError = emptyErrorMessage; }
		if (this.state.Helpful === 0) { HelpfulError = emptyErrorMessage; }
		if (this.state.GradingDifficulty === 0) { GradingDifficultyError = emptyErrorMessage; }

		console.log(CourseApprovalError)

		if (CourseApprovalError ||
			UsefulnessError ||
			DifficultyError ||
			WorkloadError ||
			ProfessorApprovalError ||
			ClearError ||
			EngagingError ||
			HelpfulError ||
			GradingDifficultyError) {
			this.setState({
				CourseApprovalError: CourseApprovalError,
				UsefulnessError: UsefulnessError,
				DifficultyError: DifficultyError,
				WorkloadError: WorkloadError,
				ProfessorApprovalError: ProfessorApprovalError,
				ClearError: ClearError,
				EngagingError: EngagingError,
				HelpfulError: HelpfulError,
				GradingDifficultyError: GradingDifficultyError
			})
			return false;
		} else {
			return true;
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		const isValid = this.validate();
		console.log(this.state.CourseApprovalError)
		if (isValid) {
			this.props.history.push("/course-results")
		}
	}

	handleChange(event) {
		const { name, value } = event.target
		this.setState({ [name]: value })
	}

	handlePositiveClick(name) {
		this.setState({ [name]: true })
	}

	handleNegativeClick(name) {
		this.setState({ [name]: false })
	}

	render() {
		const StyledRating = withStyles({
			iconFilled: {
				color: '#0080ff',
			},
		})(Rating);
		return (
			<div>
				<div className="container-fluid">
					<form onSubmit={this.handleSubmit}>
						<table className="table table-borderless ReviewForm" id='ReviewForm'>
							<thead>
								<tr>
									<th scope="col" colSpan="2"> Course Review </th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td> Approval:
										{this.state.CourseApprovalError ? (
											<td>
												<small className="text-danger">{this.state.CourseApprovalError}</small>
											</td>
										) : null}
									</td>
									<td><BinaryFeedback
										type="binaryFeedback"
										value={this.state.CourseApproval}
										name="CourseApproval"
										onPositiveClick={() => this.handlePositiveClick('CourseApproval')}
										onNegativeClick={() => this.handleNegativeClick('CourseApproval')}
									/></td>
								</tr>
								<tr>
									<td> Usefulness:
										{this.state.UsefulnessError ? (
											<td>
												<small className="text-danger">{this.state.UsefulnessError}</small>
											</td>
										) : null}
									</td>
									<td> <StyledRating
										type="rating"
										value={this.state.Usefulness}
										icon={<RadioButtonCheckedIcon />}
										emptyIcon={<RadioButtonUncheckedIcon />}
										name="Usefulness"
										onChange={this.handleChange}
										required
									/></td>
								</tr>
								<tr>
									<td> Difficulty:
										{this.state.DifficultyError ? (
											<td>
												<small className="text-danger">{this.state.DifficultyError}</small>
											</td>
										) : null}
									</td>
									<td> <StyledRating
										type="rating"
										value={this.state.Difficulty}
										icon={<RadioButtonCheckedIcon />}
										emptyIcon={<RadioButtonUncheckedIcon />}
										name="Difficulty"
										onChange={this.handleChange}
									/></td>
								</tr>
								<tr>
									<td> Workload:
										{this.state.WorkloadError ? (
											<td>
												<small class="text-danger">{this.state.WorkloadError}</small>
											</td>
										) : null}
									</td>
									<td> <StyledRating
										type="rating"
										value={this.state.Workload}
										icon={<RadioButtonCheckedIcon />}
										emptyIcon={<RadioButtonUncheckedIcon />}
										name="Workload"
										onChange={this.handleChange}
									/></td>
								</tr>
								<tr>
									<th colSpan="2">
										<textarea
											cols="50"
											type="textArea"
											value={this.state.CourseComment}
											placeholder="Comments (Optional)"
											name="CourseComment"
											onChange={this.handleChange}
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
									<td> Approval: 
										{this.state.ProfessorApprovalError ? (
											<td>
												<small className="text-danger">{this.state.ProfessorApprovalError}</small>
											</td>
										) : null}
									</td>
									<td> <BinaryFeedback
										type="binaryFeedback"
										value={this.state.ProfessorApproval}
										name="ProfessorApproval"
										onPositiveClick={() => this.handlePositiveClick('ProfessorApproval')}
										onNegativeClick={() => this.handleNegativeClick('ProfessorApproval')}
									/></td>
								</tr>
								<tr>
									<td> Clear: 
										{this.state.ClearError ? (
											<td>
												<small className="text-danger">{this.state.ClearError}</small>
											</td>
										) : null}
									</td>
									<td> <StyledRating
										type="rating"
										value={this.state.Clear}
										icon={<RadioButtonCheckedIcon />}
										emptyIcon={<RadioButtonUncheckedIcon />}
										name="Clear"
										onChange={this.handleChange}
									/></td>
								</tr>
								<tr>
									<td> Engaging: 
										{this.state.EngagingError ? (
											<td>
												<small className="text-danger">{this.state.EngagingError}</small>
											</td>
										) : null}
									</td>
									<td> <StyledRating
										type="rating"
										value={this.state.Engaging}
										icon={<RadioButtonCheckedIcon />}
										emptyIcon={<RadioButtonUncheckedIcon />}
										name="Engaging"
										onChange={this.handleChange}
									/></td>
								</tr>
								<tr>
									<td> Helpful: 
										{this.state.HelpfulError ? (
											<td>
												<small className="text-danger">{this.state.HelpfulError}</small>
											</td>
										) : null}
									</td>
									<td> <StyledRating
										type="rating"
										value={this.state.Helpful}
										icon={<RadioButtonCheckedIcon />}
										emptyIcon={<RadioButtonUncheckedIcon />}
										name="Helpful"
										onChange={this.handleChange}
									/></td>
								</tr>
								<tr>
									<td> Grading Difficulty: 
										{this.state.GradingDifficultyError ? (
											<td>
												<small className="text-danger">{this.state.GradingDifficultyError}</small>
											</td>
										) : null}
									</td>
									<td> <StyledRating
										type="rating"
										value={this.state.GradingDifficulty}
										icon={<RadioButtonCheckedIcon />}
										emptyIcon={<RadioButtonUncheckedIcon />}
										name="GradingDifficulty"
										onChange={this.handleChange}
									/></td>
								</tr>
								<tr>
									<th colSpan="2">
										<textarea
											cols="50"
											type="textArea"
											value={this.state.ProfessorComment}
											placeholder="Comments (Optional)"
											name="ProfessorComment"
											onChange={this.handleChange}
										/>
									</th>
								</tr>
							</tbody>
						</table>


						<br />
						<br />
						<div className="text-center">
							<input type="submit" className="btn btn-outline-primary" value="Submit" onSubmit={this.handleSubmit} />
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default withRouter(ReviewForm);