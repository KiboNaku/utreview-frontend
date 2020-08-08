import React from 'react';
import Select from 'react-select'
import CourseReviewEntry from './CourseReviewEntry';
import ReportComment from './../../../report-comment/ReportComment'
import { reviewFeedback } from '../CourseFunctions'
import jwt_decode from 'jwt-decode'
import $ from './../../../../../node_modules/jquery'
import './CourseReviews.css'

class CourseReviews extends React.Component {
	constructor(props) {
		super(props)

		const updatedReviews = props.courseReviews.slice().sort((a, b) => b.date - a.date)
		
		this.state = {
			courseReviews: props.courseReviews,
			reviewsFiltered: updatedReviews,
			sortBy: "most-recent",
			page: 0,
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
        if (this.buttonDOM != null) this.buttonDOM.current.blur();
        if (this.state.hasMore) {
            this.handlePageInc()
            if (this.calcTableEdge(this.state.page, this.state.reviewsFiltered.length) >= this.state.reviewsFiltered.length){
				this.setState({hasMore: false})
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

	handleReport(id){
		this.setState({reviewId: id})
		$(`#report-comment-modal-${id}`).modal("show");
	}

	likeReview(courseReview, id){
		let dislike = courseReview.dislikePressed
		let dislikeNum = courseReview.numDisliked
		let likeNum = courseReview.numLiked
		let like = courseReview.likePressed

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

	dislikeReview(courseReview, id){
		let dislike = courseReview.dislikePressed
		let dislikeNum = courseReview.numDisliked
		let likeNum = courseReview.numLiked
		let like = courseReview.likePressed

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
		const token = localStorage.usertoken
		const decoded = jwt_decode(token)

		let feedback = {
			like: true,
			isCourse: true,
			userEmail: decoded.identity.email,
			reviewId: id
		}

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

		reviewFeedback(feedback).then(res => {
			if (res.error) {
				alert(res.error)
			}
		})
	}

	handleDislike(id) {

		const token = localStorage.usertoken
		const decoded = jwt_decode(token)

		let feedback = {
			like: false,
			isCourse: true,
			userEmail: decoded.identity.email,
			reviewId: id
		}
		this.setState(prevState => {
			const updatedReviews = prevState.courseReviews.map(courseReview => {
				return this.dislikeReview(courseReview, id)
			})
			const reviewsFiltered = prevState.courseReviews.map(courseReview => {
				return this.dislikeReview(courseReview, id)
			})
			return {
				...prevState,
				courseReviews: updatedReviews,
				reviewsFiltered: reviewsFiltered
			}
		})

		reviewFeedback(feedback).then(res => {
			if (res.error) {
				alert(res.error)
			}
		})
	}

	handleSortChange(value){
		let hasMore = true
		if (this.calcTableEdge(0, this.state.reviewsFiltered.length) >= this.state.reviewsFiltered.length){
			hasMore = false
		}

		if(value.value === "most-recent"){
			const updatedReviews = this.state.reviewsFiltered.slice().sort((a, b) => b.date - a.date)
			this.setState({reviewsFiltered: updatedReviews, sortBy: value.value, page: 0, hasMore: hasMore})
		}else if(value.value === "most-helpful"){
			const updatedReviews = this.state.reviewsFiltered.slice().sort((a, b) => b.numLiked - a.numLiked)
			this.setState({reviewsFiltered: updatedReviews, sortBy: value.value, page: 0, hasMore: hasMore})
		}
	}

	handleProfChange(values){
		
		let updatedReviews = []

		if(values.length === 0){
			updatedReviews = this.state.courseReviews
		}else{
			let profs = []
			for(let i = 0; i < values.length; i++){
				profs.push(values[i])
			}
			this.state.courseReviews.map(review => {
				let profName = review.profFirst + " " + review.profLast
				if(profs.includes(profName)){
					updatedReviews.push(review)
				}
			})
		}

		let hasMore = true
		if (this.calcTableEdge(0, updatedReviews.length) >= updatedReviews.length){
			hasMore = false
		}

		if(this.state.sortBy === "most-recent"){
			updatedReviews = updatedReviews.slice().sort((a, b) => b.date - a.date)
			this.setState({reviewsFiltered: updatedReviews, sortBy: "most-recent" , page: 0, hasMore: hasMore })
		}else if(this.state.sortBy === "most-helpful"){
			updatedReviews = updatedReviews.slice().sort((a, b) => b.numLiked - a.numLiked)
			this.setState({reviewsFiltered: updatedReviews, sortBy: "most-helpful", page: 0, hasMore: hasMore })
		}
	}

	render() {
		const courseReviewList = this.state.reviewsFiltered.slice(0, this.calcTableEdge(this.state.page, this.state.reviewsFiltered.length)).map(review => {
			return (
				<div>
					<CourseReviewEntry
					review={review}
					handleLike={this.handleLike}
					handleDislike={this.handleDislike}
					handleReport={this.handleReport}
				/>
					<ReportComment reviewId={review.id} isCourse={true}/>
				</div>
			)
		})

		const profs = []
		const profOptions = []
		for (let i = 0; i < this.state.courseReviews.length; i++){
			let profString = this.state.courseReviews[i].profFirst + " " + this.state.courseReviews[i].profLast
			if(profs.includes(profString)){
				continue
			}
			profs.push(profString)
			
			let obj = {
				value: profString,
				label: profString
			}
			profOptions.push(obj)
		}

		let noReviews = (
			<h5> No reviews yet for this course </h5>
		)

		let reviews = (
			<div className="list-group review-list">
				{courseReviewList}
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
						for(let i=0; i<sortOptions.length; i++){
							if(val.value === this.state.sortBy) return true;
						}
						return false
					})}
					autosize={true}
				/>
			</div>
		)

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

		let hasMore = this.state.hasMore
		if (this.calcTableEdge(this.state.page, this.state.reviewsFiltered.length) >= this.state.reviewsFiltered.length){
			hasMore = false
		}

		return (
			<div className="courseReviews">
				<div className="card course-card">
					<div className="card-header course-header" >
						<h4> Reviews ({this.state.reviewsFiltered.length}) </h4>
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
			</div>
		)
	}

}

export default CourseReviews;