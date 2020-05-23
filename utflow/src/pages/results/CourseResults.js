import React, { Component } from 'react';
import NavBar from './../_components/NavBar';

class CourseResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			courses: [
				{ courseNum: 'EE302', courseName: 'Introduction to Electrical Engineering', professors: ['Tutuc', 'Yu'] },
				{ courseNum: 'EE306', courseName: 'Introduction to Computing', professors: ['Yerraballi', 'Abraham', 'Patt'] }
			]
		}

		this.setData = this.setData.bind(this);
	}

	setData() {
		return this.state.courses.map(course => {
			const { courseNum, courseName, professors } = course

			return (
				<tr key={courseNum}>
					<td>{courseNum}</td>
					<td>{
						<a href='https://www.google.com'> {courseName} </a>
					}</td>
					<td>{
						professors.map((names, i) => {
							let link;
							if (i === (professors.length - 1)) {
								link = <a href='https://www.google.com'> {names} </a>
							} else {
								link = <span><a href='https://www.google.com'> {names}</a> | </span>
							}
							return link;
						})
					}</td>
				</tr>
			)
		})
	}

	render() {
		return (
			<div>
				<NavBar />
				<table id='courseResults' className='table table-hover'>
					<thead className="thead-dark">
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