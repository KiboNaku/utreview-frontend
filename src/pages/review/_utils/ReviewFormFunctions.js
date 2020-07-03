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

export const getTopics = (info) => {
	return axios
		.post('api/get_topics', {
			topicId: info.topicId
		})
		.then(response => {
			return response.data
		})
}

export const getProfs = (info) => {
	return axios
		.post('api/get_profs', {
			semesterId: info.semesterId,
			profId: info.profId
		})
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