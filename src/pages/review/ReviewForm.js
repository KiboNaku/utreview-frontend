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
			CourseNumList: [{
				value: 'EE 302',
				label: 'EE 302'
			}, {
				value: 'EE 306',
				label: 'EE 306'
			}],
			ProfessorNameList: [{
				value: 'Yu',
				label: 'Yu'
			}, {
				value: 'Bank',
				label: 'Bank'
			}],
			SemesterList: [{
				value: 'Spring 2020',
				label: 'Spring 2020'
			}],
			CourseLoaded: true,
			ProfLoaded: true,

			Semester: "",

			CourseNumber: "",
			CourseLikePressed: false,
			CourseDislikePressed: false,
			CourseApproval: null,
			Usefulness: "",
			Difficulty: "",
			Workload: "",
			CourseComment: "",

			ProfessorName: "",
			ProfessorLikePressed: false,
			ProfessorDislikePressed: false,
			ProfessorApproval: null,
			Clear: "",
			Engaging: "",
			Helpful: "",
			GradingDifficulty: "",
			ProfessorComment: "",

			CourseApprovalError: "",
			UsefulnessError: "",
			DifficultyError: "",
			WorkloadError: "",

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
		this.handleCourseNumberChange = this.handleCourseNumberChange.bind(this);
		this.handleProfessorNameChange = this.handleProfessorNameChange.bind(this);
		this.handleSemesterChange = this.handleSemesterChange.bind(this);
		this.handleLike = this.handleLike.bind(this);
		this.handleDislike = this.handleDislike.bind(this);
		this.setData = this.setData.bind(this);
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
		if (this.state.Usefulness === "") { UsefulnessError = emptyErrorMessage; }
		if (this.state.Difficulty === "") { DifficultyError = emptyErrorMessage; }
		if (this.state.Workload === "") { WorkloadError = emptyErrorMessage; }
		if (this.state.ProfessorApproval === null) { ProfessorApprovalError = emptyErrorMessage; }
		if (this.state.Clear === "") { ClearError = emptyErrorMessage; }
		if (this.state.Engaging === "") { EngagingError = emptyErrorMessage; }
		if (this.state.Helpful === "") { HelpfulError = emptyErrorMessage; }
		if (this.state.GradingDifficulty === "") { GradingDifficultyError = emptyErrorMessage; }

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
		if (isValid) {
			const token = localStorage.usertoken
			const decoded = jwt_decode(token)

			const review = {
				user_email: decoded.identity.email,
				course_name: this.state.CourseNumber,
				prof_name: this.state.ProfessorName,
				Semester: this.state.Semester,
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
				editReview(review).then(res => {
					if (res.error) {
						alert(res.error)
					} else {
						this.props.history.push("/")
					}
				})
			} else {
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

	handleCourseNumberChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			this.setState({ CourseNumber: inputValue.value })
			if (this.state.ProfessorName !== "" && this.state.Semester !== "") {
				this.state.Disable = false;

				const token = localStorage.usertoken
				const decoded = jwt_decode(token)

				const review = {
					user_email: decoded.identity.email,
					course_name: inputValue.value,
					prof_name: this.state.ProfessorName,
					semester: this.state.Semester
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

		if (inputValue !== null) {
			this.setState({ ProfessorName: inputValue.value })
			if (this.state.CourseNumber !== "" && this.state.Semester !== "") {
				this.state.Disable = false;

				const token = localStorage.usertoken
				const decoded = jwt_decode(token)

				const review = {
					user_email: decoded.identity.email,
					course_name: this.state.CourseNumber,
					prof_name: inputValue.value,
					semester: this.state.Semester
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

	handleSemesterChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			this.setState({ Semester: inputValue.value })
			if (this.state.CourseNumber !== "" && this.state.ProfessorName !== "") {
				this.state.Disable = false;

				const token = localStorage.usertoken
				const decoded = jwt_decode(token)

				const review = {
					user_email: decoded.identity.email,
					course_name: this.state.CourseNumber,
					prof_name: this.state.ProfessorName,
					semester: inputValue.value
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

	handleLike(type) {
		switch (type) {
			case 'course':
				this.setState({
					CourseLikePressed: true,
					CourseDislikePressed: false,
					CourseApproval: true
				})
				break
			case 'prof':
				this.setState({
					ProfessorLikePressed: true,
					ProfessorDislikePressed: false,
					ProfessorApproval: true
				})
		}
	}

	handleDislike(type) {
		switch (type) {
			case 'course':
				this.setState({
					CourseLikePressed: false,
					CourseDislikePressed: true,
					CourseApproval: false
				})
				break
			case 'prof':
				this.setState({
					ProfessorLikePressed: false,
					ProfessorDislikePressed: true,
					ProfessorApproval: false
				})
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
				this.setState({ CourseNumList: courseList, CourseLoaded: true })
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
				this.setState({ ProfessorNameList: profList, ProfLoaded: true })
			}
		})

		let oldReview = this.props.location.state === undefined ? null : this.props.location.state.review
		this.setState({ OldReview: oldReview })
	}

	setData() {
		const { OldReview } = this.state

		this.setState({
			Semester: OldReview.Semester,
			CourseNumber: OldReview.CourseNumber,
			CourseLikePressed: OldReview.CourseApproval,
			CourseDislikePressed: !OldReview.CourseApproval,
			CourseApproval: OldReview.CourseApproval,
			Usefulness: OldReview.Usefulness,
			Difficulty: OldReview.Difficulty,
			Workload: OldReview.Workload,
			CourseComment: OldReview.CourseComment,
			ProfessorName: OldReview.ProfessorName,
			ProfessorLikePressed: OldReview.ProfessorApproval,
			ProfessorDislikePressed: !OldReview.ProfessorApproval,
			ProfessorApproval: OldReview.ProfessorApproval,
			Clear: OldReview.Clear,
			Engaging: OldReview.Engaging,
			GradingDifficulty: OldReview.GradingDifficulty,
			ProfessorComment: OldReview.ProfessorComment,

			Disable: false
		})

	}

	render() {
		if (this.state.OldReview !== null && this.state.CourseNumber === "") {
			this.setData()
		}

		let loaded = this.state.CourseLoaded && this.state.ProfLoaded
		let loading = <Loading />
		let content = <ReviewFormComponent
			handleSubmit={this.handleSubmit}
			handleChange={this.handleChange}
			handleCourseNumberChange={this.handleCourseNumberChange}
			handleProfessorNameChange={this.handleProfessorNameChange}
			handleSemesterChange={this.handleSemesterChange}
			handleLike={this.handleLike}
			handleDislike={this.handleDislike}
			data={this.state} />

		return (
			<div>
				{loaded ? content : loading}
			</div>

		)
	}
}

export default withRouter(ReviewForm);