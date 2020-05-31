import axios from 'axios'

const testData = [
	"EE302", "EE306"
]

export function getCourseNum() {
	let deptList = null
	axios.get('api/get-depts')
	.then((response) => {
		console.log(response)
	})

	axios.get('api/get-courses')
	.then((response) => {
		console.log(response) 
	});

	return testData
}

export function getProfessorNames() {
	axios.get('api/get-profs')
		.then((response) => {
			console.log(response)
		});
}