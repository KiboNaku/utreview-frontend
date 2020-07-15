import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import CoursePanel from '../_utils/CoursePanel'
import Filter from "./../_utils/Filter"
import Loading from './../../_utils/Loading.js'
import ProfPanel from '../_utils/ProfPanel'

function ResultsComponent(props) {

    let loading = <Loading />

    let emptyTable = (
        <h6> No results for your search. Please check your spelling and try again.</h6>
    )

    let numCourseResults = props.courses.loaded ? props.courses.data.length : "..."
    let numProfResults = props.profs.loaded ? props.profs.data.length : "..."

    return (
        <main className="results-main py-3">
            <div className="main-sub">
                <div className='container-fluid'>

                    <div className="py-3 px-3 mb-2 search-banner">
                        <h3>{numCourseResults} Course Results and {numProfResults} Professor Results for '{props.search}'</h3>
                    </div>

                    <div className='row'>

                        <div className="col-md-3">
                            <Filter
                                header={props.tabIndex == 0 ? "Course Filters:" : "Professor Filters:"}
                                filter={props.tabIndex == 0 ? props.courses.filter : props.profs.filter}
                                depts={props.depts}
                                handleFilterChange={props.handleFilterChange} />
                        </div>



                        <div className="col-md-9">
                            <AppBar position="static" color="default">
                                <Tabs
                                    name="tabIndex"
                                    value={props.tabIndex}
                                    variant="fullWidth"
                                    onChange={props.handleTabChange}
                                    centered

                                    classes={{
                                        indicator: 'custom-indicator',
                                    }}
                                >
                                    <Tab label="Courses" aria-controls='tabpanel-0' className='font-weight-bold py-4' />
                                    <Tab label="Professors" aria-controls='tabpanel-1' className='font-weight-bold py-4' />
                                </Tabs>
                            </AppBar>

                            <CoursePanel
                                {...props.courses}
                                loading={loading}
                                emptyTable={emptyTable}

                                match={props.match}
                                tabIndex={props.tabIndex}

                                calcTableEdge={props.calcTableEdge}
                                handlePageInc={props.handlePageInc}
                                handleSortChange={props.handleSortChange} />
                            <ProfPanel
                                {...props.profs}
                                loading={loading}
                                emptyTable={emptyTable}

                                match={props.match}
                                tabIndex={props.tabIndex}

                                calcTableEdge={props.calcTableEdge}
                                handlePageInc={props.handlePageInc}
                                handleSortChange={props.handleSortChange} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ResultsComponent