import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom'
import {populateCourses} from './ResultsFunctions'
import NavBar from './../_components/NavBar';

class CourseResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			courses: [],
			sortBy: 'courseNum',
			sortUp: false
		}

		this.setData = this.setData.bind(this);
	}

	componentDidMount(){
		populateCourses().then(res => {
            if (res.error) {
                alert(res.error)
            }else{
				let courseData = res.courses
                this.setState({courses: courseData})
            }
        })
	}

	setData() {
		return this.state.courses.map(course => {
			const { courseNum, courseName, professors } = course

			return (
				<tr key={courseNum}>
					<td>{courseNum}</td>
					<td>{
						<Link to={`${this.props.match.url}/${courseNum}`}> {courseName} </Link>
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

	render () {
		let sortIcon;
		if(this.state.sortUp){
			sortIcon= <i className="fas fa-sort-up"></i>
		} else {
			sortIcon= <i className="fas fa-sort-down"></i>
		}

		return (
			<div>
				<table id='courseResults' className='table table-hover'>
					<thead className='thead-dark'>
						<tr>
							<th scope="col">Course Number {sortIcon}</th>
							<th scope="col">Course Name {sortIcon}</th>
							<th scope="col">Professors</th>
						</tr>
					</thead>
					<tbody>
						{this.setData()}
					</tbody>
				</table>
			</div>
		)
	}
}

export default withRouter(CourseResults);