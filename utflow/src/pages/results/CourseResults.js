import React, { Component } from 'react';
import NavBar from './../_components/NavBar';

class CourseResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			courses: [
				{ courseNum: 'EE302', courseName: 'Introduction to Electrical Engineering', professors: ['Tutuc', 'Yu'] },
				{ courseNum: 'EE306', courseName: 'Introduction to Computing', professors: ['Yerraballi', 'Abraham', 'Patt'] }
			],
			sortBy: 'courseNum',
			sortUp: false
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
						professors.map((lastName, i) => {
							let link;
							if (i === (professors.length - 1)) {
								link = <a href='https://www.google.com'> {lastName} </a>
							} else {
								link = <span><a href='https://www.google.com'> {lastName}</a> | </span>
							}
							return link;
						})
					}</td>
				</tr>
			)
		})
	}

	render() {
		let sortIcon;
		if(this.state.sortUp){
			sortIcon= <i class="fas fa-sort-up"></i>
		} else {
			sortIcon= <i class="fas fa-sort-down"></i>
		}

		return (
			<div>
				<NavBar />
				<table id='courseResults' className='table table-hover'>
					<thead className='thead-dark'>
						<tr>
							<th scope="col">Course Number {sortIcon}</th>
							<th scope="col">Course Name {sortIcon}</th>
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