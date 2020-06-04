import axios from 'axios'

export const populateCourses = (search) => {
  return axios
    .post('/api/populate_courses', {
      searchValue: search.searchValue
    })
    .then(response => {
      console.log(response)
      return response.data
    })
}

export const populateProfs = () => {
  return axios
    .get('api/populate_profs')
    .then(response => {
      console.log(response)
      return response.data
    })
}
