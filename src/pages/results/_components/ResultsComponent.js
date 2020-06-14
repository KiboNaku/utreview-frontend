import React from 'react'
import Loading from './../../_utils/Loading.js'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CoursePanel from '../_utils/CoursePanel'
import ProfPanel from '../_utils/ProfPanel'
import Filter from "./../_utils/Filter"

function ResultsComponent(props) {

    // TODO: change depending on profs/courses
    const { sortBy, sortDir } = props.courses.sort

    let loading = (
        <div className="row d-flex justify-content-center">
            <div className="d-inline-block mx-5 my-5 px-5 py-5">
                <Loading />
            </div>
        </div>
    )

    let emptyTable = (
        <h6> No results for your search </h6>
    )
    
    return (
        <main className="results-main py-3">
            <div className="main-sub">
                <div className='container-fluid'>

                    <div className="py-3 px-3 mb-2 search-banner">
                        <h3>Results for '{props.search}'</h3>
                    </div>

                    <div className='row'>

                        <Filter header="Course Filters:" handleFilterChange={props.handleFilterChange} depts={props.depts} filter={props.courses.filter}/>

                        <div className="col-md-9">
                            <AppBar position="static" color="default">
                                <Tabs
                                    value={props.currentTab}
                                    variant="fullWidth"
                                    centered
                                    name="currentTab"
                                    onChange={props.handleTabChange}
                                >
                                    <Tab label="Courses" aria-controls='tabpanel-0' className='font-weight-bold py-4' />
                                    <Tab label="Professors" aria-controls='tabpanel-1' className='font-weight-bold py-4' />
                                </Tabs>
                            </AppBar>

                            <CoursePanel match = {props.match} handleSortChange={props.handleSortChange} loading={loading} emptyTable={emptyTable} currentTab={props.currentTab} {...props.courses} />
                            <ProfPanel match = {props.match} handleSortChange={props.handleSortChange} loading={loading} emptyTable={emptyTable} currentTab={props.currentTab} {...props.profs} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ResultsComponent