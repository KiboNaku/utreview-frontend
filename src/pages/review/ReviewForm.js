import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getCourseNum, getProfessorNames } from './_utils/ReviewFormFunctions'
import { checkDuplicate, newReview, editReview } from './_utils/ReviewFunctions'
import jwt_decode from 'jwt-decode'
import ReviewFormComponent from './_components/ReviewFormComponent'

class ReviewForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			courseNumList: null,
			professorNameList: null,

			CourseNumber: "",
			CourseApproval: null,
			Usefulness: 0,
			Difficulty: 0,
			Workload: 0,
			CourseComment: "",
			ProfessorName: "",
			ProfessorApproval: null,
			Clear: 0,
			Engaging: 0,
			Helpful: 0,
			GradingDifficulty: 0,
			ProfessorComment: "",

			CourseNumberError: "",
			CourseApprovalError: "",
			UsefulnessError: "",
			DifficultyError: "",
			WorkloadError: "",
			ProfessorNameError: "",
			ProfessorApprovalError: "",
			ClearError: "",
			EngagingError: "",
			HelpfulError: "",
			GradingDifficultyError: "",

			Duplicate: false
		}

		this.validate = this.validate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePositiveClick = this.handlePositiveClick.bind(this);
		this.handleNegativeClick = this.handleNegativeClick.bind(this);
		this.handleCourseNumberChange = this.handleCourseNumberChange.bind(this);
		this.handleProfessorNameChange = this.handleProfessorNameChange.bind(this);
	}

	validate() {
		let CourseNumberError = "";
		let CourseApprovalError = "";
		let UsefulnessError = "";
		let DifficultyError = "";
		let WorkloadError = "";
		let ProfessorNameError = "";
		let ProfessorApprovalError = "";
		let ClearError = "";
		let EngagingError = "";
		let HelpfulError = "";
		let GradingDifficultyError = "";

		let emptyErrorMessage = 'This field cannot be empty.';

		if (this.state.CourseNumberError === "") { CourseNumberError = emptyErrorMessage; }
		if (this.state.CourseApproval === null) { CourseApprovalError = emptyErrorMessage; }
		if (this.state.Usefulness === 0) { UsefulnessError = emptyErrorMessage; }
		if (this.state.Difficulty === 0) { DifficultyError = emptyErrorMessage; }
		if (this.state.Workload === 0) { WorkloadError = emptyErrorMessage; }
		if (this.state.ProfessorNameError === "") { ProfessorNameError = emptyErrorMessage; }
		if (this.state.ProfessorApproval === null) { ProfessorApprovalError = emptyErrorMessage; }
		if (this.state.Clear === 0) { ClearError = emptyErrorMessage; }
		if (this.state.Engaging === 0) { EngagingError = emptyErrorMessage; }
		if (this.state.Helpful === 0) { HelpfulError = emptyErrorMessage; }
		if (this.state.GradingDifficulty === 0) { GradingDifficultyError = emptyErrorMessage; }

		console.log(CourseApprovalError)

		if (CourseNumberError ||
			CourseApprovalError ||
			UsefulnessError ||
			DifficultyError ||
			WorkloadError ||
			ProfessorNameError ||
			ProfessorApprovalError ||
			ClearError ||
			EngagingError ||
			HelpfulError ||
			GradingDifficultyError) {
			this.setState({
				CourseNumberError: CourseNumberError,
				CourseApprovalError: CourseApprovalError,
				UsefulnessError: UsefulnessError,
				DifficultyError: DifficultyError,
				WorkloadError: WorkloadError,
				ProfessorNameError: ProfessorNameError,
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
			const token = localStorage.usertoken
			const decoded = jwt_decode(token)

			const review = {
				user_email: decoded.identity.email,
				course_name: this.state.CourseNumber,
				prof_name: this.state.ProfessorName,
				course_review: this.state.CourseComment,
				course_approval: this.state.CourseApproval,
				course_usefulness: this.state.Usefulness,
				course_difficulty: this.state.Difficulty,
				course_workload: this.state.Workload,
				prof_review: this.state.ProfessorComment,
				prof_approval: this.state.ProfessorApproval,
				prof_clear: this.state.Clear,
				prof_engaging: this.state.Engaging,
				prof_grading: this.state.GradingDifficulty
			}

			newReview(review).then(res => {
				if (res.error) {
					alert(res.error)
				} else {
					this.props.history.push("/")
				}
			})
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

	handleCourseNumberChange = (inputValue, { action }) => {
		console.log(action)
		if (inputValue !== null) {
			this.setState({ CourseNumber: inputValue.value })
			if (this.state.ProfessorName !== "") {
				const token = localStorage.usertoken
				const decoded = jwt_decode(token)

				const review = {
					user_email: decoded.identity.email,
					course_name: inputValue.value,
					prof_name: this.state.ProfessorName
				}

				checkDuplicate(review).then(res => {
					if (res.error) {
						alert(res.error)
						this.setState({ duplicate: true })
					}
				})
			}
		}
	}

	handleProfessorNameChange = (inputValue, { action }) => {
		console.log(action)
		if (inputValue !== null) {
			this.setState({ ProfessorName: inputValue.value })
			if (this.state.CourseNumber !== "") {
				const token = localStorage.usertoken
				const decoded = jwt_decode(token)

				const review = {
					user_email: decoded.identity.email,
					course_name: this.state.CourseNumber,
					prof_name: inputValue.value
				}
				console.log(review.course_name)
				console.log(review.prof_name)

				checkDuplicate(review).then(res => {
					if (res.error) {
						alert(res.error)
						this.setState({ duplicate: true })
					}
				})
			}
		}
	}

	componentDidMount() {
		getCourseNum().then(res => {
			if (res.error) {
				alert(res.error)
			} else {
				let data = res.courses
				let courseList = new Array()
				for (const i in data) {
					courseList.push({
						value: data[i]['num'],
						label: data[i]['num']
					})
				}
				this.setState({ courseNumList: courseList })
			}
		})

		getProfessorNames().then(res => {
			if (res.error) {
				alert(res.error)
			} else {
				let data = res.professors
				let profList = new Array()
				for (const i in data) {
					profList.push({
						value: data[i]['name'],
						label: data[i]['name']
					})
				}
				this.setState({ professorNameList: profList })
			}
		})
	}

	render() {
		return (
			<ReviewFormComponent 
				validate={this.validate}
				handleSubmit={this.handleSubmit} 
				handleChange={this.handleChange}
				handlePositiveClick={this.handlePositiveClick}
				handleNegativeClick={this.handleNegativeClick}
				handleCourseNumberChange={this.handleCourseNumberChange} 
				handleProfessorNameChange={this.handleProfessorNameChange}
				data={this.state}/>
		)
	}
}

export default withRouter(ReviewForm);