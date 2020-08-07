import React, { Component } from 'react'
import qs from 'qs'
import { withRouter } from 'react-router-dom'
import { getCourses, getProfs, getSemesters, getTopics, getCourseId, getProfId } from './_utils/ReviewFormFunctions'
import { checkDuplicate, newReview, editReview } from './_utils/ReviewFunctions'
import Error from './../_utils/Error'
import jwt_decode from 'jwt-decode'
import ReviewFormComponent from './_components/ReviewFormComponent'
import Loading from './../_utils/Loading.js'
import $ from './../../../node_modules/jquery'

class ReviewForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			reviewId: null,
			order: 0,

			semester: {
				id: null,
				semester: "",
				year: null,
				loaded: false,
				disabled: true,
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
			invalidReview: false,
			errorMessage: ''
		}
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

		let emptyErrorMessage = 'This field is required.';
		
		if (this.state.courseRating.approval === null) { courseApprovalError = emptyErrorMessage; }
		if (this.state.courseRating.usefulness === "") { usefulnessError = emptyErrorMessage; }
		if (this.state.courseRating.difficulty === "") { difficultyError = emptyErrorMessage; }
		if (this.state.courseRating.workload === "") { workloadError = emptyErrorMessage; }
		if (this.state.profRating.approval === null) { profApprovalError = emptyErrorMessage; }
		if (this.state.profRating.clear === "") { clearError = emptyErrorMessage; }
		if (this.state.profRating.engaging === "") { engagingError = emptyErrorMessage; }
		if (this.state.profRating.grading === "") { gradingError = emptyErrorMessage; }

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
						let topicList = []
						for (const i in data) {
							topicList.push({
								value: data[i]['topicTitle'],
								label: data[i]['topicTitle'],
								id: data[i]['id'],
								topicTitle: data[i]['topicTitle'],
								topicNum: data[i]['topicNum']
							})
						}
						let profList = []
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
				let profList = []
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
				this.setState({ duplicateReview: true, formDisabled: true, errorMessage: res.error })
				$("#errorModalreviewForm").modal("show");
			} else {
			}
		})

	}

	handleSemesterChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			this.setState(prevState =>(
				{
					semester: {				
						...prevState.semester,
						id: inputValue.id,
						semester: inputValue.semester,
						year: inputValue.year
					}
				}
			))
		}
	}

	handleLike = (type) => {
		switch (type) {
			case 'course':
				this.setState(prevState => ({
					courseRating: {
						...prevState.courseRating,
						approval: true
					}
				}))
				break
			case 'prof':
				this.setState(prevState => ({
					profRating: {
						...prevState.profRating,
						approval: true
					}
				}))
				break
			default:
				break
		}
	}

	handleDislike = (type) => {
		switch (type) {
			case 'course':
				this.setState(prevState => ({
					courseRating: {
						...prevState.courseRating,
						approval: false
					}
				}))
				break
			case 'prof':
				this.setState(prevState => ({
					profRating: {
						...prevState.profRating,
						approval: false
					}
				}))
				break
			default:
				break
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
							order: 0,
							course: {
								...prevState.course,
								id: res.courseId,
								dept: res.courseDept,
								num: res.courseNum,
								topicId: res.topicId,
								disabled: false
							},
							prof: {
								disabled: false
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
									let topicList = []
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
							order: 1,
							prof: {
								...prevState.prof,
								id: res.profId,
								firstName: res.firstName,
								lastName: res.lastName,
								disabled: false
							},
							course: {
								disabled: false
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
					order: 0,
					course: {
						...prevState.course,
						id: this.props.location.state.courseId,
						dept: this.props.location.state.courseDept,
						num: this.props.location.state.courseNum,
						topicId: this.props.location.state.topicId,
						disabled: false,
					},
					prof: {
						disabled: false
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
							let topicList = []
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
					order: 1, 
					prof: {
						...prevState.prof,
						id: this.props.location.state.profId,
						firstName: this.props.location.state.profFirst,
						lastName: this.props.location.state.profLast,
						disabled: false,
					},
					course: {
						disabled: false
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
				let semList = []
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
				let courseList = []
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
					let topicList = []
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
				<Error message={this.state.errorMessage} id="reviewForm" title="Error"/>
			</div>
		);
	}
}

export default withRouter(ReviewForm);