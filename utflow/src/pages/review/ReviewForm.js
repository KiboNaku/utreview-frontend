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
			CourseApproval: false,
			Usefulness: 0,
			Difficulty: 0,
			Workload: 0,
			CourseComment: "",
			ProfessorApproval: false,
			Clear: 0,
			Engaging: 0,
			Helpful: 0,
			GradingDifficulty: 0,
			ProfessorComment: ""
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePositiveClick = this.handlePositiveClick.bind(this);
		this.handleNegativeClick = this.handleNegativeClick.bind(this);
	}

	//TODO 
	handleSubmit() {
		this.props.history.push("/course-results")
	}

	handleChange() {

	}

	handlePositiveClick() {
		this.setState(
			{CourseApproval: true}
		)
	}

	handleNegativeClick(event) {
		const {name} = event.target
		console.log(name);
		this.setState({[name]: false})
		alert(this.state.CourseApproval)
	}

	render() {
		const StyledRating = withStyles({
			iconFilled: {
				color: '#0080ff',
			},
		})(Rating);

		return (
			<div>
				<div className="container-sm">
					<form onSubmit={this.handleSubmit}>
						<table className="table col-4" id='CourseReview'>
							<thead>
								<tr>
									<th scope="col" > Course Review </th>
									<th scope="col" ></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td> Approval: </td>
									<td> <BinaryFeedback
										type="binaryFeedback"
										name="CourseApproval"
										onPositiveClick={this.handlePositiveClick}
										onNegativeClick={this.handleNegativeClick}
									/></td>
								</tr>
								<tr>
									<td> Usefulness: </td>
									<td> <StyledRating
										type="rating"
										icon={<RadioButtonCheckedIcon />}
										emptyIcon={<RadioButtonUncheckedIcon />}
										name="Usefulness"
										onChange={this.handleChange}
									/></td>
								</tr>
								<tr>
									<td> Difficulty: </td>
									<td> <StyledRating
										type="rating"
										icon={<RadioButtonCheckedIcon />}
										emptyIcon={<RadioButtonUncheckedIcon />}
										name="Difficulty"
										onChange={this.handleChange}
									/></td>
								</tr>
								<tr>
									<td> Workload: </td>
									<td> <StyledRating
										type="rating"
										icon={<RadioButtonCheckedIcon />}
										emptyIcon={<RadioButtonUncheckedIcon />}
										name="Workload"
										onChange={this.handleChange}
									/></td>
								</tr>
							</tbody>
						</table>
						<textarea
							type="textArea"
							placeholder="Comments"
							name="CourseComment"
							onChange={this.handleChange}
						/>

						<table className="table col-4" id='ProfessorReview'>
							<thead>
								<tr>
									<th scope="col"> Professor Review </th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td> Approval: </td>
									<td> <BinaryFeedback
										type="binaryFeedback"
										name="ProfessorApproval"
										onPositiveClick={this.handlePositiveClick}
										onNegativeClick={this.handleNegativeClick}
									/></td>
								</tr>
								<tr>
									<td> Clear: </td>
									<td> <StyledRating
										type="rating"
										icon={<RadioButtonCheckedIcon />}
										emptyIcon={<RadioButtonUncheckedIcon />}
										name="Clear"
										onChange={this.handleChange}
									/></td>
								</tr>
								<tr>
									<td> Engaging: </td>
									<td> <StyledRating
										type="rating"
										icon={<RadioButtonCheckedIcon />}
										emptyIcon={<RadioButtonUncheckedIcon />}
										name="Engaging"
										onChange={this.handleChange}
									/></td>
								</tr>
								<tr>
									<td> Helpful: </td>
									<td> <StyledRating
										type="rating"
										icon={<RadioButtonCheckedIcon />}
										emptyIcon={<RadioButtonUncheckedIcon />}
										name="Helpful"
										onChange={this.handleChange}
									/></td>
								</tr>
								<tr>
									<td> Grading Difficulty: </td>
									<td> <StyledRating
										type="rating"
										icon={<RadioButtonCheckedIcon />}
										emptyIcon={<RadioButtonUncheckedIcon />}
										name="GradingDifficulty"
										onChange={this.handleChange}
									/></td>
								</tr>
							</tbody>
						</table>
						<textarea
							type="textArea"
							placeholder="Comments"
							name="CourseComment"
							onChange={this.handleChange}
						/>

						<br />
						<br />
						<input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
					</form>
				</div>
			</div>
		)
	}
}

export default withRouter(ReviewForm);