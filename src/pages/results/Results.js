import React, { Component } from 'react'
import qs from 'qs'
import { withRouter } from 'react-router-dom'
import NotFound from './../not-found/NotFound'
import ResultsComponent from './_components/ResultsComponent'
import { populateResults } from './_utils/ResultsFunctions'
import { getMajor, getSemester } from './../popups/_utils/UserFunctions'
import MetaTags from 'react-meta-tags';

import "./Results.css"


class Results extends Component {

	constructor(props) {

		super(props);

		this.state = {

			searchValue: "",
			tabIndex: 0,
			depts: [],
			deptsLoaded: false,
			invalidPage: false,
			semesters: null,

			courses: {
				loaded: false,
				page: 0,
				data: [],
				filtered: [],
				sort: {
					sortBy: 'courseRatings',
					sortDir: 'down',
				},
				filter: {
					depts: [],
					mNum: 0,
					sem: "all",
					hours: {
						0: true,
						1: true,
						2: true,
						3: true,
						4: true,
						5: true,
						6: true
					},
					divisions: {
						lower: true,
						upper: true,
						graduate: true
					}
				}
			},

			profs: {
				loaded: false,
				page: 0,
				data: [],
				filtered: [],
				sort: {
					sortBy: 'profRatings',
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
		this.isHour = this.isHour.bind(this)
		this.isDivision = this.isDivision.bind(this)
		this.filter_courses = this.filter_courses.bind(this)
		this.filter_profs = this.filter_profs.bind(this)
	}

	componentDidMount() {

		// fetch departments

		getMajor().then(res => {
			if (res.error) {
				alert(res.error)
			} else {
				let data = res.majors
				let list = []
				for (const i in data) {
					list.push({
						value: data[i]['abr'],
						label: data[i]['name']
					})
				}
				list = list.sort((a, b) => a.label.localeCompare(b.label))
				this.setState({ depts: list, deptsLoaded: true })
			}
		})

		getSemester().then(res => {
			this.setState({ semesters: res })
		})

		// fetch search results
		let search
		if (this.props.location.state === undefined) {
			let urlObject = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
			if (urlObject.search) {
				this.props.handleSearchValueChange(urlObject.search)
				search = {
					searchValue: urlObject.search
				}
				this.setState({ searchValue: urlObject.search })
			} else {
				search = {
					searchValue: ''
				}
				this.setState({ searchValue: '' })
			}
		} else {
			this.props.handleSearchValueChange(this.props.location.state.searchValue)
			search = {
				searchValue: this.props.location.state.searchValue
			}
			this.setState({ searchValue: this.props.location.state.searchValue })
		}


		populateResults(search).then(res => {
			this.parseResValues(res)
		})
	}

	componentDidUpdate(prevProps) {

		if (prevProps.location.search !== this.props.location.search) {

			let search
			if (this.props.location.state === undefined) {
				let urlObject = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
				if (urlObject.search) {
					search = {
						searchValue: urlObject.search
					}
					this.setState({ searchValue: urlObject.search })
				} else {
					search = {
						searchValue: ''
					}
					this.setState({ searchValue: '' })
				}
			} else {
				search = {
					searchValue: this.props.location.state.searchValue
				}
				this.setState({ searchValue: this.props.location.state.searchValue })
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

		let course_data = res.courses === "empty" ? [] : res.courses
		let prof_data = res.profs === "empty" ? [] : res.profs

		this.setState(prevState => (

			{
				courses: {
					...prevState.courses,
					loaded: true,
					data: course_data,
					filtered: this.filter_courses(prevState.courses.filter, course_data),
				},
				profs: {
					...prevState.profs,
					loaded: true,
					data: prof_data,
					filtered: this.filter_profs(prevState.profs.filter, prof_data),
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

	isHour(course, filter) {
		return filter.hours[(
			Math.min(
				parseInt(
					course.courseNum.replace(/\D/g, '')[0]
				), 6
			)
		)]
	}

	isDivision(course, filter) {

		let divNum = parseInt(course.courseNum.replace(/\D/g, '')[1])
		return (filter.divisions.lower && divNum < 2) || (filter.divisions.upper && divNum >= 2 && divNum < 8) || (filter.divisions.graduate && divNum >= 8)
	}

	calcTableEdge(page, length) {
		return Math.min(40 * (page + 1), length)
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
			default:
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

			this.setState(prevState => {

				let filter = prevState.courses.filter
				let filtered = this.filter_courses(filter, prevState.courses.data)

				return {
					courses: {
						...prevState.courses,
						filtered: filtered
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

			this.setState((prevState) => {

				let filter = prevState.profs.filter
				let filtered = this.filter_profs(filter, prevState.profs.data)
				return {
					profs: {
						...prevState.profs,
						filtered: filtered
					}
				}
			})
		}
	}

	filter_courses(filter, courses_data) {
		return courses_data.filter(course =>
			(filter.depts.length <= 0 || filter.depts.includes(course.courseDept)) &&
			(filter.mNum <= course.numRatings) &&
			(this.isSemester(filter.sem, course)) &&
			(this.isHour(course, filter)) &&
			(this.isDivision(course, filter))
		)
	}

	filter_profs(filter, profs_data) {
		return profs_data.filter(prof =>
			(filter.mNum <= prof.numRatings) &&
			(this.isSemester(filter.sem, prof)))
	}

	render() {

		return (

			<div>
				<MetaTags>
					<title>{this.props.title} | {this.props.mainTitle}</title>
				</MetaTags>

				{this.state.invalidPage ? <NotFound /> : <ResultsComponent

					{...this.state}

					calcTableEdge={this.calcTableEdge}
					handlePageInc={this.handlePageInc}
					handleTabChange={this.handleTabChange}
					handleFilterChange={this.handleFilterChange}
					handleSortChange={this.handleSortChange}
					isSemester={this.isSemester}
					isHour={this.isHour}
					isDivision={this.isDivision}

					match={this.props.match}
					search={this.state.searchValue} />}
			</div>
		)
	}
}

export default withRouter(Results);