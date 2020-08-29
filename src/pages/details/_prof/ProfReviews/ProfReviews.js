import React from 'react';
import Select from 'react-select'
import ProfReviewEntry from './ProfReviewEntry';
import ReportComment from './../../../report-comment/ReportComment'
import { reviewFeedback } from '../ProfFunctions'
import jwt_decode from 'jwt-decode'
import $ from './../../../../../node_modules/jquery'
import './ProfReviews.css'

class ProfReviews extends React.Component {
	constructor(props) {
		super(props)

		const updatedReviews = props.profReviews.slice().sort((a, b) => b.date - a.date)

		this.state = {
			profReviews: props.profReviews,
			reviewsFiltered: updatedReviews,
			sortBy: "most-recent",
			page: 0,
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
		if (this.buttonDOM != null) this.buttonDOM.current.blur();
		if (this.state.hasMore) {
			this.handlePageInc()
			if (this.calcTableEdge(this.state.page, this.state.reviewsFiltered.length) >= this.state.reviewsFiltered.length) {
				this.setState({ hasMore: false })
			}
		}
	}

	calcTableEdge(page, length) {
		return Math.min(10 * (page + 1), length)
	}

	handlePageInc() {
		this.setState(
			prevState => ({
				page: prevState.page + 1
			})
		)
	}

	handleReport(id) {
		this.setState({ reviewId: id })
		$(`#report-comment-modal-${id}`).modal("show");
	}

	likeReview(profReview, id) {
		let dislike = profReview.dislikePressed
		let dislikeNum = profReview.numDisliked
		let likeNum = profReview.numLiked
		let like = profReview.likePressed

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
		let dislike = profReview.dislikePressed
		let dislikeNum = profReview.numDisliked
		let likeNum = profReview.numLiked
		let like = profReview.likePressed

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
		const token = localStorage.usertoken
		if(token === null || token === undefined){
			$("#login-modal").modal("show")
			return
		}
		const decoded = jwt_decode(token)

		let feedback = {
			like: true,
			isCourse: false,
			userEmail: decoded.identity.email,
			reviewId: id
		}

		this.setState(prevState => {
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

		reviewFeedback(feedback).then(res => {
			if (res.error) {
				alert(res.error)
			}
		})
	}

	handleDislike(id) {

		const token = localStorage.usertoken
		if(token === null || token === undefined){
			$("#login-modal").modal("show")
			return
		}
		const decoded = jwt_decode(token)

		let feedback = {
			like: false,
			isCourse: false,
			userEmail: decoded.identity.email,
			reviewId: id
		}

		this.setState(prevState => {
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

		reviewFeedback(feedback).then(res => {
			if (res.error) {
				alert(res.error)
			}
		})
	}

	handleSortChange(value) {

		let hasMore = true
		if (this.calcTableEdge(0, this.state.reviewsFiltered.length) >= this.state.reviewsFiltered.length) {
			hasMore = false
		}

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

		let updatedReviews = []
		if (values.length === 0) {
			updatedReviews = this.state.profReviews
		} else {
			let courses = []
			for (let i = 0; i < values.length; i++) {
				courses.push(values[i])
			}
			this.state.profReviews.map(review => {
				let courseName = review.courseDept + " " + review.courseNum
				if (courses.includes(courseName)) {
					updatedReviews.push(review)
				}
			})
		}

		let hasMore = true
		if (this.calcTableEdge(0, updatedReviews.length) >= updatedReviews.length) {
			hasMore = false
		}

		if (this.state.sortBy === "most-recent") {
			updatedReviews = updatedReviews.slice().sort((a, b) => b.date - a.date)
			this.setState({ reviewsFiltered: updatedReviews, sortBy: "most-recent", page: 0, hasMore: hasMore })
		} else if (this.state.sortBy === "most-helpful") {
			updatedReviews = updatedReviews.slice().sort((a, b) => b.numLiked - a.numLiked)
			this.setState({ reviewsFiltered: updatedReviews, sortBy: "most-helpful", page: 0, hasMore: hasMore })
		}
	}

	render() {
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

		const reportCommentList = this.state.profReviews.map(review => {
			return (
				<ReportComment reviewId={review.id} isCourse={false} />
			)
		})

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

		let noReviews = (
			<h5> No reviews yet for this professor </h5>
		)

		let reviews = (
			<div className="list-group review-list">
				{profReviewList}
			</div>
		)

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

		let sort = (
			<div className="review-sort">
				<label className="float-left font-weight-bold">Sort by: </label>
				<Select
					// add deptList, handleDeptChange
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

		let hasMore = this.state.hasMore
		if (this.calcTableEdge(this.state.page, this.state.reviewsFiltered.length) >= this.state.reviewsFiltered.length) {
			hasMore = false
		}

		return (
			<div>
				<div className="profReviews">
					<div className="card prof-card">
						<div className="card-header prof-header" >
							<h4> Reviews ({this.state.reviewsFiltered.length}) </h4>
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
				</div>
				{reportCommentList}
			</div>
		)
	}
}

export default ProfReviews;