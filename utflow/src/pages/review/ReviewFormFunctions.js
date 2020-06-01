import axios from 'axios'

const testData = [
	"EE302", "EE306"
]

export function getCourseNum() {
	const deptRequest = axios.get('api/get-depts')
	const courseRequest = axios.get('api/get-courses')

	axios.all([deptRequest, courseRequest])
		.then(axios.spread((...responses) => {
			const deptList = responses[0].data
			const courseList = responses[1].data
			const combinedList = []

			for (const i in courseList) {
				let course = courseList[i]
				let num = course["num"]
				let dept = deptList[course["dept_id"] - 1]["abr"] //change to loop
				let courseNum = dept + num
				combinedList.push(courseNum)
			}
			console.log(combinedList)
			return combinedList
		})).catch(errors =>
			console.log(errors)
		)
}

export function getProfessorNames() {
	axios.get('api/get-profs')
		.then((response) => {
			// console.log(response)
		});
	return testData
}