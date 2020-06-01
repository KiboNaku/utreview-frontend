import axios from 'axios'

export const getCourseInfo = (course) => {
    return axios
      .post('api/course_info', {
        courseNum: course.courseNum
      })
      .then(response => {
        console.log(response)
        return response.data
      })
  }