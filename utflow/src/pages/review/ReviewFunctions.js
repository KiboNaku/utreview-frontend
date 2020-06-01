import axios from 'axios'

export const checkDuplicate = review => {
  return axios
    .post('api/duplicate_review', {
      course_name: review.course_name,
      prof_name: review.prof_name,
      user_email: review.user_email 
    })
    .then(response => {
      console.log(response)
      return response.data
    })
}

export const newReview = review => {
  return axios
    .post('api/new_review', {
      course_name: review.course_name,
      prof_name: review.prof_name,
      user_email: review.user_email,
      course_review: review.course_review,
      course_approval: review.course_approval,
      course_usefulness: review.course_usefulness,
      course_difficulty: review.course_difficulty,
      course_workload: review.course_workload,
      prof_review: review.prof_review,
      prof_approval: review.prof_approval,
      prof_clear: review.prof_clear,
      prof_engaging: review.prof_engaging,
      prof_grading: review.prof_grading
    })
    .then(response => {
      console.log(response)
      return response.data
    })
}

export const editReview = review => {
    return axios
      .post('api/edit_review', {
        course_name: review.course_name,
        prof_name: review.prof_name,
        user_email: review.user_email,
        course_review: review.course_review,
        course_approval: review.course_approval,
        course_usefulness: review.course_usefulness,
        course_difficulty: review.course_difficulty,
        course_workload: review.course_workload,
        prof_review: review.prof_review,
        prof_approval: review.prof_approval,
        prof_clear: review.prof_clear,
        prof_engaging: review.prof_engaging,
        prof_grading: review.prof_grading
      })
      .then(response => {
        console.log(response)
        return response.data
      })
  }