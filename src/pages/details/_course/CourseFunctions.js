import axios from 'axios'

export const getCourseInfo = (course) => {
	return axios
		.post('/api/course_info', {
			courseId: course.courseId,
			userEmail: course.userEmail,
			loggedIn: course.loggedIn
		})
		.then(response => {
			return response.data
		})
}

export const getCourseId = (course) => {
	return axios
		.post('/api/course_id', {
			courseString: course.courseString
		})
		.then(response => {
			return response.data
		})
}

export const reviewFeedback = (feedback) => {
	return axios
		.post('/api/review_feedback', {
			like: feedback.like,
			isCourse: feedback.isCourse,
			userEmail: feedback.userEmail,
			reviewId: feedback.reviewId
		})
		.then(response => {
			return response.data
		})
}