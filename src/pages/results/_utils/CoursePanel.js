import React, { Component } from 'react'
import Loading from '../../_utils/Loading.js'
import TabPanel from './TabPanel'
import { Link } from 'react-router-dom'

class CoursePanel extends Component {

    constructor() {

        super();
        this.setTableData = this.setTableData.bind(this)
        this.sort = this.sort.bind(this)
    }

    sort(a, b) {

        const sortBy = this.props.sort.sortBy
        const courses = this.props.data

        if (courses.length >= 0 && sortBy in a) {

            // TODO: update with approval & # ratings

            switch (sortBy) {
                case 'courseNum':
                    return b.courseNum.localeCompare(a.courseNum)
                case 'courseName':
                    return b.courseName.localeCompare(a.courseName)
            }
        }

        return null;
    }

    setTableData() {

        if (this.props.data != null) {

            const { sortDir } = this.props.sort
            const filter = this.props.filter

            const sortTypes = {
                up: {
                    class: 'sortUp',
                    fn: (a, b) => this.sort(a, b)
                },
                down: {
                    class: 'sortDown',
                    fn: (a, b) => this.sort(b, a)
                },
                default: {
                    class: 'sort',
                    fn: (a, b) => a
                }
            }

            // TODO: update filter with other filters

            let sortedCourses = this.props.data
                .filter(course => filter.depts.length <= 0 || filter.depts.includes(course.deptName))
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
                                className="utcolor"
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

                        {/* TODO: update with onclick functions */}

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

export default CoursePanel