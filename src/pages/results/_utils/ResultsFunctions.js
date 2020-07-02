import axios from 'axios'

export const populateResults = (search) => {
  return axios
    .post('/api/populate_results', {
      searchValue: search.searchValue
    })
    .then(response => {
      return response.data
    })
}

