import React, { Component } from 'react'
import Loading from '../../_utils/Loading.js'
import TabPanel from './TabPanel'
import { Link } from 'react-router-dom'

class CoursePanel extends Component {

    constructor() {

        super();
        this.setTableData = this.setTableData.bind(this)
        this.sortUp = this.sortUp.bind(this)
        this.sortDown = this.sortDown.bind(this)
    }

    sortUp(a, b) {

        // if (sortBy === 'courseNum' && courses.length !== 0 && 'courseNum' in a) { return b.courseNum.localeCompare(a.courseNum) }
        // else if (sortBy === 'courseName' && courses.length !== 0 && 'courseName' in a) { return b.courseName.localeCompare(a.courseName) }
    }

    sortDown(a, b) {

        // if (sortBy === 'courseNum' && courses.length !== 0 && 'courseNum' in a) { return a.courseNum.localeCompare(b.courseNum) }
        // else if (sortBy === 'courseName' && courses.length !== 0 && 'courseName' in a) { return a.courseName.localeCompare(b.courseName) }
        // else if (sortBy === 'profName' && professors.length !== 0 && 'profName' in a) { return a.profName.localeCompare(b.profName) }
    }

    setTableData() {

        const { sortDir, sortBy } = this.props.sort

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

        let sortedCourses = this.props.data
            .filter(course => this.props.filter.depts.length <= 0 || this.props.filter.depts.includes(course.deptName))
            .sort(sortTypes[sortDir].fn)

        return sortedCourses.map(course => {
            const { courseNum, courseName } = course

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

    render() {

        if (this.props.data != null) {

            const { sortDir, sortBy } = this.props.sort

            let courseTable = (

                <table id='courseResults' className='table table-hover result-table'>
                    <thead className='thead-dark'>
                        <tr rowSpan="2">

                            <th scope="col" colSpan="1" className="sortable" onClick={() => this.props.handleSortChange('courseNum')}>
                                <span>Course #</span>
                                <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'courseNum' ? '' : ' invisible')}></i>
                            </th>

                            <th scope="col" colSpan="2" className="sortable" onClick={() => this.props.handleSortChange('courseName')}>
                                <span>Course Name</span>
                                <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'courseName' ? '' : ' invisible')}></i>
                            </th>

                            <th scope="col" colSpan="1" className="sortable" onClick={() => console.log("No sort for approval")}>
                                <span>Approval</span>
                                <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'approval' ? '' : ' invisible')}></i>
                            </th>

                            <th scope="col" colSpan="1" className="sortable" onClick={() => console.log("No sort for num ratings")}>
                                <span># Ratings</span>
                                <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'ratings' ? '' : ' invisible')}></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.setTableData()}
                    </tbody>
                </table>
            )

            return (
                <TabPanel index={0} value={this.props.tabIndex} className="table-panel">
                    {this.props.loaded ? (this.props.data == null ? this.props.emptyTable : courseTable) : this.props.loading}
                </TabPanel>
            )
        }
    }
}

export default CoursePanel