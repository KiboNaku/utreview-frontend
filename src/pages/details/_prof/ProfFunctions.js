import axios from 'axios'

export const getProfInfo = (prof) => {
    return axios
      .post('/api/prof_info', {
        profName: prof.profName,
        userEmail: prof.userEmail,
        loggedIn: prof.loggedIn
      })
      .then(response => {
        console.log(response)
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
        console.log(response)
        return response.data
      })
  }