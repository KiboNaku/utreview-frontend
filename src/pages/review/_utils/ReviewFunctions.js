import axios from 'axios'

export const checkDuplicate = review => {
  return axios
    .post('/api/review_error', {
      course_id: review.course_id,
      prof_id: review.prof_id,
      semester: review.semester,
      year: review.year,
      user_email: review.user_email
    })
    .then(response => {
      return response.data
    })
}

export const newReview = review => {
  return axios
    .post('/api/new_review', {
      course_id: review.course_id,
      prof_id: review.prof_id,
      sem_id: review.sem_id,
      user_email: review.user_email,
      course_comments: review.course_comments,
      course_approval: review.course_approval,
      course_usefulness: review.course_usefulness,
      course_difficulty: review.course_difficulty,
      course_workload: review.course_workload,
      prof_comments: review.prof_comments,
      prof_approval: review.prof_approval,
      prof_clear: review.prof_clear,
      prof_engaging: review.prof_engaging,
      prof_grading: review.prof_grading,
      grade: review.grade
    })
    .then(response => {
      return response.data
    })
}

export const editReview = review => {
  return axios
    .post('/api/edit_review', {
      review_id: review.review_id,
      course_id: review.course_id,
      prof_id: review.prof_id,
      sem_id: review.sem_id,
      user_email: review.user_email,
      course_comments: review.course_comments,
      course_approval: review.course_approval,
      course_usefulness: review.course_usefulness,
      course_difficulty: review.course_difficulty,
      course_workload: review.course_workload,
      prof_comments: review.prof_comments,
      prof_approval: review.prof_approval,
      prof_clear: review.prof_clear,
      prof_engaging: review.prof_engaging,
      prof_grading: review.prof_grading,
      grade: review.grade
    })
    .then(response => {
      return response.data
    })
}