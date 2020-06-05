import axios from 'axios'

export const getCourseNum = () => {
	return axios
		.get('api/get_course_num')
		.then(response => {
			return response.data
		})
}

export const getProfessorNames = () => {
	return axios
		.get('api/get-profs')
		.then((response) => {
			return response.data
		});
}