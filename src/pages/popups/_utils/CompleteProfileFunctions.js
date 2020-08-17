import axios from 'axios'

export const updateMajor = user => {
	return axios
		.post('/api/update_personal_info', {
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			major: user.major,
			other_major: user.other_major
		})
		.then(response => {
			return response.data
		})
}