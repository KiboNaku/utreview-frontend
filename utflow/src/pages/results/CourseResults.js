import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import NavBar from './../_components/NavBar';
// import { sortTypes } from './sortTypes';

class CourseResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			courses: [
				{ courseNum: 'EE 302', courseName: 'Introduction to Electrical Engineering', professors: ['Tutuc', 'Yu'] },
				{ courseNum: 'EE 306', courseName: 'Introduction to Computing', professors: ['Yerraballi', 'Abraham', 'Patt'] }
			],
			sortBy: '',
			currentSort: 'default'
		}

		this.setData = this.setData.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
	}

	setData() {
		const { courses, currentSort, sortBy } = this.state

		const sortTypes = {
			up: {
				class: 'sortUp',
				fn: (a, b) => sortBy === 'courseNum' ? a.courseNum - b.courseNum : a.courseName - b.courseNum
			},
			down: {
				class: 'sortDown',
				fn: (a, b) => sortBy === 'courseNum' ? b.courseNum - a.courseNum : b.courseName - a.courseNum
			},
			default: {
				class: 'sort',
				fn: (a, b) => a
			}
		}

		return courses.sort(sortTypes[currentSort].fn).map(course => {
			const { courseNum, courseName, professors } = course

			return (
				<tr key={courseNum}>
					<td>{courseNum}</td>
					<td>{
						<Link to={`${this.props.match.url}/${courseNum}`}> {courseName} </Link>
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

	onSortChange(sortByName) {
		const { currentSort, sortBy } = this.state;
		let nextSort;

		if (currentSort === 'down') nextSort = 'up';
		else if (currentSort === 'up') nextSort = 'default';
		else if (currentSort === 'default') nextSort = 'down';

		this.setState({
			sortBy: sortByName,
			currentSort: nextSort
		})
	}

	render() {
		let NumberSortIcon = <i className="fas fa-sort"></i>		;
		let NameSortIcon = <i className="fas fa-sort"></i>		;

		if (this.state.sortBy === 'courseNum') {
			if (this.state.currentSort === 'up') {
				NumberSortIcon = <i className="fas fa-sort-up"></i>
			} else {
				NumberSortIcon = <i className="fas fa-sort-down"></i>
			}
		} else if (this.state.sortBy === 'courseName') {
			if (this.state.currentSort === 'up') {
				NameSortIcon = <i className="fas fa-sort-up"></i>
			} else {
				NameSortIcon = <i className="fas fa-sort-down"></i>
			}
		}

		return (
			<div>
				<table id='courseResults' className='table table-hover'>
					<thead className='thead-dark'>
						<tr>
							<th scope="col" onClick={() => this.onSortChange('courseNum')}>Course Number {NumberSortIcon}</th>
							<th scope="col" onClick={() => this.onSortChange('courseName')}>Course Name {NameSortIcon}</th>
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

export default withRouter(CourseResults);