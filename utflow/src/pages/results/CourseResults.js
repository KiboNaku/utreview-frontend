import React, { Component } from 'react';

class CourseResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			courses: [
				{ courseNum: 'EE302', courseName: 'Introduction to Electrical Engineering', professors: ['Tutuc', 'Yu']},
				// professors: [{ lastName: 'Tutuc' }, { lastName: 'Yu' }] },
				{ courseNum: 'EE306', courseName: 'Introduction to Computing', professors: ['Yeraballi', 'Abraham', 'Patt']}
				// professors: [{ lastName: 'Yeraballi' }, { lastName: 'Abraham' }, { lastName: 'Patt' }] }
			]
		}

		this.setData = this.setData.bind(this);
		this.getProfData = this.getProfData.bind(this);
	}

	getProfData() {

	}

	setData() {
		return this.state.courses.map(course => {
			const { courseNum, courseName, professors } = course

			return (
				<tr key={courseNum}>
					<td>{courseNum}</td>
					<td>{courseName}</td>
					<td>{
						professors.map(names => {
							return (names + " ")
						})
					}</td>

					{/* {professors.map(lastName => <td>{lastName}</td>)} */}
				</tr>
			)
		})
	}

	render() {
		return (
			<div>
				<table id='courseResults' class='table table-hover'>
					<thead class="thead-dark">
						<tr>
							<th scope="col">Course Number</th>
							<th scope="col">Course Name</th>
							<th scope="col">Professors</th>
						</tr>
					</thead>
					<tbody>
						{this.setData()}
					</tbody>
				</table>
			</div>
		)
	}
}

export default CourseResults;