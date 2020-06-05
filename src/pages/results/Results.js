import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { populateCourses, populateProfs } from './ResultsFunctions'
import Loading from './../_components/Loading'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from './TabPanel'
import Select from 'react-select'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { StyledRating } from './../review/Rating'

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
			noCourses: false
		}

		const search = {
			searchValue: this.props.location.state.searchValue
		}

		populateCourses(search).then(res => {
			if (res.empty) {
				this.setState({ noCourses: true, courseLoaded: true })
			} else {
				let courseData = res.courses
				this.setState({ courses: courseData, courseLoaded: true , noCourses: false})
			}
		})

		populateProfs().then(res => {
			if (res.error) {
				alert(res.error)
			} else {
				let profData = res.professors
				this.setState({ professors: profData, profLoaded: true })
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
			this.setState({ courseLoaded: false })
			populateCourses(search).then(res => {
				if (res.empty) {
					this.setState({ noCourses: true, courseLoaded: true})
				} else {
					let courseData = res.courses
					this.setState({ courses: courseData, courseLoaded: true, noCourses: false })
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
		let CourseNumberSortIcon = <i className="fas fa-sort"></i>
		let CourseNameSortIcon = <i className="fas fa-sort"></i>
		let ProfNameSortIcon = <i className="fas fa-sort"></i>

		if (this.state.sortBy === 'courseNum') {
			if (this.state.currentSort === 'up') {
				CourseNumberSortIcon = <i className="fas fa-sort-up"></i>
			} else {
				CourseNumberSortIcon = <i className="fas fa-sort-down"></i>
			}
		} else if (this.state.sortBy === 'courseName') {
			if (this.state.currentSort === 'up') {
				CourseNameSortIcon = <i className="fas fa-sort-up"></i>
			} else {
				CourseNameSortIcon = <i className="fas fa-sort-down"></i>
			}
		} else if (this.state.sortBy === 'profName') {
			if (this.state.currentSort === 'up') {
				ProfNameSortIcon = <i className="fas fa-sort-up"></i>
			} else {
				ProfNameSortIcon = <i className="fas fa-sort-down"></i>
			}
		}

		let loading = (
			<Loading />
		)

		let emptyTable = (
			<h1> No results for your search </h1>
		)

		let empty = this.state.noCourses

		let courseTable = (
			<table id='courseResults' className='table table-hover'>
				<thead className='thead-dark'>
					<tr>
						<th scope="col" onClick={() => this.handleSortChange('courseNum')}>
							Course Number {CourseNumberSortIcon}
						</th>
						<th scope="col" onClick={() => this.handleSortChange('courseName')}>
							Course Name {CourseNameSortIcon}
						</th>
						<th scope="col">
							Professors
								</th>
					</tr>
				</thead>
				<tbody>
					{this.setData(0)}
				</tbody>
			</table>
		)

		let content = (
			<div className="col-lg-9">
				<AppBar position="static" color="default">
					<Tabs
						value={this.state.currentTab}
						variant="fullWidth"
						centered
						name="currentTab"
						onChange={this.handleTabChange}
					>
						<Tab label="Courses" aria-controls='tabpanel-0' />
						<Tab label="Professors" aria-controls='tabpanel-1' />
					</Tabs>
				</AppBar>

				<TabPanel index={0} value={this.state.currentTab}>
					{empty ? emptyTable: courseTable}
				</TabPanel>

				<TabPanel index={1} value={this.state.currentTab}>
					<table id='professorResults' className='table table-hover'>
						<thead className='thead-dark'>
							<tr>
								<th scope="col" onClick={() => this.handleSortChange('profName')}>
									Professor Name {ProfNameSortIcon}
								</th>
								<th scope="col">
									Courses Taught
								</th>
							</tr>
						</thead>
						<tbody>
							{this.setData(1)}
						</tbody>
					</table>
				</TabPanel>
			</div>
		)

		let courseFilter = (
			// for courses:
			// current semester (checkbox)
			// department (dropdown select)
			// min rating (rating)
			// min num of ratings (slider)
			// hours (checkbox group)
			// upper/lower div (checkbox group)

			<div className="col-lg-3">
				<div className='card'>
					<div className='card-header'>
						Courses:
					</div>
					<div className='card-body'>
						<div className='form-check'>
							{/* change to checkbox on right, add handleChange */}
							<input type='checkbox' className='pull-right form-check-input' onChange={this.handleChange} />
							<label className='form-check-label'>Current Semester</label>
						</div>
						<Select
							// add deptList, handleDeptChange
							className="basic-multi-select"
							classNamePrefix="select"
							name="dept"
							options={this.state.deptList}
							onChange={this.handleDeptChange}
							placeholder="Select Department..."
							isClearable={true}
							isSearchable={true}
							isMulti
						/>
						<label> Min Rating: </label>
						<StyledRating
							type="rating"
							value={this.state.Usefulness}
							icon={<RadioButtonCheckedIcon />}
							emptyIcon={<RadioButtonUncheckedIcon />}
							name="Usefulness"
							onChange={this.handleChange}
						/>
						<label>Min Number of Ratings: </label>
						<input type="range" class="custom-range" min="0" max="500" id="customRange3"></input>
					</div>
				</div>
			</div>
		)

		let profFilter = (

			// for profs:
			// current semester (checkbox)
			// min rating (rating)
			// min num of ratings (slider)
			<div className="col-lg-3">
				<div className='card'>
					<div className='card-header'>
						Professor:
					</div>
				</div>
			</div>
		)

		let filter = (
			this.state.currentTab === 0 ? courseFilter : profFilter
		)

		let content = (
			<div className='container-fluid'>
				<div className='row'>
					{filter}
					{result}
				</div>
			</div>
		)

		let loaded = this.state.courseLoaded && this.state.profLoaded

		return (
			<div>
				{loaded ? content : loading}
			</div>

		)
	}
}

export default withRouter(Results);