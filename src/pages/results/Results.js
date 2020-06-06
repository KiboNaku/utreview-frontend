import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { populateCourses, populateProfs, populateResults } from './ResultsFunctions'
import ResultsComponent from './_components/ResultsComponent'

class Results extends Component {
	constructor(props) {
		super(props);
		this.state = {
			courses: [],
			professors: [],
			sortBy: '',
			currentSort: 'default',
			currentTab: 0,
			courseLoaded: false,
			profLoaded: false,
			noCourses: false,
			noProfs: false
		}

		const search = {
			searchValue: this.props.location.state.searchValue
		}

		populateResults(search).then(res => {
			if (res.courses === "empty") {
				this.setState({ noCourses: true, courseLoaded: true })
			} else {
				let courseData = res.courses
				this.setState({ courses: courseData, courseLoaded: true, noCourses: false })
			}
			if (res.profs === "empty") {
				this.setState({ noProfs: true, profLoaded: true })
			} else {
				let profData = res.profs
				this.setState({ professors: profData, profLoaded: true, noProfs: false })
			}
		})

		this.setData = this.setData.bind(this)
		this.handleSortChange = this.handleSortChange.bind(this)
		this.handleTabChange = this.handleTabChange.bind(this)
		this.sortUp = this.sortUp.bind(this)
		this.sortDown = this.sortDown.bind(this)
	}

	componentDidMount() {
		console.log("hello")

	}

	componentDidUpdate(prevProps, prevState) {
		// 

		if (prevProps.location.search != this.props.location.search) {
			const search = {
				searchValue: this.props.location.state.searchValue
			}
			console.log("component did update")
			this.setState({ courseLoaded: false, profLoaded: false})
			populateResults(search).then(res => {
				if (res.courses === "empty") {
					this.setState({ noCourses: true, courseLoaded: true })
				} else {
					let courseData = res.courses
					this.setState({ courses: courseData, courseLoaded: true, noCourses: false })
				}
				if (res.profs === "empty") {
					this.setState({ noProfs: true, profLoaded: true })
				} else {
					let profData = res.profs
					this.setState({ professors: profData, profLoaded: true, noProfs: false })
				}
			})

		}

	}

	handleTabChange(event, newValue) {
		this.setState({ currentTab: newValue })
	}

	handleSortChange(sortByName) {
		const { currentSort, sortBy } = this.state;
		let nextSort;

		if (sortBy !== sortByName) nextSort = 'down';
		else if (currentSort === 'down') nextSort = 'up';
		else if (currentSort === 'up') nextSort = 'down';
		else if (currentSort === 'default') nextSort = 'down';

		this.setState({
			sortBy: sortByName,
			currentSort: nextSort
		})
	}

	sortUp(a, b) {
		const { sortBy, courses, professors } = this.state

		if (sortBy === 'courseNum' && courses.length !== 0 && 'courseNum' in a) { return b.courseNum.localeCompare(a.courseNum) }
		else if (sortBy === 'courseName' && courses.length !== 0 && 'courseName' in a) { return b.courseName.localeCompare(a.courseName) }
		else if (sortBy === 'profName' && professors.length !== 0 && 'profName' in a) { return b.profName.localeCompare(a.profName) }
	}

	sortDown(a, b) {
		const { sortBy, courses, professors, currentTab } = this.state

		if (sortBy === 'courseNum' && courses.length !== 0 && 'courseNum' in a) { return a.courseNum.localeCompare(b.courseNum) }
		else if (sortBy === 'courseName' && courses.length !== 0 && 'courseName' in a) { return a.courseName.localeCompare(b.courseName) }
		else if (sortBy === 'profName' && professors.length !== 0 && 'profName' in a) { return a.profName.localeCompare(b.profName) }
	}

	setData(index) {
		const { professors, courses, currentSort, sortBy } = this.state

		const sortTypes = {
			up: {
				class: 'sortUp',
				fn: (a, b) => this.sortUp(a, b)
			},
			down: {
				class: 'sortDown',
				fn: (a, b) => this.sortDown(a, b)
			},
			default: {
				class: 'sort',
				fn: (a, b) => a
			}
		}

		switch (index) {
			case 0:
				console.log("sort course")
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

			case 1:
				console.log("sort prof")
				let sortedProfs = professors.sort(sortTypes[currentSort].fn)
				return sortedProfs.map(professor => {
					const { id, profName, taughtCourses } = professor
					return (
						<tr key={id}>
							<td>
								{<a href='https://www.google.com'> {profName} </a>}
							</td>
							<td>
								{taughtCourses.map((course, i) => {
									let link;
									if (i === (taughtCourses.length - 1)) {
										link = <a href='https://www.google.com'> {course} </a>
									} else {
										link = <span><a href='https://www.google.com'> {course} </a> | </span>
									}
									return link;
								})}
							</td>
						</tr>
					)
				})

		}

	}

	render() {
		return (<ResultsComponent 
					data={this.state}
					handleDeptChange={this.handleDeptChange} 
					handleTabChange={this.handleTabChange}
					handleChange={this.handleChange}
					setData={this.setData}/>)
	}
}

export default withRouter(Results);