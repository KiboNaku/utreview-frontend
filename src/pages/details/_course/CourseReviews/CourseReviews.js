import React from 'react';
import Select from 'react-select'
import CourseReviewEntry from './CourseReviewEntry';
import { reviewFeedback } from '../CourseFunctions'
import jwt_decode from 'jwt-decode'
import './CourseReviews.css'

class CourseReviews extends React.Component {
	constructor(props) {
		super(props)
		const courseReviews = [
			{
				key: 1,
				review: "I fucking hated this class",
				liked: false,
				usefulness: 1,
				difficulty: 5,
				workload: 5,
				userMajor: 'Electrical and Computer Engineering',
				profPic: "https://images.dog.ceo/breeds/pembroke/n02113023_12785.jpg",
				profName: 'Yale Patt',
				numLiked: 2,
				numDisliked: 0,
				likePressed: false,
				dislikePressed: false,
				date: new Date("2020-06-12")
			},
			{
				key: 2,
				review: "This was the most inspiring class of my life",
				liked: true,
				usefulness: 5,
				difficulty: 2,
				workload: 3,
				userMajor: 'Electrical and Computer Engineering',
				profPic: "https://images.dog.ceo/breeds/pembroke/n02113023_12785.jpg",
				profName: 'Seth Bank',
				numLiked: 1,
				numDisliked: 2,
				likePressed: true,
				dislikePressed: false,
				date: new Date("2019-06-10")
			},
			{
				key: 3,
				review: "Why did I even take this class",
				liked: false,
				usefulness: 1,
				difficulty: 2,
				workload: 3,
				userMajor: 'Business Honors',
				profPic: "https://images.dog.ceo/breeds/pembroke/n02113023_12785.jpg",
				profName: 'Emanuel Tutuc',
				numLiked: 5,
				numDisliked: 2,
				likePressed: false,
				dislikePressed: true,
				date: new Date("2019-07-12")
			},
		]

		const updatedReviews = props.courseReviews.slice().sort((a, b) => b.date - a.date)

		this.state = {
			courseReviews: props.courseReviews,
			reviewsFiltered: updatedReviews,
			sortBy: "most-recent"
		}

		this.handleLike = this.handleLike.bind(this)
		this.handleDislike = this.handleDislike.bind(this)
		this.likeReview = this.likeReview.bind(this)
		this.dislikeReview = this.dislikeReview.bind(this)
		this.handleSortChange = this.handleSortChange.bind(this)
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
		}
		)

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
		}
		)
		reviewFeedback(feedback).then(res => {
			if (res.error) {
				alert(res.error)
			}
		})
	}

	handleSortChange(value){
		if(value.value === "most-recent"){
			const updatedReviews = this.state.reviewsFiltered.slice().sort((a, b) => b.date - a.date)
			this.setState({reviewsFiltered: updatedReviews, sortBy: value.value})
		}else if(value.value === "most-helpful"){
			const updatedReviews = this.state.reviewsFiltered.slice().sort((a, b) => b.numLiked - a.numLiked)
			this.setState({reviewsFiltered: updatedReviews, sortBy: value.value})
		}
	}

	handleProfChange(values){
		
		let updatedReviews = []
		if(values.length == 0){
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

		if(this.state.sortBy === "most-recent"){
			updatedReviews = updatedReviews.slice().sort((a, b) => b.date - a.date)
			this.setState({reviewsFiltered: updatedReviews, sortBy: "most-recent"})
		}else if(this.state.sortBy === "most-helpful"){
			updatedReviews = updatedReviews.slice().sort((a, b) => b.numLiked - a.numLiked)
			this.setState({reviewsFiltered: updatedReviews, sortBy: "most-helpful"})
		}
	}

	render() {
		console.log(this.state)
		const courseReviewList = this.state.reviewsFiltered.map(review => {
			return (
				<CourseReviewEntry
					review={review}
					handleLike={this.handleLike}
					handleDislike={this.handleDislike}
				/>
			)
		})

		const profOptions = this.state.reviewsFiltered.map(review => {
			return {
				value: review.profFirst + " " + review.profLast,
				label: review.profFirst + " " + review.profLast
			}
		})

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
					placeholder="Select"
					isClearable={true}
					isSearchable={true}
					isMulti
				/>
			</div>

		)

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
					</div>
				</div>
			</div>

		)
	}

}

export default CourseReviews;