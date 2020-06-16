import React, { Component } from 'react'
import Loading from '../../_utils/Loading.js'
import { Link } from 'react-router-dom'
import TabPanel from './TabPanel'

class ProfPanel extends Component {

    constructor() {

        super();
        this.setTableData = this.setTableData.bind(this)
        this.sortUp = this.sortUp.bind(this)
        this.sortDown = this.sortDown.bind(this)
    }

    sortUp(a, b) {
        // const courses = this.state.courses.data
        // const professors = this.state.profs.data
        // const sortBy = this.state.courses.sort.sortBy

        // if (sortBy === 'courseNum' && courses.length !== 0 && 'courseNum' in a) { return b.courseNum.localeCompare(a.courseNum) }
        // else if (sortBy === 'courseName' && courses.length !== 0 && 'courseName' in a) { return b.courseName.localeCompare(a.courseName) }
        // else if (sortBy === 'profName' && professors.length !== 0 && 'profName' in a) { return b.profName.localeCompare(a.profName) }
    }

    sortDown(a, b) {
        // const courses = this.state.courses.data
        // const professors = this.state.profs.data
        // const sortBy = this.state.courses.sort.sortBy

        // if (sortBy === 'courseNum' && courses.length !== 0 && 'courseNum' in a) { return a.courseNum.localeCompare(b.courseNum) }
        // else if (sortBy === 'courseName' && courses.length !== 0 && 'courseName' in a) { return a.courseName.localeCompare(b.courseName) }
        // else if (sortBy === 'profName' && professors.length !== 0 && 'profName' in a) { return a.profName.localeCompare(b.profName) }
    }

    setTableData() {

        if (this.props.data != null) {
            const { sortDir, sortBy } = this.props.sort
            const filter = this.props.filter

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
            // TODO: update with prof info

            let sortedCourses = this.props.data
                .filter(course => filter.depts.length <= 0 || filter.depts.includes(course.deptName))
                .sort(sortTypes[sortDir].fn)

            return sortedCourses.map(course => {
                const { profName } = course

                // TODO: temporary numbers to fill table: remove later
                const rating = Math.floor(Math.random() * 70 + 30)
                const numRating = Math.floor(Math.random() * 1500)

                return (
                    <tr key={profName}>
                        <td colSpan="1">{profName}</td>
                        <td colSpan="2" className="class-name">{
                            <Link
                                to={{
                                    pathname: `${this.props.match.url}/${profName}`,
                                    state: {
                                        profName: profName
                                    }
                                }}
                            > {profName}
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

        let profTable = (

            <table id='profResults' className='table table-hover result-table'>
                <thead className='thead-dark'>
                    <tr rowSpan="2">

                        <th scope="col" colSpan="3" className="sortable" onClick={() => this.props.handleSortChange('courseNum')}>
                            <span>Name</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'courseNum' ? '' : ' invisible')}></i>
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
            <TabPanel index={1} value={this.props.tabIndex}>
                {this.props.loaded ? (this.props.data == null ? this.props.emptyTable : profTable) : this.props.loading}
            </TabPanel>
        )
    }
}

export default ProfPanel