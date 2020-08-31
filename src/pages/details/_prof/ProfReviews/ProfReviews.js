import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'
import ProfReviewEntry from './ProfReviewEntry';
import ReportComment from './../../../report-comment/ReportComment'
import { reviewFeedback } from '../ProfFunctions'
import jwt_decode from 'jwt-decode'
import $ from './../../../../../node_modules/jquery'
import './ProfReviews.css'

const propTypes = {
	// id of the prof
	id: PropTypes.number.isRequired,

	// the review's prof comments
	comments: PropTypes.string,

	// true or false depending on whether if the author liked or disliked the prof
	approval: PropTypes.bool.isRequired,

    // average rating for the clearness for the prof
    clear: PropTypes.number.isRequired,

    // average rating for the engagingness of the prof
	engaging: PropTypes.number.isRequired,

	// average rating for the grading of the prof
    grading: PropTypes.number.isRequired,
    
    // the major of the author or "" if the author doesn't have a major
	userMajor: PropTypes.string,

	// the profile picture file name of the author
	profilePic: PropTypes.string.isRequired,

	// the id of the course
	courseId: PropTypes.string.isRequired,

	// the department that the course taught by the prof is in
    courseDept: PropTypes.string.isRequired,

    // the course number
    courseNum: PropTypes.string.isRequired,

    // the course topic number
	courseTopic: PropTypes.number,
	
	// the grade the author achieved in the course
	grade: PropTypes.string,

	// the number of likes the comment has
	numLiked: PropTypes.number.isRequired,

	// the number of dislikes the comment has
	numDisliked: PropTypes.number.isRequired,

	// true or false depending on whether if the the review was written by the logged-in user
	writtenByUser: PropTypes.bool.isRequired,

	// true or false depending on whether if the like was pressed by the logged-in user
	likePressed: PropTypes.bool.isRequired,

	// true or false depending on whether if the dislike was pressed by the logged-in user
	dislikePressed: PropTypes.bool.isRequired,

	// the "time-ago" format the review was last updated
	dateString: PropTypes.string.isRequired,

	// the date the review was last updated
	date: PropTypes.instanceOf(Date).isRequired,

	// the year the author had the prof
	year: PropTypes.number.isRequired,

	// the semester the author had the prof
	semester: PropTypes.string.isRequired,

	// first name of the author
	firstName: PropTypes.string.isRequired,

	// last name of the author
	lastName: PropTypes.string.isRequired,

	// true or false depending on whether the author decided to keep their review anonymous or not
    anonymous: PropTypes.bool.isRequired
}

class ProfReviews extends React.Component {
	constructor(props) {
		super(props)

		// sort the reviews by date updated by default
		const updatedReviews = props.profReviews.slice().sort((a, b) => b.date - a.date)

		this.state = {
			// list of reviews for the prof
			profReviews: props.profReviews,

			// list of filtered and sorted reviews for the prof
			reviewsFiltered: updatedReviews,

			// indicate how the reviews will be sorted
			sortBy: "most-recent",

			// page number to determine whether to "show more" reviews
			page: 0,

			// indicates whether if there are more reviews to be shown
			hasMore: true,
		}

		this.buttonDOM = React.createRef()

		this.handleLike = this.handleLike.bind(this)
		this.handleDislike = this.handleDislike.bind(this)
		this.likeReview = this.likeReview.bind(this)
		this.dislikeReview = this.dislikeReview.bind(this)
		this.handleSortChange = this.handleSortChange.bind(this)
		this.handleCourseChange = this.handleCourseChange.bind(this)
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

	likeReview(profReview, id) {
		// determine previous like and dislike values
		let dislike = profReview.dislikePressed
		let dislikeNum = profReview.numDisliked
		let likeNum = profReview.numLiked
		let like = profReview.likePressed

		// determines the result likes/dislikes of the review after the user presses the like button
		if (id === profReview.id) {
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
			...profReview,
			numLiked: likeNum,
			numDisliked: dislikeNum,
			likePressed: like,
			dislikePressed: dislike,
			date: profReview.date
		}
	}

	dislikeReview(profReview, id) {
		// determine previous like and dislike values
		let dislike = profReview.dislikePressed
		let dislikeNum = profReview.numDisliked
		let likeNum = profReview.numLiked
		let like = profReview.likePressed

		// determines the result likes/dislikes of the review after the user presses the dislike button
		if (id === profReview.id) {
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
			...profReview,
			numLiked: likeNum,
			numDisliked: dislikeNum,
			likePressed: like,
			dislikePressed: dislike,
			date: profReview.date
		}
	}

	handleLike(id) {
		// check if the user is logged in, if not show the login modal
		const token = localStorage.usertoken
		if(token === null || token === undefined){
			$("#login-modal").modal("show")
			return
		}

		// if the user is logged in, grab the user access token
		const decoded = jwt_decode(token)

		// generate feedback object to send to the backend
		let feedback = {
			like: true,
			isCourse: false,
			userEmail: decoded.identity.email,
			reviewId: id
		}

		this.setState(prevState => {
			// update both profReviews and reviewsFiltered with the new like/dislike values for the specified review
			const updatedReviews = prevState.profReviews.map(profReview => {
				return this.likeReview(profReview, id)
			})
			const reviewsFiltered = prevState.reviewsFiltered.map(profReview => {
				return this.likeReview(profReview, id)
			})
			return {
				...prevState,
				profReviews: updatedReviews,
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
		// check if the user is logged in, if not show the login modal
		const token = localStorage.usertoken
		if(token === null || token === undefined){
			$("#login-modal").modal("show")
			return
		}

		// if the user is logged in, grab the user access token
		const decoded = jwt_decode(token)

		// generate feedback object to send to the backend
		let feedback = {
			like: false,
			isCourse: false,
			userEmail: decoded.identity.email,
			reviewId: id
		}

		this.setState(prevState => {
			// update both profReviews and reviewsFiltered with the new like/dislike values for the specified review
			const updatedReviews = prevState.profReviews.map(profReview => {
				return this.dislikeReview(profReview, id)
			})
			const reviewsFiltered = prevState.reviewsFiltered.map(profReview => {
				return this.dislikeReview(profReview, id)
			})
			return {
				...prevState,
				profReviews: updatedReviews,
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

		// calculates whether there are more reviews to be shown
		let hasMore = true
		if (this.calcTableEdge(0, this.state.reviewsFiltered.length) >= this.state.reviewsFiltered.length) {
			hasMore = false
		}

		// depending on sortBy value, sort reviewsFiltered by the most recent or most helpful
		if (value.value === "most-recent") {
			const updatedReviews = this.state.reviewsFiltered.slice().sort((a, b) => b.date - a.date)
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

	handleCourseChange(values) {

		// initialize updateReviews list
		let updatedReviews = []

		// if no course selected, add all the reviews
		if (values.length === 0) {
			updatedReviews = this.state.profReviews
		} else {
			// add courses selected by the user
			let courses = []
			for (let i = 0; i < values.length; i++) {
				courses.push(values[i])
			}

			// only add the review if the course name matches one of the courses in the list
			this.state.profReviews.map(review => {
				let courseName = review.courseDept + " " + review.courseNum
				if (courses.includes(courseName)) {
					updatedReviews.push(review)
				}
			})
		}

		// calculate whether there are more reviews to be shown
		let hasMore = true
		if (this.calcTableEdge(0, updatedReviews.length) >= updatedReviews.length) {
			hasMore = false
		}

		// depending on sortBy value, sort reviewsFiltered by the most recent or most helpful
		if (this.state.sortBy === "most-recent") {
			updatedReviews = updatedReviews.slice().sort((a, b) => b.date - a.date)
			this.setState({ reviewsFiltered: updatedReviews, sortBy: "most-recent", page: 0, hasMore: hasMore })
		} else if (this.state.sortBy === "most-helpful") {
			updatedReviews = updatedReviews.slice().sort((a, b) => b.numLiked - a.numLiked)
			this.setState({ reviewsFiltered: updatedReviews, sortBy: "most-helpful", page: 0, hasMore: hasMore })
		}
	}

	render() {

		// generate list of ProfReviewEntry components depending on the page number, filters, and sortBy
		const profReviewList = this.state.reviewsFiltered.slice(0, this.calcTableEdge(this.state.page, this.state.reviewsFiltered.length)).map(review => {
			return (
				<div>
					<ProfReviewEntry
						review={review}
						handleLike={this.handleLike}
						handleDislike={this.handleDislike}
						handleReport={this.handleReport}
					/>
				</div>
			)
		})

		// generate a ReportComment component for each review
		const reportCommentList = this.state.profReviews.map(review => {
			return (
				<ReportComment reviewId={review.id} isCourse={false} />
			)
		})

		// initializes courseOptions with all the possible courses from the reviews
		const courses = []
		const courseOptions = []
		for (let i = 0; i < this.state.profReviews.length; i++) {
			let courseString = this.state.profReviews[i].courseDept + " " + this.state.profReviews[i].courseNum
			if (courses.includes(courseString)) {
				continue
			}
			courses.push(courseString)

			let obj = {
				value: courseString,
				label: courseString
			}
			courseOptions.push(obj)
		}

		// generate component to be rendered when there are no reviews
		let noReviews = (
			<h5> No reviews yet for this professor </h5>
		)

		// generate list of prof reviews component
		let reviews = (
			<div className="list-group review-list">
				{profReviewList}
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

		// generate select for the course options
		let courseFilter = (
			<div className="review-sort">
				<label className="float-left font-weight-bold">Filter by course: </label>
				<Select
					// add deptList, handleDeptChange
					className="basic-multi-select my-3 clear-both"
					classNamePrefix="select"
					name="review-sort"
					options={courseOptions}
					onChange={(objs) => {
						let values = [];

						if (objs != null) {
							for (let i = 0; i < objs.length; i++) {
								values[i] = objs[i].value
							}
						}

						this.handleCourseChange(values)
					}}
					placeholder="All Courses"
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
			<div className="prof-card-wrapper">
				<div className="course-card">
						<div className="card-header course-header" >
							<h4 className="details-header"> Reviews ({this.state.reviewsFiltered.length}) </h4>
						</div>
						<div className="card-body">
							<div className="review-filters">
								{sort}
								{courseFilter}
							</div>
							{this.state.profReviews.length > 0 ? reviews : noReviews}
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

ProfReviews.props = propTypes;

export default ProfReviews;