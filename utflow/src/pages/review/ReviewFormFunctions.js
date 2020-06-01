import axios from 'axios'

export const testData = [
	"EE302", "EE306", "AAS 301"
]

export const testProfData = [
	"Tang, Eric"
]

export function getCourseNum() {
	// axios.get('api/get-course-num')
	// .then((response) => {
	//   // do something get those numbers 
	// });

	return testData
}

export function getProfessorNames() {
	// axios.get('api/get-prof-name')
	// 	.then((response) => {
	// 		// do something get those numbers 
	// 	});
}