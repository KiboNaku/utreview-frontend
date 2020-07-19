import React, { useCallback, useRef, useState } from 'react'
import TabPanel from './TabPanel'
import { Link } from 'react-router-dom'

function CoursePanel(props) {
    
    const { sortDir, sortBy } = props.sort
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef()
    const loadRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                props.handlePageInc()
                if (props.calcTableEdge(props.page, props.data.length) >= props.data.length) setHasMore(false)
            }
        })
        if (node) observer.current.observe(node)
    }, [props.loading, props.hasMore])

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
            }
        }

        return null;
    }

    function setTableData() {

        if (props.data != null) {

            const { sortDir } = props.sort
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

            // TODO: update filter with other filters

            let sortedCourses = props.data
                .filter(course => filter.depts.length <= 0 || filter.depts.includes(course.courseDept))
                .sort(sortTypes[sortDir].fn)
                .slice(0, props.calcTableEdge(props.page, props.data.length))

            return sortedCourses.map((course, index) => {
                const { courseTitle } = course
                
                let courseName = course.courseDept + " " + course.courseNum
                let coursePath = course.courseDept.toLowerCase().replace(' ', '') + "_" + course.courseNum.toLowerCase()
                if(course.courseTopic >= 0){
                    coursePath += "_" + course.courseTopic.toString()
                } 
                // TODO: temporary numbers to fill table: remove later
                // const rating = Math.floor(Math.random() * 70 + 30)
                // const numRating = Math.floor(Math.random() * 1500)

                let rating = 1
                let numRating = 1
                return (

                    <tr key={course.id} ref={loadRef}>
                        <td colSpan="1">{courseName}</td>
                        <td colSpan="2" className="class-name">{
                            <Link
                                className="utcolor"
                                to={{
                                    pathname: `course-results/${coursePath}`,
                                    state: {
                                        courseId: course.id
                                    }
                                }}
                            > {courseTitle}
                            </Link>
                        }</td>
                        <td colSpan="1">
                            {course.eCIS}
							</td>
                        <td colSpan="1">
                            {course.approval}%
							</td>
                        <td colSpan="1">
                            {course.numRatings}
                        </td>
                    </tr>
                )
            })
        }
    }

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
                            <span>Course Title</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'courseTitle' ? '' : ' invisible')}></i>
                        </th>

                        {/* TODO: update with onclick functions */}
                        <th scope="col" colSpan="1" className="sortable" onClick={() => console.log("No sort for eCIS")}>
                            <span>eCIS</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'eCIS' ? '' : ' invisible')}></i>
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
                    {setTableData()}
                </tbody>
            </table>
            <div>{hasMore && props.loading}</div>
        </div>
    )

    return (
        <TabPanel index={0} value={props.tabIndex} className="table-panel">
            {props.loaded ? (props.data.length == 0 ? props.emptyTable : courseTable) : props.loading}
        </TabPanel>
    )
}

export default CoursePanel