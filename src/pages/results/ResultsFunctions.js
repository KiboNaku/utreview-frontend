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

export const populateProfs = (search) => {
  return axios
    .post('api/populate_profs',{
      searchValue: search.searchValue
    })
    .then(response => {
      console.log(response)
      return response.data
    })
}
