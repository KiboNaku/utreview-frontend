import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { populateCourses, populateProfs, populateResults } from './ResultsFunctions'
import ResultsComponent from './_components/ResultsComponent'
import { getMajor } from './../popups/_utils/UserFunctions'

class Results extends Component {

	constructor(props) {

		super(props);
		this.state = {

			depts: [],
			courses: [],
			professors: [],

			sortBy: 'courseNum',
			sortDir: 'down',
			currentTab: 0,

			courseLoaded: false,
			profLoaded: false,
			noCourses: false,
			noProfs: false,

			f_depts: [],
			f_mScore: 1,
			f_mNum: 0, 
			f_sem: 0
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
		this.handleFilterChange = this.handleFilterChange.bind(this)
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
		const { sortDir, sortBy } = this.state;
		let nextSort;

		if (sortBy !== sortByName) nextSort = 'down';
		else if (sortDir === 'down') nextSort = 'up';
		else if (sortDir === 'up') nextSort = 'down';

		this.setState({
			sortBy: sortByName,
			sortDir: nextSort
		})
	}

	handleFilterChange(depts=null, mScore=-1, mNum=-1, semester=-1){

		if(depts != null){
			this.setState({f_depts: depts})
		}

		if(mScore > 0){
			this.setState({f_mScore: mScore})
		}

		if(mNum > 0){
			this.setState({f_mNum: mNum})
		}

		if(semester > 0){
			this.setState({f_sem: semester})
		}

		console.log("New filters: ", this.state.f_depts, this.state.f_mScore, this.state.f_mNum, this.state.f_sem)
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
		const { professors, courses, sortDir, sortBy, f_depts, f_mScore, f_mNum, f_sem } = this.state

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
					.filter(course => f_depts.length <= 0 || f_depts.includes(course.deptName))
					.sort(sortTypes[sortDir].fn)

				return sortedCourses.map(course => {
					const { courseNum, courseName, professors } = course

					// TODO: temporary numbers to fill table: remove later
					const rating = Math.floor(Math.random() * 70 + 30)
					const numRating = Math.floor(Math.random() * 1500)
				 
					return (
						<tr key={courseNum}>
							<td colSpan="2">{courseNum}</td>
							<td colSpan="3">{
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
							<td colSpan="2">
								{rating}%
							</td>
							<td colSpan="2">
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
					data={this.state}
					handleFilterChange={this.handleFilterChange} 
					handleTabChange={this.handleTabChange}
					handleSortChange={this.handleSortChange}
					setData={this.setData}/>)
	}
}

export default withRouter(Results);