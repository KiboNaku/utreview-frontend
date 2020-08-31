import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'
import CourseReviewEntry from './CourseReviewEntry';
import ReportComment from './../../../report-comment/ReportComment'
import { reviewFeedback } from '../CourseFunctions'
import jwt_decode from 'jwt-decode'
import $ from './../../../../../node_modules/jquery'
import './CourseReviews.css'

const propTypes = {
    courseReviews: PropTypes.shape({
        // review id
        id: PropTypes.number.isRequired,

        // review's course comments
        comments: PropTypes.string,

        // review's course approval rating
        approval: PropTypes.bool.isRequired,

        // review's course difficulty rating
        difficulty: PropTypes.number.isRequired,

        // review's course usefulness rating
        usefulness: PropTypes.number.isRequired,

        // review's course workload rating
        workload: PropTypes.number.isRequired,

        // review author's major
		userMajor: PropTypes.string,
		
		// review author's profile pic file name
		profilePic: PropTypes.string.isRequired,
		
		// review's prof id
		profId: PropTypes.number.isRequired,
		
		// review's prof first name
		profFirst: PropTypes.string.isRequired,
		
		// review's prof last name
		profLast: PropTypes.string.isRequired,

		// grade the author achieved in the course
		grade: PropTypes.string,
		
		// how many likes the review's course comment received
		numLiked: PropTypes.number.isRequired,
		
		// how many dislikes the review's course comment received
        numDisliked: PropTypes.number.isRequired,

        // indicates whether the review was written by the current logged in user
        writtenByUser: PropTypes.bool.isRequired,

        // indicates whether the review was liked by the current logged in user
		likePressed: PropTypes.bool.isRequired,
		
		// indicates whether the review was disliked by the current logged in user
		dislikePressed: PropTypes.bool.isRequired,
		
		// time ago format of when the review was last updated
		dateString: PropTypes.string.isRequired,
		
		// Date object representing when the review was last updated
		date: PropTypes.instanceOf(Date),
		
		// year the review's author took the course
		year: PropTypes.number.isRequired,

		// semester season the review's author took the course
		semester: PropTypes.number.isRequired,

		// review's author first name
		firstName: PropTypes.string.isRequired,

		// review's author last name
		lastName: PropTypes.string.isRequired,

		// indicate whether the review's author wants to remain anonymous
		anonymous: PropTypes.bool.isRequired,
    }),
}

class CourseReviews extends React.Component {
	constructor(props) {
		super(props)

		// sort reviews by date updated by default
		const updatedReviews = props.courseReviews.slice().sort((a, b) => b.date - a.date)

		this.state = {
			// list of reviews for the course
			courseReviews: props.courseReviews,

			// list of filtered and sorted reviews for the course
			reviewsFiltered: updatedReviews,

			// indicates how the reviews will be sorted
			sortBy: "most-recent",

			// page number to determine whether to "show more" revviews
			page: 0,

			// indicates whether there are more reviews to be shown
			hasMore: true
		}

		this.buttonDOM = React.createRef()

		this.handleLike = this.handleLike.bind(this)
		this.handleDislike = this.handleDislike.bind(this)
		this.likeReview = this.likeReview.bind(this)
		this.dislikeReview = this.dislikeReview.bind(this)
		this.handleSortChange = this.handleSortChange.bind(this)
		this.handleReport = this.handleReport.bind(this)
		this.handlePageInc = this.handlePageInc.bind(this)
		this.loadReviews = this.loadReviews.bind(this)
	}

	loadReviews() {
		// triggered when the "show more" button is pressed
		// loads the next page of reviews, if any left
		if (this.buttonDOM != null) this.buttonDOM.current.blur();
		if (this.state.hasMore) {
			// increment the page number and determine whether there are more reviews to be shown
			this.handlePageInc()
			if (this.calcTableEdge(this.state.page, this.state.reviewsFiltered.length) >= this.state.reviewsFiltered.length) {
				this.setState({ hasMore: false })
			}
		}
	}

	calcTableEdge(page, length) {
		// calculate the index of the last review to be shown
		return Math.min(10 * (page + 1), length)
	}

	handlePageInc() {
		// increment the page number
		this.setState(
			prevState => ({
				page: prevState.page + 1
			})
		)
	}

	handleReport(id) {
		// displays the report comment modal
		this.setState({ reviewId: id })
		$(`#report-comment-modal-${id}`).modal("show");
	}

	likeReview(courseReview, id) {
		// determine previous like and dislike values
		let dislike = courseReview.dislikePressed
		let dislikeNum = courseReview.numDisliked
		let likeNum = courseReview.numLiked
		let like = courseReview.likePressed

		// determines the result like/dislike values of the review after the user presses the like button
		if (id === courseReview.id) {
			if (dislike) {
				dislike = false
				dislikeNum = dislikeNum - 1
				like = true
				likeNum = likeNum + 1
			} else {
				if (like) {
					like = false
					likeNum = likeNum - 1
				} else {
					like = true
					likeNum = likeNum + 1
				}
			}
		}

		return {
			...courseReview,
			numLiked: likeNum,
			numDisliked: dislikeNum,
			likePressed: like,
			dislikePressed: dislike,
			date: courseReview.date
		}
	}

	dislikeReview(courseReview, id) {
		// determine previous like and dislike values
		let dislike = courseReview.dislikePressed
		let dislikeNum = courseReview.numDisliked
		let likeNum = courseReview.numLiked
		let like = courseReview.likePressed

		// determines the result like/dislike values of the review after the user presses the dislike button
		if (id === courseReview.id) {
			if (like) {
				like = false
				likeNum = likeNum - 1
				dislike = true
				dislikeNum = dislikeNum + 1
			} else {
				if (dislike) {
					dislike = false
					dislikeNum = dislikeNum - 1
				} else {
					dislike = true
					dislikeNum = dislikeNum + 1
				}
			}
		}

		return {
			...courseReview,
			numLiked: likeNum,
			numDisliked: dislikeNum,
			likePressed: like,
			dislikePressed: dislike,
			date: courseReview.date
		}
	}

	handleLike(id) {
		// check if user is logged in, if not show the login modal
		const token = localStorage.usertoken
		if(token === null || token === undefined){
			$("#login-modal").modal("show")
			return
		}

		// if user is logged in, grab the user access token
		const decoded = jwt_decode(token)

		// generate feedback object to send to the backend
		let feedback = {
			like: true,
			isCourse: true,
			userEmail: decoded.identity.email,
			reviewId: id
		}

		// update both courseReviews and reviewsFiltered with the new like/dislike values for the specified review
		this.setState(prevState => {
			const updatedReviews = prevState.courseReviews.map(courseReview => {
				return this.likeReview(courseReview, id)
			})
			const reviewsFiltered = prevState.reviewsFiltered.map(courseReview => {
				return this.likeReview(courseReview, id)
			})
			return {
				...prevState,
				courseReviews: updatedReviews,
				reviewsFiltered: reviewsFiltered
			}
		})

		// send feedback information to the backend
		reviewFeedback(feedback).then(res => {
			if (res.error) {
				alert(res.error)
			}
		})
	}

	handleDislike(id) {
		// check if user is logged in, if not show the login modal
		const token = localStorage.usertoken
		if(token === null || token === undefined){
			$("#login-modal").modal("show")
			return
		}

		// if user is logged in, grab the user access token
		const decoded = jwt_decode(token)

		// generate feedback object to send to the backend
		let feedback = {
			like: false,
			isCourse: true,
			userEmail: decoded.identity.email,
			reviewId: id
		}

		// update both courseReviews and reviewsFiltered with the new like/dislike values for the specified review
		this.setState(prevState => {
			const updatedReviews = prevState.courseReviews.map(courseReview => {
				return this.dislikeReview(courseReview, id)
			})
			const reviewsFiltered = prevState.reviewsFiltered.map(courseReview => {
				return this.dislikeReview(courseReview, id)
			})
			return {
				...prevState,
				courseReviews: updatedReviews,
				reviewsFiltered: reviewsFiltered
			}
		})

		// send feedback information to the backend
		reviewFeedback(feedback).then(res => {
			if (res.error) {
				alert(res.error)
			}
		})
	}

	handleSortChange(value) {

		// calculate whether there are more reviews to be shown
		let hasMore = true
		if (this.calcTableEdge(0, this.state.reviewsFiltered.length) >= this.state.reviewsFiltered.length) {
			hasMore = false
		}

		// depending on sortBy value, sort reviewsFiltered by most recent or most helpful
		if (value.value === "most-recent") {
			const updatedReviews = this.state.reviewsFiltered.slice().sort((a, b) => (b.date - a.date))
			this.setState({ reviewsFiltered: updatedReviews, sortBy: value.value, page: 0, hasMore: hasMore })
		} else if (value.value === "most-helpful") {
			const updatedReviews = this.state.reviewsFiltered.slice().sort((a, b) => {
				if (b.numLiked === a.numLiked) {
					if (b.numDisliked === a.numDisliked) {
						return b.date - a.date
					}
					return a.numDisliked - b.numDisliked
				}
				return b.numLiked - a.numLiked
			})
			this.setState({ reviewsFiltered: updatedReviews, sortBy: value.value, page: 0, hasMore: hasMore })
		}
	}

	handleProfChange(values) {

		// initialize updateReviews list
		let updatedReviews = []

		// if no profs selected, add all the reviews
		if (values.length === 0) {
			updatedReviews = this.state.courseReviews
		} else {
			// add profs selected by the user
			let profs = []
			for (let i = 0; i < values.length; i++) {
				profs.push(values[i])
			}

			// only add the review if the prof name matches one of profs in the list
			this.state.courseReviews.map(review => {
				let profName = review.profFirst + " " + review.profLast
				if (profs.includes(profName)) {
					updatedReviews.push(review)
				}
			})
		}

		// calculate whether there are more reviews to be shown
		let hasMore = true
		if (this.calcTableEdge(0, updatedReviews.length) >= updatedReviews.length) {
			hasMore = false
		}

		// depending on sortBy value, sort reviewsFiltered by most recent or most helpful
		if (this.state.sortBy === "most-recent") {
			updatedReviews = updatedReviews.slice().sort((a, b) => b.date - a.date)
			this.setState({ reviewsFiltered: updatedReviews, sortBy: "most-recent", page: 0, hasMore: hasMore })
		} else if (this.state.sortBy === "most-helpful") {
			updatedReviews = updatedReviews.slice().sort((a, b) => b.numLiked - a.numLiked)
			this.setState({ reviewsFiltered: updatedReviews, sortBy: "most-helpful", page: 0, hasMore: hasMore })
		}
	}

	render() {

		// generate list of CourseReviewEntry components depending on the page number, filters, and sortBy
		const courseReviewList = this.state.reviewsFiltered.slice(0, this.calcTableEdge(this.state.page, this.state.reviewsFiltered.length)).map(review => {
			return (
				<div>
					<CourseReviewEntry
						review={review}
						handleLike={this.handleLike}
						handleDislike={this.handleDislike}
						handleReport={this.handleReport}
					/>
				</div>
			)
		})

		// generate a ReportComment component for each review
		const reportCommentList = this.state.courseReviews.map(review => {
			return (
				<ReportComment reviewId={review.id} isCourse={true} />
			)
		})

		// initialize profOptions with all the possible profs from the reviews
		const profs = []
		const profOptions = []
		for (let i = 0; i < this.state.courseReviews.length; i++) {
			let profString = this.state.courseReviews[i].profFirst + " " + this.state.courseReviews[i].profLast
			if (profs.includes(profString)) {
				continue
			}
			profs.push(profString)

			let obj = {
				value: profString,
				label: profString
			}
			profOptions.push(obj)
		}

		// generate component to be rendered when there are no reviews
		let noReviews = (
			<h5> No reviews yet for this course </h5>
		)
		
		// generate list of course reviews component
		let reviews = (
			<div className="list-group review-list">
				{courseReviewList}
			</div>
		)
		
		// generate list of sortBy options
		let sortOptions = [
			{
				value: "most-recent",
				label: "Most Recent"
			},
			{
				value: "most-helpful",
				label: "Most Helpful"
			}
		]

		// generate select for the sortBy options
		let sort = (
			<div className="review-sort">
				<label className="float-left font-weight-bold">Sort by: </label>
				<Select
					className="basic-multi-select my-3 clear-both"
					classNamePrefix="select"
					name="review-sort"
					options={sortOptions}
					onChange={this.handleSortChange}
					value={sortOptions.filter(val => {
						for (let i = 0; i < sortOptions.length; i++) {
							if (val.value === this.state.sortBy) return true;
						}
						return false
					})}
					autosize={true}
				/>
			</div>
		)
		
		// generate select for the prof options
		let profFilter = (
			<div className="review-sort">
				<label className="float-left font-weight-bold">Filter by professor: </label>
				<Select
					// add deptList, handleDeptChange
					className="basic-multi-select my-3 clear-both"
					classNamePrefix="select"
					name="review-sort"
					placeholder="All Professors"
					options={profOptions}
					onChange={(objs) => {
						let values = [];

						if (objs != null) {
							for (let i = 0; i < objs.length; i++) {
								values[i] = objs[i].value
							}
						}

						this.handleProfChange(values)
					}}
					isClearable={true}
					isSearchable={true}
					isMulti
				/>
			</div>
		)
		
		// calculate whether there are more reviews to be shown
		let hasMore = this.state.hasMore
		if (this.calcTableEdge(this.state.page, this.state.reviewsFiltered.length) >= this.state.reviewsFiltered.length) {
			hasMore = false
		}

		return (
			<div>
				<div className="course-card" style={{backgroundColor: "white"}}>
					<div className="card-header course-header" >
						<h4 className="details-header"> Reviews ({this.state.reviewsFiltered.length}) </h4>
					</div>
					<div className="card-body">
						<div className="review-filters">
							{sort}
							{profFilter}
						</div>
						{this.state.courseReviews.length > 0 ? reviews : noReviews}
						{hasMore &&
							<div className="d-flex justify-content-center">
								<button onClick={this.loadReviews} className="btn btn-block btn-more-reviews btn-more-results "
									ref={this.buttonDOM}>
									More reviews
							</button>
							</div>
						}
					</div>
				</div>
				{reportCommentList}
			</div>
		)
	}
}

CourseReviews.propTypes = propTypes

export default CourseReviews;