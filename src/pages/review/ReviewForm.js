import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getCourses, getProfs, getSemesters, getTopics } from './_utils/ReviewFormFunctions'
import { checkDuplicate, newReview, editReview } from './_utils/ReviewFunctions'
import jwt_decode from 'jwt-decode'
import ReviewFormComponent from './_components/ReviewFormComponent'
import Loading from './../_utils/Loading.js'

class ReviewForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			CourseList: [{
				value: 'EE 302',
				label: 'EE 302',
				id: 1,
				topicNum: 0,
				courseDept: "EE",
				courseNum: "302"
			}, {
				value: 'EE 306',
				label: 'EE 306',
				id: 2,
				topicNum: -1,
				courseDept: "EE",
				courseNum: "306"
			}],
			TopicList: [{
				value: 'Circuits',
				label: 'Circuits',
				id: 3,
				topicNum: 1,
			}, {
				value: 'Electricity',
				label: 'Electricity',
				id: 4,
				topicNum: 2,
			}],
			ProfessorList: [{
				value: 'Yu',
				label: 'Yu',
				id: 1,
				firstName: "Edward",
				lastName: "Yu"
			}, {
				value: 'Bank',
				label: 'Bank',
				id: 2,
				firstName: "Seth",
				lastName: "Bank"
			}],
			SemesterList: [{
				value: 'Spring 2020',
				label: 'Spring 2020',
				id: 1,
				semester: "Spring",
				year: 2020
			},
			{
				value: 'Fall 2020',
				label: 'Fall 2020',
				id: 2,
				semester: "Fall",
				year: 2020
			}],
			CourseLoaded: true,
			ProfLoaded: true,
			SemesterLoaded: true,
			TopicLoaded: true,

			SemesterId: null,
			SemesterSeason: "",
			SemesterYear: null,

			TopicId: null,

			CourseId: null,
			CourseDept: "",
			CourseNum: "",
			CourseLikePressed: false,
			CourseDislikePressed: false,
			CourseApproval: null,
			Usefulness: "",
			Difficulty: "",
			Workload: "",
			CourseComment: "",
			CourseDisabled: true,

			ProfessorId: null,
			ProfessorFirst: "",
			ProfessorLast: "",
			ProfessorLikePressed: false,
			ProfessorDislikePressed: false,
			ProfessorApproval: null,
			Clear: "",
			Engaging: "",
			Helpful: "",
			GradingDifficulty: "",
			ProfessorComment: "",
			ProfessorDisabled: true,

			CourseApprovalError: "",
			UsefulnessError: "",
			DifficultyError: "",
			WorkloadError: "",

			ProfessorApprovalError: "",
			ClearError: "",
			EngagingError: "",
			HelpfulError: "",
			GradingDifficultyError: "",

			FormDisabled: true,

			Duplicate: false,
			OldReview: null,
			topicSelected: false
		}

		this.validate = this.validate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleCourseChange = this.handleCourseChange.bind(this);
		this.handleProfessorChange = this.handleProfessorChange.bind(this);
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
				course_id: this.state.CourseId,
				prof_id: this.state.ProfessorId,
				sem_id: this.state.SemesterId,
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
						this.props.history.push("/profile")
					}
				})
			} else {
				newReview(review).then(res => {
					if (res.error) {
						alert(res.error)
					} else {
						this.props.history.push("/profile")
					}
				})
			}
		}
	}

	handleChange(event) {
		const { name, value } = event.target
		this.setState({ [name]: value })
	}

	handleCourseChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			let topicSelected = inputValue.topicNum >= 0		

			if(!topicSelected){
				this.setState({TopicId: null, topicSelected: false})
				// let profInfo = {
				// 	semesterId: this.state.SemesterId,
				// 	courseId: inputValue.id
				// }
				// getProfs(profInfo).then(res => {
				// 	if (res.error) {
				// 		alert(res.error)
				// 	} else {
				// 		let data = res.professors
				// 		let profList = new Array()
				// 		for (const i in data) {
				// 			profList.push({
				// 				value: data[i]['firstName'] + " " + data[i]['lastName'],
				// 				label: data[i]['firstName'] + " " + data[i]['lastName'],
				// 				id: data[i]['id'],
				// 				firstName: data[i]['firstName'],
				// 				lastName: data[i]['lastName']
				// 			})
				// 		}
				// 		let profId = this.state.ProfessorId
				// 		if (!profList.map(prof => prof.id).includes(profId)) {
				// 			this.setState({ProfessorId: null, ProfessorFirst: "", ProfessorLast: "", FormDisabled: true})
				// 		} 
	
				// 		this.setState({ ProfessorList: profList, ProfLoaded: true })
				// 	}
				// })
			}else{
				// let topicInfo = {
				// 	topicId: inputValue.topicId
				// }
				// getTopics(topicInfo).then(res => {
				// 	if (res.error) {
				// 		alert(res.error)
				// 	} else {
				// 		let data = res.topics
				// 		let topicList = new Array()
				// 		for (const i in data) {
				// 			topicList.push({
				// 				value: data[i]['topicTitle'],
				// 				label: data[i]['topicTitle'],
				// 				id: data[i]['id'],
				// 				topicTitle: data[i]['topicTitle'],
				// 				topicNum: data[i]['topicNum']
				// 			})
				// 		}
					
				// 		this.setState({ TopicList: topicList, TopicLoaded: true,
				// 		ProfessorId: null, ProfessorFirst: "", ProfessorLast: "", FormDisabled: true,
				// 		})
				// 	}
				// })
			}
			
			this.setState({
				CourseDept: inputValue.courseDept, CourseNum: inputValue.courseNum, CourseId: inputValue.id,
				ProfessorDisabled: topicSelected, topicSelected: topicSelected
			})

		} else {
			this.setState({
				CourseDept: "", CourseNum: "", CourseId: null, TopicId: null,
				ProfessorFirst: "", ProfessorLast: "", ProfessorId: null,
				ProfessorDisabled: true, FormDisabled: true, topicSelected: false
			})
		}
	}

	handleTopicChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			// let profInfo = {
			// 	semesterId: this.state.SemesterId,
			// 	courseId: inputValue.id
			// }
			// getProfs(profInfo).then(res => {
			// 	if (res.error) {
			// 		alert(res.error)
			// 	} else {
			// 		let data = res.professors
			// 		let profList = new Array()
			// 		for (const i in data) {
			// 			profList.push({
			// 				value: data[i]['firstName'] + " " + data[i]['lastName'],
			// 				label: data[i]['firstName'] + " " + data[i]['lastName'],
			// 				id: data[i]['id'],
			// 				firstName: data[i]['firstName'],
			// 				lastName: data[i]['lastName']
			// 			})
			// 		}
			// 		let profId = this.state.ProfessorId
			// 		if (!profList.map(prof => prof.id).includes(profId)) {
			// 			this.setState({ProfessorId: null, ProfessorFirst: "", ProfessorLast: "", FormDisabled: true})
			// 		} 

			// 		this.setState({ ProfessorList: profList, ProfLoaded: true })
			// 	}
			// })
			this.setState({
				TopicId: inputValue.id,
				ProfessorDisabled: false
			})

		} else {
			this.setState({
				ProfessorFirst: "", ProfessorLast: "", ProfessorId: null,
				ProfessorDisabled: true, FormDisabled: true, TopicId: null
			})
		}
	}

	handleProfessorChange = (inputValue, { action }) => {

		if (inputValue !== null) {
			this.setState({ ProfessorFirst: inputValue.firstName, ProfessorLast: inputValue.lastName, ProfessorId: inputValue.id, FormDisabled: false })

			const token = localStorage.usertoken
			const decoded = jwt_decode(token)

			const review = {
				user_email: decoded.identity.email,
				course_id: this.state.CourseId,
				prof_id: this.state.ProfessorId,
				sem_id: this.state.SemesterId
			}

			checkDuplicate(review).then(res => {
				if (res.error) {
					alert(res.error)
					this.setState({ duplicate: true })
				} else {
					console.log(res)
				}
			})

		} else {
			this.setState({ ProfessorFirst: "", ProfessorLast: "", ProfessorId: null, FormDisabled: true })
		}
	}

	handleSemesterChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			// let courseInfo = {
			// 	semesterId: inputValue.id
			// }
			// getCourses(courseInfo).then(res => {
			// 	if (res.error) {
			// 		alert(res.error)
			// 	} else {
			// 		let data = res.courses
			// 		let courseList = new Array()
			// 		for (const i in data) {
			// 			courseList.push({
			// 				value: data[i]['dept'] + " " + data[i]['num'],
			// 				label: data[i]['dept'] + " " + data[i]['num'],
			// 				id: data[i]['id'],
			// 				topicId: data[i]['topicId'],
			// 				courseDept: data[i]['dept'],
			// 				courseNum: data[i]['num'],
			// 				topicNum: data[i]['topicNum']
			// 			})
			// 		}
			// 		let courseId = this.state.CourseId
			// 		if (!courseList.map(course => course.id).includes(courseId) || this.state.topicSelected) {
			// 			if (this.state.topicSelected) {
			// 				this.setState({ topicSelected: false })
			// 			}
			// 			this.setState({CourseId: null, ProfessorId: null, ProfessorFirst: "", ProfessorLast: "", ProfessorDisable: true, FormDisabled: true})
			// 		} else {
			// 			let profInfo = {
			// 				semesterId: inputValue.id,
			// 				courseId: courseId
			// 			}
			// 			getProfs(profInfo).then(res => {
			// 				if (res.error) {
			// 					alert(res.error)
			// 				} else {
			// 					let data = res.professors
			// 					let profList = new Array()
			// 					for (const i in data) {
			// 						profList.push({
			// 							value: data[i]['firstName'] + " " + data[i]['lastName'],
			// 							label: data[i]['firstName'] + " " + data[i]['lastName'],
			// 							id: data[i]['id'],
			// 							firstName: data[i]['firstName'],
			// 							lastName: data[i]['lastName']
			// 						})
			// 					}
			// 					let profId = this.state.ProfessorId
			// 					if (!profList.map(prof => prof.id).includes(profId)) {
			// 						this.setState({ProfessorId: null, ProfessorFirst: "", ProfessorLast: "", FormDisabled: true})
			// 					} 

			// 					this.setState({ ProfessorList: profList, ProfLoaded: true })
			// 				}
			// 			})
			// 		}

			// 		this.setState({ CourseList: courseList, CourseLoaded: true})
			// 	}
			// })
			this.setState({
				SemesterSeason: inputValue.semester, SemesterYear: inputValue.year, SemesterId: inputValue.id,
				CourseDisabled: false
			})

		} else {
			this.setState({
				SemesterSeason: "", SemesterYear: "", SemesterId: null,
				CourseDept: "", CourseNum: "", CourseId: null, topicSelected: false,
				ProfessorFirst: "", ProfessorLast: "", ProfessorId: null,
				CourseDisabled: true, ProfessorDisabled: true, FormDisabled: true
			})
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

		// getSemesters().then(res => {
		// 	if (res.error) {
		// 		alert(res.error)
		// 	} else {
		// 		let data = res.semesters
		// 		let semList = new Array()
		// 		for (const i in data) {
		// 			semList.push({
		// 				value: data[i]['semester'] + " " + data[i]['year'].toString(),
		// 				label: data[i]['semester'] + " " + data[i]['year'].toString(),
		// 				id: data[i]['id'],
		//				semester: data[i]['semester'],
		//				year: data[i]['year']
		// 			})
		// 		}
		// 		this.setState({ SemesterList: semList, SemesterLoaded: true })
		// 	}
		// })

		// getTopics().then(res => {
		// 	if (res.error) {
		// 		alert(res.error)
		// 	} else {
		// 		let data = res.topics
		// 		let topicList = new Array()
		// 		for (const i in data) {
		// 			topicList.push({
		// 				value: data[i]['title'],
		// 				label: data[i]['title'],
		// 				id: data[i]['id'],
		// 			})
		// 		}
		// 		this.setState({ TopicsList: topicList, TopicLoaded: true })
		// 	}
		// })

		let oldReview = this.props.location.state === undefined ? null : this.props.location.state.review
		this.setState({ OldReview: oldReview })
	}

	setData() {
		const { OldReview } = this.state

		console.log(OldReview)

		this.setState({
			SemesterId: OldReview.SemesterId,
			SemesterSeason: OldReview.SemesterSeason,
			SemesterYear: OldReview.SemesterYear,
			CourseId: OldReview.CourseId,
			CourseDept: OldReview.CourseDept,
			CourseNum: OldReview.CourseNum,
			CourseLikePressed: OldReview.CourseApproval,
			CourseDislikePressed: !OldReview.CourseApproval,
			CourseApproval: OldReview.CourseApproval,
			Usefulness: OldReview.Usefulness,
			Difficulty: OldReview.Difficulty,
			Workload: OldReview.Workload,
			CourseComment: OldReview.CourseComment,
			ProfessorId: OldReview.ProfessorId,
			ProfessorFirst: OldReview.ProfessorFirst,
			ProfessorLast: OldReview.ProfessorLast,
			ProfessorLikePressed: OldReview.ProfessorApproval,
			ProfessorDislikePressed: !OldReview.ProfessorApproval,
			ProfessorApproval: OldReview.ProfessorApproval,
			Clear: OldReview.Clear,
			Engaging: OldReview.Engaging,
			GradingDifficulty: OldReview.GradingDifficulty,
			ProfessorComment: OldReview.ProfessorComment,

			FormDisabled: false
		})

	}

	render() {
		if (this.state.OldReview !== null && this.state.CourseDept === "") {
			this.setData()
		}

		let loaded = this.state.CourseLoaded && this.state.ProfLoaded && this.state.SemesterLoaded
		let loading = <Loading />
		let content = <ReviewFormComponent
			handleSubmit={this.handleSubmit}
			handleChange={this.handleChange}
			handleCourseChange={this.handleCourseChange}
			handleProfessorChange={this.handleProfessorChange}
			handleSemesterChange={this.handleSemesterChange}
			handleTopicChange={this.handleTopicChange}
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