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
                .filter(course => filter.depts.length <= 0 || filter.depts.includes(course.deptName))
                .sort(sortTypes[sortDir].fn)
                .slice(0, props.calcTableEdge(props.page, props.data.length))

            return sortedCourses.map((course, index) => {
                const { courseNum, courseName } = course

                // TODO: temporary numbers to fill table: remove later
                // const rating = Math.floor(Math.random() * 70 + 30)
                // const numRating = Math.floor(Math.random() * 1500)

                let rating = 1
                let numRating = 1
                return (

                    <tr key={courseNum} ref={loadRef}>
                        <td colSpan="1">{courseNum}</td>
                        <td colSpan="2" className="class-name">{
                            <Link
                                className="utcolor"
                                to={{
                                    pathname: `${props.match.url}/${courseNum}`,
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

    let courseTable = (
        <div>

            <table id='courseResults' className='table table-hover result-table'>
                <thead className='thead-dark'>
                    <tr rowSpan="2">

                        <th scope="col" colSpan="1" className="sortable" onClick={() => props.handleSortChange('courseNum')}>
                            <span>Course #</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'courseNum' ? '' : ' invisible')}></i>
                        </th>

                        <th scope="col" colSpan="2" className="sortable" onClick={() => props.handleSortChange('courseName')}>
                            <span>Course Name</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'courseName' ? '' : ' invisible')}></i>
                        </th>

                        {/* TODO: update with onclick functions */}

                        <th scope="col" colSpan="1" className="sortable" onClick={() => props.handlePageInc()}>
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
            {props.loaded ? (props.data == null ? props.emptyTable : courseTable) : props.loading}
        </TabPanel>
    )
}

export default CoursePanel