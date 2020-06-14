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

		
		console.log("results", this.state)
	}

	render() {
		return (<ResultsComponent

			{...this.state}
			
			match = {this.props.match}
			handleTabChange={this.handleTabChange}
			handleFilterChange={this.handleFilterChange}
			handleSortChange={this.handleSortChange}

			search={this.props.location.state.searchValue} />)
	}
}

export default withRouter(Results);