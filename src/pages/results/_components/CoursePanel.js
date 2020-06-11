import React from 'react'
import Loading from './../../_utils/Loading.js'
import TabPanel from './../TabPanel'

function CoursePanel(props) {
    let sortBy = props.data.sortBy
    let sortDir = props.data.sortDir
    let loaded = props.data.courseLoaded && props.data.profLoaded

    let emptyTable = (
        <h6> No results for your search </h6>
    )


    let loading = (
        <div className="row d-flex justify-content-center">
            <div className="d-inline-block mx-5 my-5 px-5 py-5">
                <Loading />
            </div>
        </div>
    )

    let courseTable = (

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
                {props.setData(0)}
            </tbody>
        </table>
    )

    return (
        <TabPanel index={0} value={props.data.currentTab} className="table-panel">
            {loaded ? (props.data.noCourses ? emptyTable : courseTable) : loading}
        </TabPanel>
    )
}

export default CoursePanel