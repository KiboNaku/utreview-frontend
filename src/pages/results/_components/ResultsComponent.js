import React from 'react'
import Loading from './../../_utils/Loading.js'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from '../_utils/TabPanel'
import Select from 'react-select'
import "./../../../utcolors.css"
import CoursePanel from '../_utils/CoursePanel'

function ResultsComponent(props) {

    let sortBy = props.data.sortBy
    let sortDir = props.data.sortDir

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

    let courseTable = (

        <table id='courseResults' className='table table-hover result-table'>
            <thead className='thead-dark'>
                <tr rowSpan="2">

                    <th scope="col" colSpan="1" className="sortable float-left" onClick={() => props.handleSortChange('courseNum')}>
                        <span>Course #</span>
                        <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'courseNum' ? '' : ' invisible')}></i>
                    </th>

                    <th scope="col" colSpan="2" className="sortable float-left" onClick={() => props.handleSortChange('courseName')}>
                        <span>Course Name</span>
                        <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'courseName' ? '' : ' invisible')}></i>
                    </th>

                    <th scope="col" colSpan="1" className="sortable float-left" onClick={() => console.log("No sort for approval")}>
                        <span>Approval</span>
                        <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'approval' ? '' : ' invisible')}></i>
                    </th>

                    <th scope="col" colSpan="1" className="sortable float-left" onClick={() => console.log("No sort for num ratings")}>
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

    let profTable = (
        <table id='professorResults' className='table table-hover result-table'>
            <thead className='thead-dark'>
                <tr>
                    <th scope="col" className="sortable" onClick={() => props.handleSortChange('profName')}>
                        <span>Professor Name</span>
                        <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'profName' ? '' : ' invisible')}></i>
                    </th>
                    <th scope="col">
                        Courses Taught
								</th>
                </tr>
            </thead>
            <tbody>
                {props.setData(1)}
            </tbody>
        </table>
    )

    let filter = (
        // for courses:
        // current semester (checkbox)
        // department (dropdown select)
        // min rating (rating)
        // min num of ratings (slider)
        // hours (checkbox group)
        // upper/lower div (checkbox group)

        <div className="col-md-3">
            <div className='card'>

                <div className='card-header text-left font-weight-bold'>
                    Course Filters:
				</div>

                <div className='card-body'>

                    {/* department filter */}
                    <div>
                        
                        <label className="float-left text-left font-weight-bold">Department: </label>
                        <Select
                            // add deptList, handleDeptChange
                            className="basic-multi-select my-3 clear-both"
                            classNamePrefix="select"
                            name="dept"
                            options={props.data.depts}
                            onChange={(objs, action) => {

                                let values = [];

                                if (objs != null) {
                                    for (let i = 0; i < objs.length; i++) {
                                        values[i] = objs[i].value
                                    }
                                }

                                props.handleFilterChange(values)
                            }}
                            placeholder="Select"
                            isClearable={true}
                            isSearchable={true}
                            isMulti
                        />
                    </div>

                    {/* min approval filter */}
                    <div className="form-group my-3">
                        <label className="float-left text-left font-weight-bold">Min approval:</label>
                        <label className="float-right">{props.data.filter.f_mApp}%</label>

                        <input type="range" min="0" max="90" step="10" className="c-range form-control-range"
                            value={props.data.filter.f_mApp}
                            onChange={(event)=>{props.handleFilterChange(null, event.target.value)}} />
                    </div>

                    {/* min num of approvals filter */}
                    <div className="form-group my-3 clear-both">
                        <label className="float-left text-left font-weight-bold">Min # of approvals:</label>
                        <label className="float-right">{props.data.filter.f_mNum}</label>

                        <input type="range" min="0" max="1000" className="c-range form-control-range" step="100"
                            value={props.data.filter.f_mNum}
                            onChange={(event)=>{props.handleFilterChange(null, -1, event.target.value)}}/>
                    </div>

                    {/* semester filter */}
                    <div className='form-group my-3 clear-both' style={{ overflow: "auto" }}>

                        <label className="font-weight-bold text-left float-left">Semester</label>
                        <br />
                        <div className="form-check sem-radio">
                            <input className="form-check-input mb-0" type="radio" name="semester" value="all"
                                checked={props.data.filter.f_sem == "all"} onClick={()=>{props.handleFilterChange(null, -1, -1, "all")}} />
                            <label className="form-check-labe text-left mb-0 ">All</label>
                        </div>
                        <br />
                        <div className="form-check sem-radio">
                            <input className="form-check-input" type="radio" name="semester" value="current"
                                checked={props.data.filter.f_sem == "current"} onClick={()=>{props.handleFilterChange(null, -1, -1, "current")}} />
                            <label className="form-check-label text-left ">Current (insert semester)</label>
                        </div>
                        <br />
                        <div className="form-check sem-radio">
                            <input className="form-check-input" type="radio" name="semester" value="next"
                                checked={props.data.filter.f_sem == "next"} onClick={()=>{props.handleFilterChange(null, -1, -1, "next")}} />
                            <label className="form-check-label text-left ">Next (insert semester)</label>
                        </div>
                    </div>
                    {/* {hours} */}
                    {/* {divisions} */}

                </div>
            </div>
        </div>
    )

    let profFilter = (

        // for profs:
        // current semester (checkbox)
        // min rating (rating)
        // min num of ratings (slider)
        <div className="col-lg-3">
            <div className='card'>
                <div className='card-header'>
                    Professor:
					</div>
            </div>
        </div>
    )

    let loaded = props.data.courseLoaded && props.data.profLoaded

    return (
        <main className="results-main py-3">
            <div className="main-sub">
                <div className='container-fluid'>

                    <div className="py-3 px-3 mb-2 search-banner">
                        <h3>Results for '{props.search}'</h3>
                    </div>

                    <div className='row'>

                        {filter}

                        <div className="col-md-9">
                            <AppBar position="static" color="default">
                                <Tabs
                                    value={props.data.currentTab}
                                    variant="fullWidth"
                                    centered
                                    name="currentTab"
                                    onChange={props.handleTabChange}
                                >
                                    <Tab label="Courses" aria-controls='tabpanel-0' className='font-weight-bold py-4' />
                                    <Tab label="Professors" aria-controls='tabpanel-1' className='font-weight-bold py-4' />
                                </Tabs>
                            </AppBar>

                            <CoursePanel {...props} />

                            <TabPanel index={1} value={props.data.currentTab}>
                                {loaded ? (props.data.noProfs ? emptyTable : profTable) : loading}
                            </TabPanel>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ResultsComponent