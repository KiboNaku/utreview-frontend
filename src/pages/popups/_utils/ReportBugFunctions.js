import axios from 'axios'

export const sendBug = bug => {
	return axios
		.post('/api/report_bug', {
			page: bug.page,
			bug_type: bug.bug_type,
			description: bug.description,
		})
		.then(response => {
			console.log(response)
			return response.data
		})
}
