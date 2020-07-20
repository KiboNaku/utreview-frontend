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
		console.log(props.location.state)

		this.state = {
			reviewId: null,
			courseList: [{
				value: 'EE 302', label: 'EE 302', id: 1, topicNum: 0, courseDept: "EE", courseNum: "302"
			}, {
				value: 'EE 306',
				label: 'EE 306',
				id: 2,
				topicNum: -1,
				courseDept: "EE",
				courseNum: "306"
			}],
			topicList: [{
				value: 'Circuits', label: 'Circuits', id: 3, topicNum: 1,
			}, {
				value: 'Electricity', label: 'Electricity', id: 4, topicNum: 2,
			}],
			profList: [{
				value: 'Yu', label: 'Edward Yu', id: 1, firstName: "Edward", lastName: "Yu"
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

			semester: {
				id: null,
				semester: "",
				year: null,
				loaded: false
			},

			topic: {
				id: null,
				loaded: false,
				selected: false
			},

			course: {
				id: null,
				dept: "",
				num: "",
				topicId: null,
				disabled: true,
				loaded: false
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
				firstName: "",
				lastName: "",
				disabled: true,
				loaded: false,
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
			invalidReview: false
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
		let GradingDifficultyError = "";

		let emptyErrorMessage = 'This field cannot be empty.';

		if (this.state.CourseApproval === null) { CourseApprovalError = emptyErrorMessage; }
		if (this.state.Usefulness === 0) { UsefulnessError = emptyErrorMessage; }
		if (this.state.Difficulty === 0) { DifficultyError = emptyErrorMessage; }
		if (this.state.Workload === 0) { WorkloadError = emptyErrorMessage; }
		if (this.state.ProfessorApproval === null) { ProfessorApprovalError = emptyErrorMessage; }
		if (this.state.Clear === 0) { ClearError = emptyErrorMessage; }
		if (this.state.Engaging === 0) { EngagingError = emptyErrorMessage; }
		if (this.state.GradingDifficulty === 0) { GradingDifficultyError = emptyErrorMessage; }

		if (CourseApprovalError ||
			UsefulnessError ||
			DifficultyError ||
			WorkloadError ||
			ProfessorApprovalError ||
			ClearError ||
			EngagingError ||
			GradingDifficultyError) {
			this.setState({
				CourseApprovalError: CourseApprovalError,
				UsefulnessError: UsefulnessError,
				DifficultyError: DifficultyError,
				WorkloadError: WorkloadError,
				ProfessorApprovalError: ProfessorApprovalError,
				ClearError: ClearError,
				EngagingError: EngagingError,
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

			let courseId = this.state.course.id
			if (this.state.topic.selected) {
				courseId = this.state.topic.id
			}

			const review = {
				review_id: this.state.reviewId,
				user_email: decoded.identity.email,
				course_id: courseId,
				prof_id: this.state.prof.id,
				sem_id: this.state.semester.id,
				course_comments: this.state.courseRating.comments,
				course_approval: this.state.courseRating.approval,
				course_usefulness: this.state.courseRating.usefulness,
				course_difficulty: this.state.courseRating.difficulty,
				course_workload: this.state.courseRating.workload,
				prof_comments: this.state.profRating.comments,
				prof_approval: this.state.profRating.approval,
				prof_clear: this.state.profRating.clear,
				prof_engaging: this.state.profRating.engaging,
				prof_grading: this.state.profRating.grading,
				grade: this.state.grade
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
		console.log(name)
		console.log(value)
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
			let profId = this.state.prof.id
			if (!topicSelected) {
				this.setState(prevState => ({
					topic: {
						...prevState.topic,
						id: null,
						selected: false
					},
					prof: {
						...prevState.prof,
						disabled: false
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
					topicId: inputValue.topicId,
					semesterId: this.state.semester.id
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
						let profList = new Array()
						for (const i in res.profs) {
							profList.push({
								id: res.profs[i]['id']
							})
						}
						profId = this.state.prof.id
						if (!profList.map(prof => prof.id).includes(this.state.prof.id)) {
							this.setState(prevState => ({
								prof: {
									...prevState.prof,
									id: null,
									firstName: "",
									lastName: "",
								},
							}))
							profId = null
						}
						this.setState(prevState => ({
							topicList: topicList,
							topic: {
								...prevState.topic,
								loaded: true,
							},
							formDisabled: this.state.topic.id === null || profId === null,
						}))
					}
				})
			}

			let profDisabled = false
			let courseId = inputValue.id
			if (topicSelected && this.state.topic.id === null) {
				profDisabled = true
				courseId = null
			}

			this.setState(prevState => ({
				course: {
					...prevState.course,
					id: inputValue.id,
					dept: inputValue.courseDept,
					num: inputValue.courseNum,
					topicId: inputValue.topicId
				},
				prof: {
					...prevState.prof,
					disabled: profDisabled,
				},
				topic: {
					...prevState.topic,
					selected: topicSelected,
				}
			}))
			const token = localStorage.usertoken
			const decoded = jwt_decode(token)
			if (this.state.semester.id !== null && profId !== null && courseId !== null) {
				const review = {
					user_email: decoded.identity.email,
					course_id: inputValue.id,
					prof_id: profId,
					sem_id: this.state.semester.id
				}
				this.checkDuplicate(review)
			}

		} else {
			this.setState(prevState => ({
				course: {
					...prevState.course,
					id: null,
					dept: "",
					num: "",
					topicId: null
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
					id: null,
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
				let data = res.profs
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
					profId = null
				} else {
					let courseId = this.state.topic.selected ? this.state.topic.id : this.state.course.id
					if (courseId !== null && this.state.semester.id !== null) {
						this.setState({
							formDisabled: false
						})
					}

				}
				console.log(profList)
				this.setState(prevState => ({
					profList: profList,
					prof: {
						...prevState.prof,
						loaded: true
					}
				}))
				const token = localStorage.usertoken
				const decoded = jwt_decode(token)
				if (profInfo.semesterId !== null && profInfo.courseId !== null && profId !== null) {
					const review = {
						user_email: decoded.identity.email,
						course_id: profInfo.courseId,
						prof_id: profId,
						sem_id: profInfo.semesterId
					}
					this.checkDuplicate(review)
				}
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
			let profId = null
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

			const token = localStorage.usertoken
			const decoded = jwt_decode(token)
			if (this.state.semester.id !== null && profId !== null) {
				const review = {
					user_email: decoded.identity.email,
					course_id: inputValue.id,
					prof_id: profId,
					sem_id: this.state.semester.id
				}
				this.checkDuplicate(review)
			}

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
			let courseId = this.state.course.id
			if (this.state.topic.selected) {
				courseId = this.state.topic.id
			}
			if (courseId !== null && this.state.semester.id !== null) {
				const review = {
					user_email: decoded.identity.email,
					course_id: courseId,
					prof_id: inputValue.id,
					sem_id: this.state.semester.id
				}
				this.checkDuplicate(review)
			}

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

	checkDuplicate = (review) => {
		checkDuplicate(review).then(res => {
			if (res.error) {
				alert(res.error)
				this.setState({ duplicateReview: true, formDisabled: true })
			} else {
				console.log(res)
			}
		})

	}

	handleSemesterChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			let courseInfo = {
				semesterId: inputValue.id,
				all: false
			}
			let courseId = null
			let profId = null
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
					let topicList = new Array()
					for (const i in res.topics) {
						topicList.push({
							id: res.topics[i]['id']
						})
					}
					let profList = new Array()
					for (const i in res.profs) {
						profList.push({
							id: res.profs[i]['id']
						})
					}
					console.log(profList)
					courseId = this.state.course.id
					profId = this.state.prof.id
					if (courseId === null) {
						if (profId !== null) {
							if (!profList.map(prof => prof.id).includes(profId)) {
								this.setState(prevState => ({
									prof: {
										...prevState.prof,
										id: null,
										firstName: "",
										lastName: "",
										disabled: true
									},
									formDisabled: true
								}))
								profId = null
							}
						}
					} else if (!courseList.map(course => course.id).includes(courseId)) {

						this.setState(prevState => ({
							course: {
								...prevState.course,
								id: null,
								dept: "",
								num: "",
								topicId: null
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
								id: null,
								selected: false
							},
							formDisabled: true
						}))
						courseId = null
						profId = null
					} else if (this.state.topic.selected) {
						let topicInfo = {
							topicId: this.state.course.topicId,
							semesterId: inputValue.id
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
								this.setState({ topicList: topicList })
							}
						})
						if (!topicList.map(topic => topic.id).includes(this.state.topic.id)) {
							console.log("No topic, has course")
							console.log(this.state.topic.id)
							console.log(topicList)
							if (courseList.map(course => course.id).includes(courseId)) {
								this.setState(prevState => ({
									topic: {
										...prevState.topic,
										id: null,
									},
									prof: {
										...prevState.prof,
										id: null,
										firstName: "",
										lastName: "",
										disabled: true
									},
									formDisabled: true
								}))
							} else {
								this.setState(prevState => ({
									course: {
										...prevState.course,
										id: null,
										dept: "",
										num: "",
										topicId: null
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
										id: null,
										selected: false
									},
									formDisabled: true
								}))
							}
							courseId = null
							profId = null
						} else {
							let profInfo = {
								semesterId: inputValue.id,
								courseId: this.state.topic.id,
								all: false
							}
							this.setProfInfo(profInfo)
							this.setState(prevState => ({
								prof: {
									...prevState.prof,
									disabled: false
								}
							}))
						}
					} else {
						courseId = this.state.topic.selected ? this.state.topic.id : courseId
						let profInfo = {
							semesterId: inputValue.id,
							courseId: courseId,
							all: false
						}
						this.setProfInfo(profInfo)
						this.setState(prevState => ({
							prof: {
								...prevState.prof,
								disabled: false
							}
						}))
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

			const token = localStorage.usertoken
			const decoded = jwt_decode(token)
			if (courseId !== null && profId !== null) {
				const review = {
					user_email: decoded.identity.email,
					course_id: courseId,
					prof_id: profId,
					sem_id: inputValue.id
				}
				this.checkDuplicate(review)
			}

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
					topicId: null,
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
					id: null,
					selected: false
				},
				formDisabled: true
			}))
		}
	}

	handleLike(type) {
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

	handleDislike(type) {
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

	handleGradeChange = (inputValue, { action }) => {
		if (inputValue == null) {
			this.setState({ grade: null })
		} else {
			this.setState({ grade: inputValue.value })
		}

	}

	componentDidMount() {
		if (this.props.location.state === undefined) {
			let urlObject = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
			if (urlObject.course) {
				const course = {
					courseString: urlObject.course
				}
				getCourseId(course).then(res => {
					if (res.error) {
						alert(res.error)
						this.setState({ invalidReview: true })
					} else {
						this.setState(prevState => ({
							course: {
								...prevState.course,
								id: res.courseId,
								dept: res.courseDept,
								num: res.courseNum,
								topicId: res.topicId
							}
						}))
						if (res.topicId !== -1) {
							this.setState(prevState => ({
								topic: {
									...prevState.topic,
									selected: true,
									id: res.courseId
								},
								course: {
									...prevState.course,
									id: res.parentId
								}
							}))
							let topicInfo = {
								topicId: res.topicId,
								semesterId: null
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
									this.setState({ topicList: topicList })
								}
							})
						}
					}
				})
			} else if (urlObject.prof) {
				const prof = {
					profString: urlObject.prof
				}
				getProfId(prof).then(res => {
					if (res.error) {
						alert(res.error)
						this.setState({ invalidReview: true })
					} else {
						this.setState(prevState => ({
							prof: {
								...prevState.prof,
								id: res.profId,
								firstName: res.firstName,
								lastName: res.lastName
							}
						}))
					}
				})
			} else {
				this.setState({ invalidReview: false })
			}
		} else {
			if (this.props.location.state.courseId !== undefined) {
				this.setState(prevState => ({
					course: {
						...prevState.course,
						id: this.props.location.state.courseId,
						dept: this.props.location.state.courseDept,
						num: this.props.location.state.courseNum,
						topicId: this.props.location.state.topicId
					}
				}))
				if (this.props.location.state.topicId !== null) {
					this.setState(prevState => ({
						topic: {
							...prevState.topic,
							id: this.props.location.state.courseId,
							selected: true
						},
						course: {
							...prevState.course,
							id: this.props.location.state.parentId
						}
					}))
					let topicInfo = {
						topicId: this.props.location.state.topicId,
						semesterId: null
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
							this.setState({ topicList: topicList })
						}
					})
				}
			} else if (this.props.location.state.profId !== undefined) {
				this.setState(prevState => ({
					prof: {
						...prevState.prof,
						id: this.props.location.state.profId,
						firstName: this.props.location.state.profFirst,
						lastName: this.props.location.state.profLast
					}
				}))
			} else {
				if (this.props.location.state.review === undefined) {
					this.setState({ invalidReview: true })
				}
			}
		}

		getSemesters().then(res => {
			if (res.error) {
				alert(res.error)
			} else {
				let data = res.semesters
				let semList = new Array()
				for (const i in data) {
					semList.push({
						value: data[i]['semester'] + " " + data[i]['year'].toString(),
						label: data[i]['semester'] + " " + data[i]['year'].toString(),
						id: data[i]['id'],
						semester: data[i]['semester'],
						year: data[i]['year']
					})
				}
				this.setState(prevState => ({
					semesterList: semList,
					semester: {
						...prevState.semester,
						loaded: true
					}
				}))
			}
		})
		let courseInfo = {
			semesterId: null,
			all: true
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
				this.setState(prevState => ({
					courseList: courseList,
					course: {
						...prevState.course,
						loaded: true
					}
				}))
			}
		})

		let profInfo = {
			semesterId: null,
			courseId: null,
			all: true
		}
		this.setProfInfo(profInfo)
	}

	setOldReviewData = () => {
		const { oldReview } = this.state

		console.log(oldReview)
		let topicId = null
		let courseId = oldReview.course.id
		let topicSelected = oldReview.course.topicNum >= 0
		if (topicSelected) {
			courseId = oldReview.course.parentId
			topicId = oldReview.course.id
			let topicInfo = {
				topicId: oldReview.course.topicId,
				semesterId: null
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
					this.setState({ topicsList: topicList })
				}
			})
		}
		console.log("Course id" + courseId)
		console.log("Topic id" + topicId)

		this.setState(prevState => ({
			reviewId: oldReview.id,
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
				topicId: oldReview.course.topicId
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
		if (this.state.oldReview !== null && this.state.course.dept === "") {
			this.setOldReviewData()
		}

		let invalidReview = <h1>
			This review link is invalid
		</h1>

		let loaded = this.state.course.loaded && this.state.prof.loaded && this.state.semester.loaded

		let loading = <Loading />
		console.log(this.state)

		let content = <ReviewFormComponent
			key={this.state.courseList}
			handleSubmit={this.handleSubmit}
			handleChange={this.handleChange}
			handleCourseChange={this.handleCourseChange}
			handleProfessorChange={this.handleProfessorChange}
			handleSemesterChange={this.handleSemesterChange}
			handleTopicChange={this.handleTopicChange}
			handleCourseRatingChange={this.handleCourseRatingChange}
			handleProfRatingChange={this.handleProfRatingChange}
			handleGradeChange={this.handleGradeChange}
			handleLike={this.handleLike}
			handleDislike={this.handleDislike}
			data={this.state} />

		return (
			<div>
				{this.state.invalidReview ? invalidReview : (loaded ? content : loading)}
			</div>
		);
	}
}

export default withRouter(ReviewForm);