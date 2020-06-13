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

			currentTab: 0,

			depts: [],

			courses: {
				loaded: false,
				data: [],
				sort: {
					sortBy: 'courseNum',
					sortDir: 'down',
				},
				filter: {
					depts: [],
					mApp: 0,
					mNum: 0,
					sem: "all"
				}
			},

			profs: {
				loaded: false,
				data: [],
				sort: {
					sortBy: 'courseNum',
					sortDir: 'down',
				},
				filter: {
					depts: [],
					mApp: 0,
					mNum: 0,
					sem: "all"
				}
			},
		}

		const search = {
			searchValue: this.props.location.state.searchValue
		}

		populateResults(search).then(res => {
			this.parseResValues(res)
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
				this.setState({ depts: list })
			}
		})
	}

	componentDidUpdate(prevProps) {

		if (prevProps.location.search != this.props.location.search) {

			const search = {
				searchValue: this.props.location.state.searchValue
			}

			this.setState(prevState => ({
				courses: {
					...prevState.courses,
					loaded: false
				},
				profs: {
					...prevState.profs,
					loaded: false
				}
			}))

			populateResults(search).then(res => {
				this.parseResValues(res)
			})

		}

	}

	parseResValues = (res) => {
		this.setState(prevState => (
			{
				courses: {
					...prevState.courses,
					loaded: true,
					data: res.courses === "empty" ? null : res.courses
				},
				profs: {
					...prevState.profs,
					loaded: true,
					data: res.profs === "empty" ? null : res.profs
				}
			}))
	}

	handleTabChange(event, newValue) {
		// TODO: update using event only?
		this.setState({ currentTab: newValue })
	}

	handleSortChange(sortByName) {

		//TODO: update variable names
		const { currentTab } = this.state

		if (currentTab == 0) {
			const { sortDir, sortBy } = this.state.courses.sort;
			let nextSort;

			if (sortBy !== sortByName) nextSort = 'down';
			else if (sortDir === 'down') nextSort = 'up';
			else if (sortDir === 'up') nextSort = 'down';

			this.setState(prevState => ({
				courses: {
					...prevState.courses,
					sort: {

						sortBy: sortByName,
						sortDir: nextSort
					}
				}
			}))
		} else if (currentTab == 1) {
			const { sortDir, sortBy } = this.state.profs.sort;
			let nextSort;

			if (sortBy !== sortByName) nextSort = 'down';
			else if (sortDir === 'down') nextSort = 'up';
			else if (sortDir === 'up') nextSort = 'down';

			this.setState(prevState => ({
				profs: {
					...prevState.profs,
					sort: {

						sortBy: sortByName,
						sortDir: nextSort
					}
				}
			}))
		}
	}

	handleFilterChange(depts = null, mApp = -1, mNum = -1, sem = null) {

		const { currentTab } = this.state

		if (currentTab == 0) {
			this.setState((prevState) => {

				let filter = prevState.courses.filter
				return {
					courses: {
						...prevState.courses,

						filter: {
							depts: depts == null ? filter.depts : depts,
							mApp: mApp < 0 ? filter.mApp : mApp,
							mNum: mNum < 0 ? filter.mNum : mNum,
							sem: sem == null ? filter.sem : sem
						}
					}
				}
			})
		} else if (currentTab == 1) {
			this.setState((prevState) => {

				let filter = prevState.profs.filter
				return {
					profs: {
						...prevState.profs,

						filter: {
							depts: depts == null ? filter.depts : depts,
							mApp: mApp < 0 ? filter.mApp : mApp,
							mNum: mNum < 0 ? filter.mNum : mNum,
							sem: sem == null ? filter.sem : sem
						}
					}
				}
			})
		}
	}


	// TODO: update sort functions
	sortUp(a, b) {
		const courses = this.state.courses.data
		const professors = this.state.profs.data
		const sortBy = this.state.courses.sort.sortBy

		if (sortBy === 'courseNum' && courses.length !== 0 && 'courseNum' in a) { return b.courseNum.localeCompare(a.courseNum) }
		else if (sortBy === 'courseName' && courses.length !== 0 && 'courseName' in a) { return b.courseName.localeCompare(a.courseName) }
		else if (sortBy === 'profName' && professors.length !== 0 && 'profName' in a) { return b.profName.localeCompare(a.profName) }
	}

	sortDown(a, b) {
		const courses = this.state.courses.data
		const professors = this.state.profs.data
		const sortBy = this.state.courses.sort.sortBy

		if (sortBy === 'courseNum' && courses.length !== 0 && 'courseNum' in a) { return a.courseNum.localeCompare(b.courseNum) }
		else if (sortBy === 'courseName' && courses.length !== 0 && 'courseName' in a) { return a.courseName.localeCompare(b.courseName) }
		else if (sortBy === 'profName' && professors.length !== 0 && 'profName' in a) { return a.profName.localeCompare(b.profName) }
	}

	setTableData(index) {

		console.log("settable", this.state)

		const courses = this.state.courses.data
		const professors = this.state.profs.data

		const { sortDir, sortBy } = index == 0 ? this.state.courses.sort : this.state.profs.sort
		const filter = index == 0 ? this.state.courses.filter : this.state.profs.filter

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

		if (index == 0) {

			let sortedCourses = courses
				.filter(course => filter.depts.length <= 0 || filter.depts.includes(course.deptName))
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

		} else if (index == 1) {

			// TODO: update with prof info

			let sortedCourses = courses
				.filter(course => filter.depts.length <= 0 || filter.depts.includes(course.deptName))
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