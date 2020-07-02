import axios from 'axios'

export const getProfilePictures = () => {
	return axios
		.get('/api/get_image')
		.then(response => {
			return response.data
		})
}

export const updateInfo = user => {
	return axios
		.post('/api/update_info', {
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email + '@utexas.edu',
			password: user.password,
			major: user.major,
			image: user.image
		})
		.then(response => {
			console.log(response)
			localStorage.setItem('usertoken', response.data)
			return response.data
		})
}

export const getReviews = () => {
	return axios
		.get('/api/review_list')
		.then(response => {
			return response.data
		})
}