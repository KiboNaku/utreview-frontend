import axios from 'axios'

export const getProfilePictures = () => {
	return axios
		.get('/api/get_profile_pic')
		.then(response => {
			return response.data
		})
}

export const updateProfilePic = user => {
	return axios
		.post('/api/update_profile_pic', {
			email: user.email,
			profile_pic: user.profile_pic
		})
		.then(response => {
			localStorage.setItem('usertoken', response.data)
			return response.data
		})
}

export const updateInfo = user => {
	return axios
		.post('/api/update_user_info', {
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			password: user.password,
			major: user.major,
			profile_pic: user.profile_pic,
			other_major: user.other_major
		})
		.then(response => {
			localStorage.setItem('usertoken', response.data)
			return response.data
		})
}

export const updatePersonalInfo = user => {
	return axios
		.post('/api/update_personal_info', {
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			major: user.major,
			other_major: user.other_major
		})
		.then(response => {
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

export const hasPassword = user => {
	return axios
		.post('/api/has_password', {
			email: user.email, 
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