import React, { useState } from 'react'
import TabPanel from './TabPanel'
import { Link } from 'react-router-dom'

function CoursePanel(props) {

    const { sortDir, sortBy } = props.sort
    const [hasMore, setHasMore] = useState(true)
    const [buttonDOM, setButtonDOM] = useState(null)

    function loadCourses() {
        if (buttonDOM != null) buttonDOM.blur();
        if (hasMore) {
            props.handlePageInc()
            if (props.calcTableEdge(props.page, props.data.length) >= props.data.length) setHasMore(false)
        }
    }

    function sort(a, b) {

        const sortBy = props.sort.sortBy
        const courses = props.data

        if (courses.length >= 0) {

            // TODO: update with approval & # ratings

            switch (sortBy) {
                case 'courseName':
                    let courseNameA = a.courseDept + " " + a.courseNum
                    let courseNameB = b.courseDept + " " + b.courseNum
                    return courseNameB.localeCompare(courseNameA)
                case 'courseTitle':
                    return b.courseTitle.localeCompare(a.courseTitle)
                case 'courseECIS':
                    if (a.eCIS !== null && b.eCIS !== null) return b.eCIS - a.eCIS
                    else if (a.eCIS === null && b.eCIS !== null) {
                        if (props.sort.sortDir === 'up') return 1
                        else return -1
                    }
                    else if (a.eCIS !== null && b.eCIS === null) {
                        if (props.sort.sortDir === 'up') return -1
                        else return 1
                    }
                    else return 0
                case 'courseApproval':
                    if (a.approval !== null && b.approval !== null) return b.approval - a.approval
                    else if (a.approval === null && b.approval !== null) {
                        if (props.sort.sortDir === 'up') return 1
                        else return -1
                    }
                    else if (a.approval !== null && b.approval === null) {
                        if (props.sort.sortDir === 'up') return -1
                        else return 1
                    }
                    else return 0
                case 'courseRatings':
                    return b.numRatings - a.numRatings
            }
        }
        return null;
    }

    function setTableData(sortedCourses) {

        if (props.data != null) {

            // TODO: update filter with other filters

            if (sortedCourses.length > 0) {

                return sortedCourses.map((course) => {
                    const { courseTitle } = course

                    let courseName = course.courseDept + " " + course.courseNum
                    let coursePath = course.courseDept.toLowerCase().replace(' ', '') + "_" + course.courseNum.toLowerCase()
                    if (course.courseTopic >= 0) {
                        coursePath += "_" + course.courseTopic.toString()
                    }

                    return (

                        <tr key={course.id}>
                            <td colSpan="1">{courseName}</td>
                            <td colSpan="2" className="class-name">{
                                <Link
                                    className="utcolor"
                                    to={{
                                        pathname: `/course-results/${coursePath}`,
                                        state: {
                                            courseId: course.id
                                        }
                                    }}
                                > {courseTitle}
                                </Link>
                            }</td>
                            <td colSpan="1">
                                {course.eCIS !== null ? course.eCIS : "N/A"}
                            </td>
                            <td colSpan="1">
                                {course.approval !== null ? course.approval + '%' : "N/A"}
                            </td>
                            <td colSpan="1">
                                {course.numRatings}
                            </td>
                        </tr>
                    )
                })
            }
        }
    }

    const filter = props.filter

    const sortTypes = {
        up: {
            class: 'sortUp',
            fn: (a, b) => sort(a, b)
        },
        down: {
            class: 'sortDown',
            fn: (a, b) => sort(b, a)
        },
        default: {
            class: 'sort',
            fn: (a, b) => a
        }
    }

    let sortedCourses = props.data
        .filter(course =>
            (filter.depts.length <= 0 || filter.depts.includes(course.courseDept)) &&
            (filter.mNum <= course.numRatings) &&
            (props.isSemester(filter.sem, course)) &&
            (props.isHour(course, filter)) &&
            (props.isDivision(course, filter))

        )
        .sort(sortTypes[sortDir].fn)
        .slice(0, props.calcTableEdge(props.page, props.data.length))

    let courseTable = (
        <div>

            <table id='courseResults' className='table table-hover table-responsive result-table'>
                <thead className='thead-dark'>
                    <tr rowSpan="2">

                        <th scope="col" colSpan="1" className="sortable" onClick={() => props.handleSortChange('courseName')}>
                            <span>Course #</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'courseName' ? '' : ' invisible')}></i>
                        </th>

                        <th scope="col" colSpan="2" className="sortable" onClick={() => props.handleSortChange('courseTitle')}>
                            <span>Course Name</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'courseTitle' ? '' : ' invisible')}></i>
                        </th>

                        {/* TODO: update with onclick functions */}
                        <th scope="col" colSpan="1" className="sortable" onClick={() => props.handleSortChange('courseECIS')}>
                            <span>eCIS</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'courseECIS' ? '' : ' invisible')}></i>
                        </th>

                        <th scope="col" colSpan="1" className="sortable" onClick={() => props.handleSortChange('courseApproval')}>
                            <span>Approval</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'courseApproval' ? '' : ' invisible')}></i>
                        </th>

                        <th scope="col" colSpan="1" className="sortable" onClick={() => props.handleSortChange('courseRatings')}>
                            <span># Ratings</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'courseRatings' ? '' : ' invisible')}></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {setTableData(sortedCourses)}
                </tbody>
            </table>
            {hasMore &&
                <div className="d-flex justify-content-center">
                    <button onClick={loadCourses} className="btn btn-block btn-more-results col-12 col-sm-9 col-md-8 col-lg-7" 
                        ref={(buttonDOM) => { setButtonDOM(buttonDOM) }}>
                        More results
                    </button>
                </div>
            }
        </div>
    )

    return (
        <TabPanel index={0} value={props.tabIndex} className="table-panel">
            {props.loaded ? (sortedCourses.length == 0 ? props.emptyTable : courseTable) : props.loading}
        </TabPanel>
    )
}

export default CoursePanel