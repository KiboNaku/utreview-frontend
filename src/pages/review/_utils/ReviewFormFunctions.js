import axios from 'axios'

export const getCourses = (info) => {
	return axios
		.post('api/get_courses', {
			semesterId: info.semesterId
		})
		.then(response => {
			return response.data
		})
}

export const getProfId = (prof) => {
    return axios
      .post('/api/prof_id', {
        profString: prof.profString
      })
      .then(response => {
        return response.data
      })
  }

export const getProfs = () => {
	return axios
		.get('api/get_profs')
		.then((response) => {
			return response.data
		});
}

export const getSemesters = () => {
	return axios
		.get('api/get_semesters')
		.then((response) => {
			return response.data
		});
}