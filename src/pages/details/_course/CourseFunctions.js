import axios from 'axios'

export const getCourseInfo = (course) => {
    return axios
      .post('/api/course_info', {
        courseNum: course.courseNum,
        userEmail: course.userEmail,
        loggedIn: course.loggedIn
      })
      .then(response => {
        return response.data
      })
  }

  export const reviewFeedback = (feedback) => {
    return axios
      .post('/api/review_feedback', {
        like: feedback.like,
        userEmail: feedback.userEmail,
        reviewId: feedback.reviewId
      })
      .then(response => {
        return response.data
      })
  }