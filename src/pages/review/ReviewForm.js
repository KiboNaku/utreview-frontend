import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getCourseNum, getProfessorNames } from './_utils/ReviewFormFunctions'
import { checkDuplicate, newReview, editReview } from './_utils/ReviewFunctions'
import jwt_decode from 'jwt-decode'
import ReviewFormComponent from './_components/ReviewFormComponent'
import Loading from './../_utils/Loading.js'

class ReviewForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			courseNumList: null,
			professorNameList: null,
			courseLoaded: false,
			profLoaded: false,

			CourseNumber: "",
			CourseApproval: null,
			Usefulness: "",
			Difficulty: "",
			Workload: "",
			CourseComment: "",

			ProfessorName: "",
			ProfessorApproval: null,
			Clear: "",
			Engaging: "",
			Helpful: "",
			GradingDifficulty: "",
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

			Duplicate: false,
			Disable: true,
			OldReview: null
		}

		this.validate = this.validate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePositiveClick = this.handlePositiveClick.bind(this);
		this.handleNegativeClick = this.handleNegativeClick.bind(this);
		this.handleCourseNumberChange = this.handleCourseNumberChange.bind(this);
		this.handleProfessorNameChange = this.handleProfessorNameChange.bind(this);
		this.setData = this.setData.bind(this);
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
		if (this.state.Usefulness === "") { UsefulnessError = emptyErrorMessage; }
		if (this.state.Difficulty === "") { DifficultyError = emptyErrorMessage; }
		if (this.state.Workload === "") { WorkloadError = emptyErrorMessage; }
		if (this.state.ProfessorNameError === "") { ProfessorNameError = emptyErrorMessage; }
		if (this.state.ProfessorApproval === null) { ProfessorApprovalError = emptyErrorMessage; }
		if (this.state.Clear === "") { ClearError = emptyErrorMessage; }
		if (this.state.Engaging === "") { EngagingError = emptyErrorMessage; }
		if (this.state.Helpful === "") { HelpfulError = emptyErrorMessage; }
		if (this.state.GradingDifficulty === "") { GradingDifficultyError = emptyErrorMessage; }

		console.log(this.state.CourseNumberError)

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

			if (this.state.OldReview !== null) {
				console.log("old review")
				editReview(review).then(res => {
					if (res.error) {
						alert(res.error)
					} else {
						this.props.history.push("/")
					}
				})
			} else {
				console.log("new review")
				newReview(review).then(res => {
					if (res.error) {
						alert(res.error)
					} else {
						this.props.history.push("/")
					}
				})
			}
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
				this.state.Disable = false;

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
					} else {
						console.log(res)
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
				this.state.Disable = false;

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
					}else {
						console.log(res)
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
				this.setState({ courseNumList: courseList, courseLoaded: true })
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
				this.setState({ professorNameList: profList, profLoaded: true })
			}
		})

		let oldReview = this.props.location.state === undefined ? null : this.props.location.state.review
		this.setState({ OldReview: oldReview })
	}

	setData() {
		const { OldReview } = this.state

		this.setState({
			CourseNumber: OldReview.CourseNumber,
			CourseApproval: OldReview.CourseApproval,
			Usefulness: OldReview.Usefulness,
			Difficulty: OldReview.Difficulty,
			Workload: OldReview.Workload,
			CourseComment: OldReview.CourseComment,
			ProfessorName: OldReview.ProfessorName,
			ProfessorApproval: OldReview.ProfessorApproval,
			Clear: OldReview.Clear,
			Engaging: OldReview.Engaging,
			GradingDifficulty: OldReview.GradingDifficulty,
			ProfessorComment: OldReview.ProfessorComment,

			Disable: false
		})

		console.log(this.state.CourseNumber)
	}

	render() {
		if (this.state.OldReview !== null && this.state.CourseNumber === "") {
			this.setData()
		}

		let loaded = this.state.courseLoaded && this.state.profLoaded
		let loading = <Loading />
		let content = <ReviewFormComponent
			validate={this.validate}
			handleSubmit={this.handleSubmit}
			handleChange={this.handleChange}
			handlePositiveClick={this.handlePositiveClick}
			handleNegativeClick={this.handleNegativeClick}
			handleCourseNumberChange={this.handleCourseNumberChange}
			handleProfessorNameChange={this.handleProfessorNameChange}
			data={this.state} />

		return (
			<div>
				{loaded ? content : loading}
			</div>

		)
	}
}

export default withRouter(ReviewForm);