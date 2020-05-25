import React from 'react';
import CourseReviewEntry from './CourseReviewEntry';
import './CourseDetails.css'

class CourseReviews extends React.Component {
	constructor() {
		super()
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
				dislikePressed: false
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
				dislikePressed: false
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
				dislikePressed: true
			},
		]

		this.state = {
			courseReviews: courseReviews
		}

		this.handleLike = this.handleLike.bind(this)
		this.handleDislike = this.handleDislike.bind(this)
	}

	handleLike(key) {
		this.setState(prevState => {
			const updatedReviews = prevState.courseReviews.map(courseReview => {
				let dislike = courseReview.dislikePressed
				let dislikeNum = courseReview.numDisliked
				let likeNum = courseReview.numLiked
				let like = courseReview.likePressed
				if (key === courseReview.key) {
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
					key: courseReview.key,
					review: courseReview.review,
					liked: courseReview.liked,
					usefulness: courseReview.usefulness,
					difficulty: courseReview.difficulty,
					workload: courseReview.workload,
					userMajor: courseReview.userMajor,
					profPic: courseReview.profPic,
					profName: courseReview.profName,
					numLiked: likeNum,
					numDisliked: dislikeNum,
					likePressed: like,
					dislikePressed: dislike
				}
			}
			)
			return {
				courseReviews: updatedReviews
			}
		}
		)
	}

	handleDislike(key) {
		this.setState(prevState => {
			const updatedReviews = prevState.courseReviews.map(courseReview => {
				let dislike = courseReview.dislikePressed
				let dislikeNum = courseReview.numDisliked
				let likeNum = courseReview.numLiked
				let like = courseReview.likePressed
				if (key === courseReview.key) {
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
					key: courseReview.key,
					review: courseReview.review,
					liked: courseReview.liked,
					usefulness: courseReview.usefulness,
					difficulty: courseReview.difficulty,
					workload: courseReview.workload,
					userMajor: courseReview.userMajor,
					profPic: courseReview.profPic,
					profName: courseReview.profName,
					numLiked: likeNum,
					numDisliked: dislikeNum,
					likePressed: like,
					dislikePressed: dislike
				}
			}
			)
			return {
				courseReviews: updatedReviews
			}
		}
		)
	}

	render() {
		const courseReviewList = this.state.courseReviews.map(review => {
			return (
				<CourseReviewEntry
					review={review}
					handleLike={this.handleLike}
					handleDislike={this.handleDislike}
				/>
			)
		})

		return (
			<div className="courseReviews">
				<h1> Course Reviews </h1>
				<div className="list-group">
					{courseReviewList}
				</div>
			</div>

		)
	}

}

export default CourseReviews;