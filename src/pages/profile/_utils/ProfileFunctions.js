import axios from 'axios'

export const getProfilePictures = () => {
	return axios
		.get('/api/get_profile_pic')
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

export const getReviews = user => {
	return axios
		.post('/api/review_list', {
			name: user.email, 
			type: 'user'
		})
		.then(response => {
			return response.data
		})
}

export const deleteReview = review => {
	return axios
		.post('/api/delete_review', {
			reviewId: review.id
		})
		.then(response => {
			return response.data
		})
}