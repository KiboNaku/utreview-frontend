import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import CoursePanel from '../_utils/CoursePanel'
import CourseFilter from "../_utils/CourseFilter"
import ProfFilter from "../_utils/ProfFilter"
import Loading from './../../_utils/Loading.js'
import ProfPanel from '../_utils/ProfPanel'

function ResultsComponent(props) {

    let loading = <Loading />

    let emptyTable = (
        <h6> No results for your search. Please check your spelling and try again.</h6>
    )

    let numCourseResults = props.courses.loaded ? "(" + props.courses.filtered.length.toString() + ")" : ""
    let numProfResults = props.profs.loaded ? "(" + props.profs.filtered.length.toString() + ")" : ""
    let courseLabel = "Courses " + numCourseResults
    let profLabel = "Professors " + numProfResults
    
    let minNumRatings = [0, 1, 5, 10]
    let filter = <CourseFilter filter={props.courses.filter} minNumRatings={minNumRatings} depts={props.depts} handleFilterChange={props.handleFilterChange} />
    if(props.tabIndex === 1){
        filter = <ProfFilter  filter={props.profs.filter} minNumRatings={minNumRatings} depts={props.depts} handleFilterChange={props.handleFilterChange} />
    }

    return (
        <main className="results-main py-3">
            <div className="main-sub">
                <div className='container-fluid'>

                    <div className="py-3 px-3 mb-2 search-banner">
                        <h3>Showing results for '{props.search}'</h3>
                    </div>

                    <div className='row'>

                        <div className="col-md-3">
                            {filter}
                        </div>

                        <div className="col-md-9">
                            <AppBar position="static" color="default">
                                <Tabs
                                    name="tabIndex"
                                    value={props.tabIndex}
                                    variant="fullWidth"
                                    onChange={props.handleTabChange}
                                    centered
                                    TabIndicatorProps={{
                                        style: {
                                            backgroundColor: '#bf5700'
                                        }
                                    }}
                                >
                                    <Tab label={courseLabel} aria-controls='tabpanel-0' className='font-weight-bold py-4' />
                                    <Tab label={profLabel} aria-controls='tabpanel-1' className='font-weight-bold py-4' />
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
                                handleSortChange={props.handleSortChange}
                                isSemester={props.isSemester}
                                isHour={props.isHour} 
                                isDivision={props.isDivision}/>
                            <ProfPanel
                                {...props.profs}
                                loading={loading}
                                emptyTable={emptyTable}

                                match={props.match}
                                tabIndex={props.tabIndex}

                                calcTableEdge={props.calcTableEdge}
                                handlePageInc={props.handlePageInc}
                                handleSortChange={props.handleSortChange}
                                isSemester={props.isSemester} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ResultsComponent