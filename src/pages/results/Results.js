import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import ResultsComponent from './_components/ResultsComponent'
import { populateResults } from './_utils/ResultsFunctions'
import { getMajor } from './../popups/_utils/UserFunctions'

import "./Results.css"


class Results extends Component {

	constructor(props) {

		super(props);

		this.state = {

			tabIndex: 0,

			depts: [],

			courses: {
				loaded: false,
				page: props.location.state.page,
				data: [],
				sort: {
					sortBy: 'courseName',
					sortDir: 'down',
				},
				filter: {
					depts: [],
					mNum: 0,
					sem: "all",
					hours: {
						one: true,
						two: true,
						three: true,
						four: true,
						five: true,
						six: true
					},
					divisions: {
						upper: true,
						lower: true
					}
				}
			},

			profs: {
				loaded: false,
				page: props.location.state.page,
				data: [],
				sort: {
					sortBy: 'profName',
					sortDir: 'down',
				},
				filter: {
					mNum: 0,
					sem: "all"
				}
			},
		}

		this.calcTableEdge = this.calcTableEdge.bind(this)
		this.handleSortChange = this.handleSortChange.bind(this)
		this.handleTabChange = this.handleTabChange.bind(this)
		this.handleFilterChange = this.handleFilterChange.bind(this)
		this.handlePageInc = this.handlePageInc.bind(this)
		this.isSemester = this.isSemester.bind(this)
	}

	componentDidMount() {

		// fetch departments

		getMajor().then(res => {
			if (res.error) {
				alert(res.error)
			} else {
				let data = res.majors
				let list = new Array()
				for (const i in data) {
					list.push({
						value: data[i]['abr'],
						label: data[i]['name']
					})
				}
				this.setState({ depts: list })
			}
		})

		// fetch search results

		const search = {
			searchValue: this.props.location.state.searchValue
		}

		populateResults(search).then(res => {
			this.parseResValues(res)
		})
	}

	componentDidUpdate(prevProps) {

		if (prevProps.location.search !== this.props.location.search) {

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
					data: res.courses === "empty" ? [] : res.courses
				},
				profs: {
					...prevState.profs,
					loaded: true,
					data: res.profs === "empty" ? [] : res.profs
				}
			}
		))
	}

	isSemester(sem, profcourse) {

		if (sem === 'all') {
			return true
		} else if (sem === 'current') {
			return profcourse.semesters[0]
		} else if (sem === 'next') {
			return profcourse.semesters[1]
		}
		return true
	}

	calcTableEdge(page, length) {
		return Math.min(25 * (page + 1), length)
	}

	handlePageInc() {

		switch (this.state.tabIndex) {

			case 0:
				this.setState(
					prevState => ({
						courses: {
							...prevState.courses,
							page: prevState.courses.page + 1
						}
					})
				)
				break
			case 1:
				this.setState(
					prevState => ({
						profs: {
							...prevState.profs,
							page: prevState.profs.page + 1
						}
					})
				)
				break
		}


	}

	handleTabChange(event, newValue) {


		this.setState(prevState => (
			{
				tabIndex: newValue,
				courses: {
					...prevState.courses,
					page: 0
				},
				profs: {
					...prevState.profs,
					page: 0
				}
			}
		))
	}

	handleSortChange(sortByName) {

		//TODO: update variable names
		const { tabIndex } = this.state

		if (tabIndex === 0) {
			const { sortDir, sortBy } = this.state.courses.sort;
			let nextSort;

			if (sortBy !== sortByName) nextSort = 'down';
			else if (sortDir === 'down') nextSort = 'up';
			else if (sortDir === 'up') nextSort = 'down';

			this.setState(prevState => ({
				courses: {
					...prevState.courses,
					page: 0,
					sort: {

						sortBy: sortByName,
						sortDir: nextSort
					}
				}
			}))

			console.log(sortByName, nextSort)
		} else if (tabIndex === 1) {
			const { sortDir, sortBy } = this.state.profs.sort;
			let nextSort;

			if (sortBy !== sortByName) nextSort = 'down';
			else if (sortDir === 'down') nextSort = 'up';
			else if (sortDir === 'up') nextSort = 'down';

			this.setState(prevState => ({
				profs: {
					...prevState.profs,
					page: 0,
					sort: {

						sortBy: sortByName,
						sortDir: nextSort
					}
				}
			}))
		}
	}

	handleFilterChange(depts = null, mNum = -1, sem = null, hours = null, divisions = null) {

		if (this.state.tabIndex === 0) {
			this.setState(prevState => {

				let filter = prevState.courses.filter

				if (hours) {
					for (let hour in hours) {
						hours[hour] = !filter.hours[hour]
					}
				}

				if (divisions) {

					for (let division in divisions) {
						divisions[division] = !filter.divisions[division]
					}
				}

				return {
					courses: {
						...prevState.courses,
						page: 0,
						filter: {
							depts: depts === null ? filter.depts : depts,
							mNum: mNum < 0 ? filter.mNum : mNum,
							sem: sem === null ? filter.sem : sem,
							hours: hours === null ? filter.hours : {
								...prevState.courses.filter.hours,
								...hours
							},
							divisions: divisions == null ? filter.divisions : {
								...prevState.courses.filter.divisions,
								...divisions
							}
						}
					}
				}
			})
		} else if (this.state.tabIndex === 1) {
			this.setState((prevState) => {

				let filter = prevState.profs.filter
				return {
					profs: {
						...prevState.profs,
						page: 0,
						filter: {
							mNum: mNum < 0 ? filter.mNum : mNum,
							sem: sem === null ? filter.sem : sem
						}
					}
				}
			})
		}
	}

	render() {

		return (<ResultsComponent

			{...this.state}

			calcTableEdge={this.calcTableEdge}
			handlePageInc={this.handlePageInc}
			handleTabChange={this.handleTabChange}
			handleFilterChange={this.handleFilterChange}
			handleSortChange={this.handleSortChange}
			isSemester={this.isSemester}

			match={this.props.match}
			search={this.props.location.state.searchValue} />)
	}
}

export default withRouter(Results);