export const sortTypes = {
	up: {
		class: 'sortUp',
		fn: (a, b) => this.state.sortBy === 'courseNum' ? a.courseNum - b.courseNum : a.courseName - b.courseNum
	},
	down: {
		class: 'sortDown',
		fn: (a, b) => this.state.sortBy === 'courseNum' ? b.courseNum - a.courseNum : b.courseName - a.courseNum
	},
	default: {
		class: 'sort',
		fn: (a, b) => a
	}
}