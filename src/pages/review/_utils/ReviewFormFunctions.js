import axios from 'axios'

export const getCourses = () => {
	return axios
		.get('api/get_courses')
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