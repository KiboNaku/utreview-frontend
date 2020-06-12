import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { populateCourses, populateProfs, populateResults } from './_utils/ResultsFunctions'
import ResultsComponent from './_components/ResultsComponent'
import { getMajor } from './../popups/_utils/UserFunctions'
import "./Results.css"

class Results extends Component {

	constructor(props) {

		super(props);
		this.state = {

			data: {
				courseLoaded: false,
				profLoaded: false,
				noCourses: false,
				noProfs: false,

				depts: [],
				courses: [],
				professors: []
			},

			currentTab: 0,

			courseSort: {
				sortBy: 'courseNum',
				sortDir: 'down',
			},

			filter: {
				f_depts: [],
				f_mApp: 0,
				f_mNum: 0,
				f_sem: "all"
			}
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

		this.handleSortChange = this.handleSortChange.bind(this)
		this.handleTabChange = this.handleTabChange.bind(this)
		this.handleFilterChange = this.handleFilterChange.bind(this)
		this.setData = this.setData.bind(this)
		this.sortUp = this.sortUp.bind(this)
		this.sortDown = this.sortDown.bind(this)
	}

	componentDidMount() {

		getMajor().then(res => {
			if (res.error) {
				alert(res.error)
			} else {
				let data = res.majors
				let list = new Array()
				for (const i in data) {
					list.push({
						value: data[i]['name'],
						label: data[i]['name']
					})
				}
				this.setState({ data: { depts: list } })
			}
		})
	}

	componentDidUpdate(prevProps) {

		if (prevProps.location.search != this.props.location.search) {

			const search = {
				searchValue: this.props.location.state.searchValue
			}

			this.setState({ courseLoaded: false, profLoaded: false })
			populateResults(search).then(res => {
				if (res.courses === "empty") {
					this.setState({ data: { noCourses: true, courseLoaded: true } })
				} else {
					let courseData = res.courses
					this.setState({ data: { courses: courseData, courseLoaded: true, noCourses: false } })
				}
				if (res.profs === "empty") {
					this.setState({ data: { noProfs: true, profLoaded: true } })
				} else {
					let profData = res.profs
					this.setState({ data: { professors: profData, profLoaded: true, noProfs: false } })
				}
			})

		}

	}

	handleTabChange(event, newValue) {
		this.setState({ currentTab: newValue })
	}

	handleSortChange(sortByName) {

		const { sortDir, sortBy } = this.state.courseSort;
		let nextSort;

		if (sortBy !== sortByName) nextSort = 'down';
		else if (sortDir === 'down') nextSort = 'up';
		else if (sortDir === 'up') nextSort = 'down';

		this.setState({
			courseSort: {
				sortBy: sortByName,
				sortDir: nextSort
			}
		})
	}

	handleFilterChange(depts = null, mApp = -1, mNum = -1, sem = null) {

		this.setState((prevState) => {

			let pFilters = prevState.filter

			return (
				{
					filter: {
						f_depts: depts == null ? pFilters.f_depts : depts,
						f_mApp: mApp < 0 ? pFilters.f_mApp : mApp,
						f_mNum: mNum < 0 ? pFilters.f_mNum : mNum,
						f_sem: sem == null ? pFilters.f_sem : sem
					}
				}
			)
		})
	}

	sortUp(a, b) {
		const { courses, professors } = this.state.data
		const sortBy = this.state.courseSort.sortBy

		if (sortBy === 'courseNum' && courses.length !== 0 && 'courseNum' in a) { return b.courseNum.localeCompare(a.courseNum) }
		else if (sortBy === 'courseName' && courses.length !== 0 && 'courseName' in a) { return b.courseName.localeCompare(a.courseName) }
		else if (sortBy === 'profName' && professors.length !== 0 && 'profName' in a) { return b.profName.localeCompare(a.profName) }
	}

	sortDown(a, b) {
		const { courses, professors } = this.state.data
		const sortBy = this.state.courseSort.sortBy

		if (sortBy === 'courseNum' && courses.length !== 0 && 'courseNum' in a) { return a.courseNum.localeCompare(b.courseNum) }
		else if (sortBy === 'courseName' && courses.length !== 0 && 'courseName' in a) { return a.courseName.localeCompare(b.courseName) }
		else if (sortBy === 'profName' && professors.length !== 0 && 'profName' in a) { return a.profName.localeCompare(b.profName) }
	}

	setData(index) {

		const { professors, courses } = this.state.data
		const { sortDir, sortBy } = this.state.courseSort
		const filter = this.state.filter

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

				let sortedCourses = courses
					.filter(course => filter.f_depts.length <= 0 || filter.f_depts.includes(course.deptName))
					.sort(sortTypes[sortDir].fn)

				return sortedCourses.map(course => {
					const { courseNum, courseName, professors } = course

					// TODO: temporary numbers to fill table: remove later
					const rating = Math.floor(Math.random() * 70 + 30)
					const numRating = Math.floor(Math.random() * 1500)

					return (
						<tr key={courseNum}>
							<td colSpan="1">{courseNum}</td>
							<td colSpan="2" className="class-name">{
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
							<td colSpan="1">
								{rating}%
							</td>
							<td colSpan="1">
								{numRating}
							</td>
						</tr>
					)
				})

			case 1:
				console.log("sort prof")
				let sortedProfs = professors.sort(sortTypes[sortDir].fn)
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

			{...this.state}

			handleTabChange={this.handleTabChange}
			handleFilterChange={this.handleFilterChange}
			handleSortChange={this.handleSortChange}

			setData={this.setData}
			search={this.props.location.state.searchValue} />)
	}
}

export default withRouter(Results);