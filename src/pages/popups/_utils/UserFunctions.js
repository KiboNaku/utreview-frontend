import axios from 'axios'

export const signup = newUser => {
	return axios
		.post('/api/signup', {
			first_name: newUser.first_name,
			last_name: newUser.last_name,
			email: newUser.email + '@utexas.edu',
			password: newUser.password,
			major: newUser.major,
			other_major : newUser.other_major
		})
		.then(response => {
			localStorage.setItem('email', response.data.email)
			return response.data
		})
}

export const login = user => {
	
	return axios
		.post('/api/login', {
			email: user.email + '@utexas.edu',
			password: user.password,
		})
		.then(response => {
			if(response.data.success >= 0) 
				localStorage.setItem('usertoken', response.data.token)
			return response.data
		})
		.catch(err => {
			console.log(err)
		})
}

export const forgotPassword = user => {
	
	return axios
		.post('/api/forgot_password', {
			email: user.email + '@utexas.edu',
		})
		.then(response => {
			if(response.data.success >= 0) 
				localStorage.setItem('email', response.data.email)
			return response.data
		})
		.catch(err => {
			console.log(err)
		})
}

export const sendResetPassword = () => {

	if(localStorage.email !== 'undefined'){

		return axios
			.post('/api/send_reset_password', {
				email: localStorage.email
			})
	}

	return null
}

export const getProfile = user => {
	return axios
		.get('/users/profile', {
			//headers: { Authorization: ` ${this.getToken()}` }
		})
		.then(response => {
			console.log(response)
			return response.data
		})
		.catch(err => {
			console.log(err)
		})
}

export const getMajor = () => {
	return axios
		.get('/api/get_major')
		.then(response => {
			return response.data
		})
}

export const sendConfirmEmail = () => {

	if(localStorage.email !== 'undefined'){

		return axios
			.post('/api/send_confirm_email', {
				email: localStorage.email
			})
	}

	return null
}