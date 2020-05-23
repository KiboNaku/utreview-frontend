import React, { Component } from 'react';
import NavBar from './../_components/NavBar';

class ProfResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			professors: [
				{ firstName: 'firstname', lastName: 'lastname', courses: ['EE302', 'EE411']},
				{ firstName: 'firstname2', lastName: 'lastname2', courses: ['EE306', 'EE319K']}
			]
		}

		this.setData = this.setData.bind(this);
	}

	setData() {
		return this.state.professors.map(professor => {
			const { firstName, lastName, courses } = professor

			return (
				<tr key={firstName+lastName}>
					<td>{
						<a href='https://www.google.com'> {firstName + " " + lastName} </a>
					}</td>
					<td>{
						courses.map((course, i) => {
							let link;
							if (i === (courses.length - 1)) {
								link = <a href='https://www.google.com'> {course} </a>
							} else {
								link = <span><a href='https://www.google.com'> {course}</a> | </span>
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
				<table id='professorResults' className='table table-hover'>
					<thead className='thead-dark'>
						<tr>
							<th scope="col">Professor Name {sortIcon}</th>
							<th scope="col">Courses Taught {sortIcon}</th>
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

export default ProfResults;