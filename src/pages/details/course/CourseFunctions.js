import axios from 'axios'

export const getCourseInfo = (course) => {
    return axios
      .post('/api/course_info', {
        courseNum: course.courseNum
      })
      .then(response => {
        console.log(response)
        return response.data
      })
  }

  export const getCourseProfs = (course) => {
    return axios
      .post('/api/course_profs', {
        courseNum: course.courseNum
      })
      .then(response => {
        console.log(response)
        return response.data
      })
  }