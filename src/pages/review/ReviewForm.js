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
			courseList: [],
			topicList: [],
			semesterList: [
				{ value: 'Spring', label: 'Spring' },
				{ value: 'Summer', label: 'Summer' },
				{ value: 'Fall', label: 'Fall' },
			],
			yearList: [
				{ value: 2020, label: 2020 },
				{ value: 2019, label: 2019 },
				{ value: 2018, label: 2018 },
				{ value: 2017, label: 2017 },
				{ value: 2016, label: 2016 },
				{ value: 2015, label: 2015 },
				{ value: 2014, label: 2014 },
				{ value: 2013, label: 2013 },
				{ value: 2012, label: 2012 },
				{ value: 2011, label: 2011 },
				{ value: 2010, label: 2010 },
			],
			profList: [],

			reviewId: null,
			order: 0,

			semester: {
				semester: "",
				year: null,
				loaded: false,
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
		console.log(isValid)
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
				semester: this.state.semester.semester,
				year: this.state.semester.year,
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
		console.log('handle course change')

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
				this.checkReviewComplete(inputValue.id, this.state.prof.id, this.state.semester.semester, this.state.semester.year, null, topicSelected)
			} else {
				console.log(this.state.prof.id)
				let topicInfo = {
					topicId: inputValue.topicId,
					profId: this.state.prof.id
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
						this.setState(prevState => ({
							topicList: topicList,
							topic: {
								...prevState.topic,
								loaded: true,
							},
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
					topicId: inputValue.topicId
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
					topicId: null
				},
				topic: {
					...prevState.topic,
					id: null,
					selected: false,
				},
				formDisabled: true
			}))
		}
	}

	handleTopicChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			this.setState(prevState => ({
				topic: {
					...prevState.topic,
					id: inputValue.id
				}
			}))
			this.checkReviewComplete(this.state.course.id, this.state.prof.id, this.state.semester.semester, this.state.semester.year, inputValue.id, this.state.topic.selected)
		} else {
			this.setState(prevState => ({
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
			}))
			this.checkReviewComplete(this.state.course.id, inputValue.id, this.state.semester.semester, this.state.semester.year, this.state.topic.id, this.state.topic.selected)

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
				this.setState({formDisabled: false})
			}
		})

	}

	handleSemesterChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			this.setState(prevState => (
				{
					semester: {
						...prevState.semester,
						semester: inputValue.value,
					}
				}
			))
			this.checkReviewComplete(this.state.course.id, this.state.prof.id, inputValue.value, this.state.semester.year, this.state.topic.id, this.state.topic.selected)
		}else{
			this.setState(prevState => (
				{
					semester: {
						...prevState.semester,
						semester: ''
					},
					formDisabled: true
				}
			))
		}
	}

	handleYearChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			this.setState(prevState => (
				{
					semester: {
						...prevState.semester,
						year: inputValue.value,
					}
				}
			))

			this.checkReviewComplete(this.state.course.id, this.state.prof.id, this.state.semester.semester, inputValue.value, this.state.topic.id, this.state.topic.selected)
		}else{
			this.setState(prevState => (
				{
					semester: {
						...prevState.semester,
						year: null
					},
					formDisabled: true
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
		if (this.state.oldReview !== null) {
			return
		}
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
						let courseList = []
						courseList.push({
							value: res.courseDept + " " + res.courseNum,
							label: res.courseDept + " " + res.courseNum,
							id: res.courseId,
							topicId: res.topicId,
							courseDept: res.courseDept,
							courseNum: res.courseNum,
							topicNum: res.topicNum
						})
						this.setState(prevState => ({
							order: 0,
							courseList: courseList,
							course: {
								...prevState.course,
								id: res.courseId,
								dept: res.courseDept,
								num: res.courseNum,
								topicId: res.topicId,
								loaded: true,
							}
						}))
						let courseId = res.courseId
						if (res.topicNum !== -1) {
							courseId = res.parentId
							let topicList = []
							topicList.push({
								value: res.courseTitle,
								label: res.courseTitle,
								id: res.courseId,
								topicTitle: res.courseTitle,
								topicNum: res.topicNum
							})
							this.setState(prevState => ({
								topicList: topicList,
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
						}

						const course = {
							courseId: courseId
						}

						getProfs(course).then(res => {
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

								this.setState(prevState => ({
									profList: profList,
									prof: {
										...prevState.prof,
										loaded: true,
									},
								}))

							}
						})
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
						let profList = []
						profList.push({
							value: res.firstName + " " + res.lastName,
							label: res.firstName + " " + res.lastName,
							id: res.profId,
							firstName: res.firstName,
							lastName: res.lastName
						})
						this.setState(prevState => ({
							order: 1,
							profList: profList,
							prof: {
								...prevState.prof,
								id: res.profId,
								firstName: res.firstName,
								lastName: res.lastName,
								loaded: true,
							}
						}))

						const prof = {
							profId: res.profId
						}

						getCourses(prof).then(res => {
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
										loaded: true,
									},
								}))

							}
						})
					}
				})
			} else {
				this.setState({ invalidReview: true })
			}
		} else {

			console.log("did not mount undefined")
			if (this.props.location.state.courseId !== undefined) {
				let courseList = []
				courseList.push({
					value: this.props.location.state.courseDept + " " + this.props.location.state.courseNum,
					label: this.props.location.state.courseDept + " " + this.props.location.state.courseNum,
					id: this.props.location.state.courseId,
					topicId: this.props.location.state.topicId,
					courseDept: this.props.location.state.courseDept,
					courseNum: this.props.location.state.courseNum,
					topicNum: this.props.location.state.topicNum,
				})
				this.setState(prevState => ({
					order: 0,
					courseList: courseList,
					course: {
						...prevState.course,
						id: this.props.location.state.courseId,
						dept: this.props.location.state.courseDept,
						num: this.props.location.state.courseNum,
						topicId: this.props.location.state.topicId,
						loaded: true,
					},
				}))
				let courseId = this.props.location.state.courseId
				if (this.props.location.state.topicId !== null) {
					courseId = this.props.location.state.parentId
					let topicList = []
					topicList.push({
						value: this.props.location.state.courseTitle,
						label: this.props.location.state.courseTitle,
						id: this.props.location.state.courseId,
						topicTitle: this.props.location.state.courseTitle,
						topicNum: this.props.location.state.topicNum
					})
					this.setState(prevState => ({
						topicList: topicList,
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
				}

				const course = {
					courseId: courseId
				}

				getProfs(course).then(res => {
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

						this.setState(prevState => ({
							profList: profList,
							prof: {
								...prevState.prof,
								loaded: true,
							},
						}))

					}
				})
			} else if (this.props.location.state.profId !== undefined) {
				let profList = []
				profList.push({
					value: this.props.location.state.profFirst + " " + this.props.location.state.profLast,
					label: this.props.location.state.profFirst + " " + this.props.location.state.profLast,
					id: this.props.location.state.profId,
					firstName: this.props.location.state.profFirst,
					lastName: this.props.location.state.profLast
				})
				this.setState(prevState => ({
					order: 1,
					profList: profList,
					prof: {
						...prevState.prof,
						id: this.props.location.state.profId,
						firstName: this.props.location.state.profFirst,
						lastName: this.props.location.state.profLast,
						loaded: true,
					}
				}))
				const prof = {
					profId: this.props.location.state.profId
				}

				getCourses(prof).then(res => {
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
								loaded: true,
							},
						}))

					}
				})
			} else {
				if (this.props.location.state.review === undefined) {
					this.setState({ invalidReview: true })
				}
			}
		}

		console.log(this.state)
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
			let topicList = []
			topicList.push({
				value: oldReview.course.title,
				label: oldReview.course.title,
				id: oldReview.course.id,
				topicTitle: oldReview.course.title,
				topicNum: oldReview.course.topicNum
			})
			this.setState({ topicsList: topicList })
		}

		let profList = []
		profList.push({
			value: oldReview.prof.firstName + " " + oldReview.prof.lastName,
			label: oldReview.prof.firstName + " " + oldReview.prof.lastName,
			id: oldReview.prof.id,
			firstName: oldReview.prof.firstName,
			lastName: oldReview.prof.lastName
		})
		let courseList = []
		courseList.push({
			value: oldReview.course.dept.abr + " " + oldReview.course.num,
			label: oldReview.course.dept.abr + " " + oldReview.course.num,
			id: courseId,
			topicId: oldReview.course.topicId,
			courseDept: oldReview.course.dept.abr,
			courseNum: oldReview.course.num,
			topicNum: oldReview.course.topicNum,
		})

		this.setState(prevState => ({
			reviewId: oldReview.id,
			profList: profList,
			courseList: courseList,
			semester: {
				...prevState.semester,
				semester: oldReview.semester.semester,
				year: oldReview.semester.year
			},
			course: {
				...prevState.course,
				id: courseId,
				dept: oldReview.course.dept.abr,
				num: oldReview.course.num,
				topicId: oldReview.course.topicId,
				loaded: true
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
				loaded: true,
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

	checkReviewComplete = (courseId, profId, semester, year, topicId, topicSelected) => {
		const token = localStorage.usertoken
		const decoded = jwt_decode(token)
		const email = decoded.identity.email

		if(courseId !== null && profId !== null && 
			semester !== "" && year !== null){
			if(topicSelected){
				if(topicId !== null){
					const review = {
						course_id: topicId,
						prof_id: profId,
						semester: semester,
						year: year,
						user_email: email
					}
					this.checkDuplicate(review)
				}
			}else{
				const review = {
					course_id: courseId,
					prof_id: profId,
					semester: semester,
					year: year,
					user_email: email
				}
				this.checkDuplicate(review)
			}
		}
	}

	render() {
		if (this.state.oldReview !== null && this.state.course.dept === "") {
			this.setOldReviewData()
		}

		let invalidReview = <h1>
			This review link is invalid
		</h1>

		let loaded = this.state.course.loaded && this.state.prof.loaded

		let loading = <Loading />
		console.log(this.state)

		let content = <ReviewFormComponent
			key={this.state.courseList}
			handleSubmit={this.handleSubmit}
			handleChange={this.handleChange}
			handleCourseChange={this.handleCourseChange}
			handleProfessorChange={this.handleProfessorChange}
			handleSemesterChange={this.handleSemesterChange}
			handleYearChange={this.handleYearChange}
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
				<Error message={this.state.errorMessage} id="reviewForm" title="Error" />
			</div>
		);
	}
}

export default withRouter(ReviewForm);