import axios from 'axios'

export const populateCourses = () => {
  return axios
    .get('api/populate_courses')
    .then(response => {
      console.log(response)
      return response.data
    })
}

