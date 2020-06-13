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

			cSort: {
				sortBy: 'courseNum',
				sortDir: 'down',
			},

			pSort: {
				sortBy: 'courseNum',
				sortDir: 'down',
			},

			cFilter: {
				depts: [],
				mApp: 0,
				mNum: 0,
				sem: "all"
			},

			pFilter: {
				depts: [],
				mApp: 0,
				mNum: 0,
				sem: "all"
			}
		}

		const search = {
			searchValue: this.props.location.state.searchValue
		}

		populateResults(search).then(res => {
			let data = JSON.parse(JSON.stringify(this.state.data))

			console.log("before populate", this.state.data)

			if (res.courses === "empty") {

				data.noCourses = true
				data.courseLoaded = true
			} else {

				data.courses = res.courses
				data.courseLoaded = true
				data.noCourses = false
			}
			if (res.profs === "empty") {

				data.noProfs = true
				data.profLoaded = true
			} else {

				data.professors = res.profs
				data.profLoaded = true
				data.noProfs = false
			}

			console.log("after:", data)

			this.setState({ data: data })
		})

		this.handleSortChange = this.handleSortChange.bind(this)
		this.handleTabChange = this.handleTabChange.bind(this)
		this.handleFilterChange = this.handleFilterChange.bind(this)

		this.setTableData = this.setTableData.bind(this)
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
				this.setState((prevState) => {

					let data = JSON.parse(JSON.stringify(prevState.data))
					data.depts = list
					return (
						{
							data: data
						}
					)
				})
			}
		})
	}

	componentDidUpdate(prevProps) {

		if (prevProps.location.search != this.props.location.search) {

			const search = {
				searchValue: this.props.location.state.searchValue
			}

			this.setState({ data: { courseLoaded: false, profLoaded: false } })
			populateResults(search).then(res => {
				let data = JSON.parse(JSON.stringify(this.state.data))
	
				console.log("before populate", this.state.data)
	
				if (res.courses === "empty") {
	
					data.noCourses = true
					data.courseLoaded = true
				} else {
	
					data.courses = res.courses
					data.courseLoaded = true
					data.noCourses = false
				}
				if (res.profs === "empty") {
	
					data.noProfs = true
					data.profLoaded = true
				} else {
	
					data.professors = res.profs
					data.profLoaded = true
					data.noProfs = false
				}
	
				console.log("after:", data)
			})

		}

	}

	handleTabChange(event, newValue) {
		this.setState({ currentTab: newValue })
	}

	handleSortChange(sortByName) {

		const { sortDir, sortBy } = this.state.cSort;
		let nextSort;

		if (sortBy !== sortByName) nextSort = 'down';
		else if (sortDir === 'down') nextSort = 'up';
		else if (sortDir === 'up') nextSort = 'down';

		this.setState({
			cSort: {
				sortBy: sortByName,
				sortDir: nextSort
			}
		})
	}

	handleFilterChange(depts = null, mApp = -1, mNum = -1, sem = null) {

		this.setState((prevState) => {

			let pFilters = prevState.cFilter

			return (
				{
					cFilter: {
						depts: depts == null ? pFilters.depts : depts,
						mApp: mApp < 0 ? pFilters.mApp : mApp,
						mNum: mNum < 0 ? pFilters.mNum : mNum,
						sem: sem == null ? pFilters.sem : sem
					}
				}
			)
		})
	}

	sortUp(a, b) {
		const { courses, professors } = this.state.data
		const sortBy = this.state.cSort.sortBy

		if (sortBy === 'courseNum' && courses.length !== 0 && 'courseNum' in a) { return b.courseNum.localeCompare(a.courseNum) }
		else if (sortBy === 'courseName' && courses.length !== 0 && 'courseName' in a) { return b.courseName.localeCompare(a.courseName) }
		else if (sortBy === 'profName' && professors.length !== 0 && 'profName' in a) { return b.profName.localeCompare(a.profName) }
	}

	sortDown(a, b) {
		const { courses, professors } = this.state.data
		const sortBy = this.state.cSort.sortBy

		if (sortBy === 'courseNum' && courses.length !== 0 && 'courseNum' in a) { return a.courseNum.localeCompare(b.courseNum) }
		else if (sortBy === 'courseName' && courses.length !== 0 && 'courseName' in a) { return a.courseName.localeCompare(b.courseName) }
		else if (sortBy === 'profName' && professors.length !== 0 && 'profName' in a) { return a.profName.localeCompare(b.profName) }
	}

	setTableData(index) {

		const { professors, courses } = this.state.data
		const { sortDir, sortBy } = this.state.cSort
		const filter = index == 0 ? this.state.cFilter : this.state.pFilter

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
					.filter(course => filter.depts.length <= 0 || filter.depts.includes(course.deptName))
					.sort(sortTypes[sortDir].fn)

				console.log(this.state)
				console.log(sortedCourses)

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

			setTableData={this.setTableData}
			search={this.props.location.state.searchValue} />)
	}
}

export default withRouter(Results);