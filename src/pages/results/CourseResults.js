import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom'
import {populateCourses} from './ResultsFunctions'
import Loading from './../_components/Loading'

class CourseResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			courses: [],
			sortBy: '',
			currentSort: 'default',
			loaded: false
		}

		const search = {
			searchValue: this.props.location.state.searchValue
		}

		populateCourses(search).then(res => {
            if (res.error) {
                alert(res.error)
            }else{
				let courseData = res.courses
                this.setState({courses: courseData, loaded: true})
            }
        })

		this.setData = this.setData.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
	}

	componentDidMount(){
		console.log("hello")
		
	}

	componentDidUpdate(){
		const search = {
			searchValue: this.props.location.state.searchValue
		}

		populateCourses(search).then(res => {
            if (res.error) {
                alert(res.error)
            }else{
				let courseData = res.courses
                this.setState({courses: courseData, loaded: true})
            }
        })
	}

	setData() {
		console.log("hello")
		const { courses, currentSort, sortBy } = this.state

		const sortTypes = {
			up: {
				class: 'sortUp',
				fn: (a, b) => sortBy === 'courseNum' ? b.courseNum.localeCompare(a.courseNum) : b.courseName.localeCompare(a.courseName)
			},
			down: {
				class: 'sortDown',
				fn: (a, b) => sortBy === 'courseNum' ? a.courseNum.localeCompare(b.courseNum) : a.courseName.localeCompare(b.courseName)
			},
			default: {
				class: 'sort',
				fn: (a, b) => a
			}
		}

		let sortedCourses = courses.sort(sortTypes[currentSort].fn)

		return sortedCourses.map(course => {
			const { courseNum, courseName, professors } = course

			return (
				<tr key={courseNum}>
					<td>{courseNum}</td>
					<td>{
						<Link 
							to={{
								pathname: `${this.props.match.url}/${courseNum}`,
								state: {
									courseNum: courseNum
								}
							}}
							> {courseName} 
						</Link>
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

		if (sortBy !== sortByName ) nextSort = 'down';
		else if (currentSort === 'down') nextSort = 'up';
		else if (currentSort === 'up') nextSort = 'down';
		else if (currentSort === 'default') nextSort = 'down';

		this.setState({
			sortBy: sortByName,
			currentSort: nextSort
		})
	}

	render() {
		let NumberSortIcon = <i className="fas fa-sort"></i>
		let NameSortIcon = <i className="fas fa-sort"></i>

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

		let loading = (
			<Loading />
		)

		let content = (
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

		return (
			<div>
                {this.state.loaded ? content: loading}
            </div>
			
		)
	}
}

export default withRouter(CourseResults);

