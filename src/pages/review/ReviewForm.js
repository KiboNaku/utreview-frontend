import React, { Component } from 'react'
import qs from 'qs'
import { withRouter } from 'react-router-dom'
import { getCourses, getProfs, getSemesters, getTopics, getCourseId, getProfId } from './_utils/ReviewFormFunctions'
import { checkDuplicate, newReview, editReview } from './_utils/ReviewFunctions'
import jwt_decode from 'jwt-decode'
import ReviewFormComponent from './_components/ReviewFormComponent'
import Loading from './../_utils/Loading.js'

class ReviewForm extends Component {
	constructor(props) {
		super(props);
		let invalidReview = false
		let courseId = null
		let courseDept = ""
		let courseNum = ""
		let profId = null
		let profFirst = ""
		let profLast = ""
		let topicId = null
		let topicsList = [{
			value: 'Circuits', label: 'Circuits', id: 3, topicNum: 1,
		}, {
			value: 'Electricity', label: 'Electricity', id: 4, topicNum: 2,
		}]

		console.log(props.location.state.review)

		if (props.location.state === undefined) {
			let urlObject = qs.parse(props.location.search, { ignoreQueryPrefix: true })
			if (urlObject.course) {
				getCourseId(urlObject.course).then(res => {
					if (res.error) {
						alert(res.error)
						invalidReview = true
					} else {
						courseId = res.courseId
						courseDept = res.courseDept
						courseNum = res.courseNum
						if (res.topicId !== -1) {
							courseId = res.parentId
							topicId = res.courseId
							let topicInfo = {
								topicId: res.topicId
							}
							getTopics(topicInfo).then(res => {
								if (res.error) {
									alert(res.error)
								} else {
									let data = res.topics
									let topicList = new Array()
									for (const i in data) {
										topicList.push({
											value: data[i]['topicTitle'],
											label: data[i]['topicTitle'],
											id: data[i]['id'],
											topicTitle: data[i]['topicTitle'],
											topicNum: data[i]['topicNum']
										})
									}
									topicsList = topicList
								}
							})
						}
					}
				})
			} else if (urlObject.prof) {
				getProfId(urlObject.prof).then(res => {
					if (res.error) {
						alert(res.error)
						invalidReview = true
					} else {
						profId = res.profId
						profFirst = res.firstName
						profLast = res.lastName
					}
				})
			} else {
				invalidReview = false
			}
		} else {
			if (props.location.state.courseId !== undefined) {
				courseId = props.location.state.courseId
				courseDept = props.location.state.courseDept
				courseNum = props.location.state.courseNum
				if (props.location.state.topicId !== null) {
					courseId = props.location.state.parentId
					topicId = props.location.state.courseId
					let topicInfo = {
						topicId: props.location.state.topicId
					}
					getTopics(topicInfo).then(res => {
						if (res.error) {
							alert(res.error)
						} else {
							let data = res.topics
							let topicList = new Array()
							for (const i in data) {
								topicList.push({
									value: data[i]['topicTitle'],
									label: data[i]['topicTitle'],
									id: data[i]['id'],
									topicTitle: data[i]['topicTitle'],
									topicNum: data[i]['topicNum']
								})
							}
							topicsList = topicList
						}
					})
				}
			} else if (props.location.state.profId !== undefined) {
				profId = props.location.state.profId
				profFirst = props.location.state.profFirst
				profLast = props.location.state.profLast
			} else {
				if (props.location.state.review === undefined) {
					invalidReview = true
				}
			}
		}


		this.state = {
			courseList: [{
				value: 'EE 302', label: 'EE 302', id: 1, topicNum: 0, courseDept: "EE", courseNum: "302"
			}, {
				value: 'EE 306', label: 'EE 306', id: 2, topicNum: -1, courseDept: "EE", courseNum: "306"
			}],
			topicList: topicsList,
			profList: [{
				value: 'Yu', label: 'Edward Yu', id: 1, firstName: "Edward", lastName: "Yu"
			}, {
				value: 'Bank', label: 'Seth Bank', id: 3, firstName: "Seth", lastName: "Bank"
			}],
			semesterList: [{
				value: 'Spring 2020', label: 'Spring 2020', id: 1, semester: "Spring", year: 2020
			},
			{
				value: 'Fall 2020', label: 'Fall 2020', id: 2, semester: "Fall", year: 2020
			}],
			topicLoaded: true,

			semester: {
				id: null,
				semester: "",
				year: null,
				loaded: true
			},

			topic: {
				id: topicId,
				loaded: true,
				selected: false
			},

			course: {
				id: courseId,
				dept: courseDept,
				num: courseNum,
				disabled: true,
				loaded: true
			},

			courseRating: {
				likePressed: false,
				dislikePressed: false,
				approval: null,
				usefulness: "",
				difficulty: "",
				workload: "",
				comments: "",
			},

			prof: {
				id: null,
				firstName: profFirst,
				lastName: profLast,
				disabled: true,
				loaded: true
			},

			profRating: {
				likePressed: false,
				dislikePressed: false,
				approval: null,
				clear: "",
				engaging: "",
				grading: "",
				comments: "",
			},

			grade: null,

			error: {
				course: {
					approval: "",
					usefulness: "",
					difficulty: "",
					workload: "",
				},
				prof: {
					approval: "",
					clear: "",
					engaging: "",
					grading: "",
				}
			},

			formDisabled: true,
			duplicateReview: false,
			oldReview: props.location.state === undefined || props.location.state.review === undefined ? null : props.location.state.review,
			invalidReview: invalidReview
		}

		console.log(this.state.oldReview)
	}

	validate = () => {
		let courseApprovalError = "";
		let usefulnessError = "";
		let difficultyError = "";
		let workloadError = "";
		let profApprovalError = "";
		let clearError = "";
		let engagingError = "";
		let gradingError = "";

		let emptyErrorMessage = 'This field cannot be empty.';

		if (this.state.course.approval === null) { courseApprovalError = emptyErrorMessage; }
		if (this.state.course.usefulness === "") { usefulnessError = emptyErrorMessage; }
		if (this.state.course.difficulty === "") { difficultyError = emptyErrorMessage; }
		if (this.state.course.workload === "") { workloadError = emptyErrorMessage; }
		if (this.state.prof.approval === null) { profApprovalError = emptyErrorMessage; }
		if (this.state.prof.clear === "") { clearError = emptyErrorMessage; }
		if (this.state.prof.engaging === "") { engagingError = emptyErrorMessage; }
		if (this.state.prof.grading === "") { gradingError = emptyErrorMessage; }

		if (courseApprovalError || usefulnessError || difficultyError || workloadError ||
			profApprovalError || clearError || engagingError || gradingError) {
			this.setState({
				error: {
					course: {
						approval: courseApprovalError,
						usefulness: usefulnessError,
						difficulty: difficultyError,
						workload: workloadError,
					},
					prof: {
						approval: profApprovalError,
						clear: clearError,
						engaging: engagingError,
						grading: gradingError,
					}
				}
			})
			return false;
		} else {
			return true;
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const isValid = this.validate();
		if (isValid) {
			const token = localStorage.usertoken
			const decoded = jwt_decode(token)

			let courseId = this.state.course.id
			if (this.state.topic.selected) {
				courseId = this.state.topic.id
			}

			const review = {
				user_email: decoded.identity.email,
				course_id: courseId,
				prof_id: this.state.prof.id,
				sem_id: this.state.semester.id,
				course_review: this.state.courseRating.comments,
				course_approval: this.state.courseRating.approval,
				course_usefulness: this.state.courseRating.usefulness,
				course_difficulty: this.state.courseRating.difficulty,
				course_workload: this.state.courseRating.workload,
				prof_review: this.state.profRating.comments,
				prof_approval: this.state.profRating.approval,
				prof_clear: this.state.profRating.clear,
				prof_engaging: this.state.profRating.engaging,
				prof_grading: this.state.profRating.grading,
				grade: this.state.grade
			}

			if (this.state.oldReview !== null) {
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

	handleChange = (event) => {
		const { name, value } = event.target
		this.setState({ [name]: value })
	}

	handleProfRatingChange = (event) => {
		const { name, value } = event.target
		this.setState(prevState => ({
			profRating: {
				...prevState.profRating,
				[name]: value
			}
		}))
	}

	handleCourseRatingChange = (event) => {
		const { name, value } = event.target
		this.setState(prevState => ({
			courseRating: {
				...prevState.courseRating,
				[name]: value
			}
		}))
	}

	handleCourseChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			let topicSelected = inputValue.topicNum >= 0

			if (!topicSelected) {
				this.setState(prevState => ({
					topic: {
						...prevState.topic,
						id: null,
						selected: false
					}
				}))
				let profInfo = {
					semesterId: this.state.semester.id,
					courseId: inputValue.id,
					all: false
				}
				this.setProfInfo(profInfo)
			} else {
				let topicInfo = {
					topicId: inputValue.topicId
				}
				getTopics(topicInfo).then(res => {
					if (res.error) {
						alert(res.error)
					} else {
						let data = res.topics
						let topicList = new Array()
						for (const i in data) {
							topicList.push({
								value: data[i]['topicTitle'],
								label: data[i]['topicTitle'],
								id: data[i]['id'],
								topicTitle: data[i]['topicTitle'],
								topicNum: data[i]['topicNum']
							})
						}

						this.setState(prevState => ({
							topicList: topicList,
							topic: {
								...prevState.topic,
								loaded: true,
							},
							prof: {
								...prevState.prof,
								id: null,
								firstName: "",
								lastName: "",
							},
							formDisabled: true,
						}))
					}
				})
			}

			this.setState(prevState => ({
				course: {
					...prevState.course,
					id: inputValue.id,
					dept: inputValue.courseDept,
					num: inputValue.courseNum,
				},
				prof: {
					...prevState.prof,
					disabled: topicSelected,
				},
				topic: {
					...prevState.topic,
					selected: topicSelected,
				}
			}))

		} else {
			this.setState(prevState => ({
				course: {
					...prevState.course,
					id: null,
					dept: "",
					num: "",
				},
				prof: {
					...prevState.prof,
					id: null,
					firstName: "",
					lastName: "",
					disabled: true,
				},
				topic: {
					...prevState.topic,
					selected: false,
				}
			}))
		}
	}

	setProfInfo = (profInfo) => {
		getProfs(profInfo).then(res => {
			if (res.error) {
				alert(res.error)
			} else {
				let data = res.professors
				let profList = new Array()
				for (const i in data) {
					profList.push({
						value: data[i]['firstName'] + " " + data[i]['lastName'],
						label: data[i]['firstName'] + " " + data[i]['lastName'],
						id: data[i]['id'],
						firstName: data[i]['firstName'],
						lastName: data[i]['lastName']
					})
				}
				let profId = this.state.prof.id
				if (!profList.map(prof => prof.id).includes(profId)) {
					this.setState(prevState => ({
						prof: {
							...prevState.prof,
							id: null,
							firstName: "",
							lastName: "",
						},
						formDisabled: true
					}))
				}

				this.setState(prevState => ({
					profList: profList,
					prof: {
						...prevState.prof,
						loaded: true
					}
				}))
			}
		})
	}

	handleTopicChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			let profInfo = {
				semesterId: this.state.semester.id,
				courseId: inputValue.id,
				all: false
			}
			this.setProfInfo(profInfo)
			this.setState(prevState => ({
				topic: {
					...prevState.topic,
					id: inputValue.id
				},
				prof: {
					...prevState.prof,
					disabled: false
				}
			}))

		} else {
			this.setState(prevState => ({
				prof: {
					...prevState.prof,
					firstName: "",
					lastName: "",
					disabled: true
				},
				topic: {
					...prevState.topic,
					id: null
				},
				formDisabled: true
			}))
		}
	}

	handleProfessorChange = (inputValue, { action }) => {

		if (inputValue !== null) {
			this.setState(prevState => ({
				prof: {
					...prevState.prof,
					id: inputValue.id,
					firstName: inputValue.firstName,
					lastName: inputValue.lastName,
				},
				formDisabled: false
			}))

			const token = localStorage.usertoken
			const decoded = jwt_decode(token)

			const review = {
				user_email: decoded.identity.email,
				course_id: this.state.course.id,
				prof_id: this.state.prof.id,
				sem_id: this.state.semester.id
			}

			checkDuplicate(review).then(res => {
				if (res.error) {
					alert(res.error)
					this.setState({ duplicateReview: true })
				} else {
					console.log(res)
				}
			})

		} else {
			this.setState(prevState => ({
				prof: {
					...prevState.prof,
					id: null,
					firstName: "",
					lastName: "",
				},
				formDisabled: true
			}))
		}
	}

	handleSemesterChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			let courseInfo = {
				semesterId: inputValue.id,
				all: false
			}
			getCourses(courseInfo).then(res => {
				if (res.error) {
					alert(res.error)
				} else {
					let data = res.courses
					let courseList = new Array()
					for (const i in data) {
						courseList.push({
							value: data[i]['dept'] + " " + data[i]['num'],
							label: data[i]['dept'] + " " + data[i]['num'],
							id: data[i]['id'],
							topicId: data[i]['topicId'],
							courseDept: data[i]['dept'],
							courseNum: data[i]['num'],
							topicNum: data[i]['topicNum']
						})
					}
					let courseId = this.state.course.id
					if (!courseList.map(course => course.id).includes(courseId) || this.state.topic.selected) {
						this.setState(prevState => ({
							course: {
								...prevState.course,
								id: null
							},
							prof: {
								...prevState.prof,
								id: null,
								firstName: "",
								lastName: "",
								disable: true
							},
							topic: {
								...prevState.topic,
								selected: false
							},
							formDisabled: true
						}))
					} else {
						let profInfo = {
							semesterId: inputValue.id,
							courseId: courseId,
							all: false
						}
						this.setProfInfo(profInfo)
					}

					this.setState(prevState => ({
						courseList: courseList,
						course: {
							...prevState.course,
							loaded: true
						}
					}))
				}
			})
			this.setState(prevState => ({
				semester: {
					...prevState.semester,
					id: inputValue.id,
					semester: inputValue.semester,
					year: inputValue.year
				},
				course: {
					...prevState.course,
					disabled: false
				}
			}))

		} else {
			this.setState(prevState => ({
				semester: {
					...prevState.semester,
					id: null,
					semester: "",
					year: ""
				},
				course: {
					...prevState.course,
					id: null,
					dept: "",
					num: "",
					disabled: true
				},
				prof: {
					...prevState.prof,
					id: null,
					firstName: "",
					lastName: "",
					disabled: true
				},
				topic: {
					...prevState.topic,
					selected: false
				},
				formDisabled: true
			}))
		}
	}

	handleLike = (type) => {
		switch (type) {
			case 'course':
				this.setState(prevState => ({
					courseRating: {
						...prevState.courseRating,
						likePressed: true,
						dislikePressed: false,
						approval: true
					}
				}))
				break
			case 'prof':
				this.setState(prevState => ({
					profRating: {
						...prevState.profRating,
						likePressed: true,
						dislikePressed: false,
						approval: true
					}
				}))
		}
	}

	handleDislike = (type) => {
		switch (type) {
			case 'course':
				this.setState(prevState => ({
					courseRating: {
						...prevState.courseRating,
						likePressed: false,
						dislikePressed: true,
						approval: false
					}
				}))
				break
			case 'prof':
				this.setState(prevState => ({
					profRating: {
						...prevState.profRating,
						likePressed: false,
						dislikePressed: true,
						approval: false
					}
				}))
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
		// 				semester: data[i]['semester'],
		// 				year: data[i]['year']
		// 			})
		// 		}
		// 		this.setState(prevState => ({ 
		// 			semesterList: semList, 
		// 			semester: {
		// 				...prevState.semester,
		// 				loaded: true
		// 			}
		// 		}))
		// 	}
		// })
		// let courseInfo = {
		// 	semesterId: null,
		// 	all: true
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
		// 		this.setState(prevState => ({ 
		// 			courseList: courseList, 
		// 			course: {
		// 				...prevState.course,
		// 				loaded: true
		// 			}
		// 		}))
		// 	}
		// })

		// let profInfo = {
		// 	semesterId: null,
		// 	courseId: null,
		// 	all: true
		// }
		// this.setProfInfo(profInfo)
	}

	setOldReviewData = () => {
		const { oldReview } = this.state

		console.log(oldReview)
		let topicId = null
		let courseId = oldReview.course.id
		let topicSelected = oldReview.course.topicNum > 0
		if (topicSelected) {
			courseId = oldReview.course.parentId
			topicId = oldReview.course.id
			let topicInfo = {
				topicId: oldReview.course.topicId
			}
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
			// 		this.setState({topicsList: topicList})
			// 	}
			// })
		}
		console.log("Course id" + courseId)
		console.log("Topic id" + topicId)

		this.setState(prevState => ({
			semester: {
				...prevState.semester,
				id: oldReview.semester.id,
				semester: oldReview.semester.semester,
				year: oldReview.semester.year
			},
			course: {
				...prevState.course,
				id: courseId,
				dept: oldReview.course.dept.abr,
				num: oldReview.course.num,
			},
			topic: {
				...prevState.topic,
				id: topicId,
				selected: topicSelected
			},
			courseRating: {
				...prevState.courseRating,
				likePressed: oldReview.courseRating.approval,
				dislikePressed: !oldReview.courseRating.approval,
				approval: oldReview.courseRating.approval,
				usefulness: oldReview.courseRating.usefulness,
				difficulty: oldReview.courseRating.difficulty,
				workload: oldReview.courseRating.workload,
				comments: oldReview.courseRating.comments
			},
			prof: {
				...prevState.prof,
				id: oldReview.prof.id,
				firstName: oldReview.prof.firstName,
				lastName: oldReview.prof.lastName,
			},
			profRating: {
				...prevState.profRating,
				likePressed: oldReview.profRating.approval,
				dislikePressed: !oldReview.profRating.approval,
				approval: oldReview.profRating.approval,
				clear: oldReview.profRating.clear,
				engaging: oldReview.profRating.engaging,
				grading: oldReview.profRating.grading,
				comments: oldReview.profRating.comments
			},
			grade: oldReview.grade,
			formDisabled: false
		}))

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

		return(
			<div>
				{loaded ? content : loading}
			</div>
		);
	}
}

export default withRouter(ReviewForm);