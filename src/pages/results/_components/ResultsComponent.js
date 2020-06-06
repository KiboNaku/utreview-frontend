import React from 'react'
import Loading from './../../_utils/Loading.js'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from './../TabPanel'
import Select from 'react-select'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { StyledRating } from '../../review/_utils/Rating'
import { hours, divisions } from './FilterComponents'
import "./Results.css"
import "./../../../utcolors.css"

function ResultsComponent(props) {

    let CourseNumberSortIcon = <i className="fas fa-sort"></i>
    let CourseNameSortIcon = <i className="fas fa-sort"></i>
    let ProfNameSortIcon = <i className="fas fa-sort"></i>

    if (props.data.sortBy === 'courseNum') {
        if (props.data.currentSort === 'up') {
            CourseNumberSortIcon = <i className="fas fa-sort-up"></i>
        } else {
            CourseNumberSortIcon = <i className="fas fa-sort-down"></i>
        }
    } else if (props.data.sortBy === 'courseName') {
        if (props.data.currentSort === 'up') {
            CourseNameSortIcon = <i className="fas fa-sort-up"></i>
        } else {
            CourseNameSortIcon = <i className="fas fa-sort-down"></i>
        }
    } else if (props.data.sortBy === 'profName') {
        if (props.data.currentSort === 'up') {
            ProfNameSortIcon = <i className="fas fa-sort-up"></i>
        } else {
            ProfNameSortIcon = <i className="fas fa-sort-down"></i>
        }
    }

    let loading = (
        <Loading />
    )

    let emptyTable = (
        <h6> No results for your search </h6>
    )

    let empty = props.data.noCourses

    let courseTable = (

        <table id='courseResults' className='table table-hover'>
            <thead className='thead-dark'>
                <tr>
                    <th scope="col" onClick={() => props.handleSortChange('courseNum')}>
                        Course Number {CourseNumberSortIcon}
                    </th>
                    <th scope="col" onClick={() => props.handleSortChange('courseName')}>
                        Course Name {CourseNameSortIcon}
                    </th>
                    <th scope="col">
                        Professors
						</th>
                </tr>
            </thead>
            <tbody>
                {props.setData(0)}
            </tbody>
        </table>
    )

    let profTable = (
        <table id='professorResults' className='table table-hover'>
            <thead className='thead-dark'>
                <tr>
                    <th scope="col" onClick={() => props.handleSortChange('profName')}>
                        Professor Name {ProfNameSortIcon}
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

    let result = (
        <div className="col-md-8" style={{ backgroundColor: "green" }}>
            <AppBar position="static" color="default">
                <Tabs
                    value={props.data.currentTab}
                    variant="fullWidth"
                    centered
                    name="currentTab"
                    onChange={props.handleTabChange}
                >
                    <Tab label="Courses" aria-controls='tabpanel-0' />
                    <Tab label="Professors" aria-controls='tabpanel-1' />
                </Tabs>
            </AppBar>

            <TabPanel index={0} value={props.data.currentTab}>
                {props.data.noCourses ? emptyTable : courseTable}
            </TabPanel>

            <TabPanel index={1} value={props.data.currentTab}>
                {props.data.noProfs ? emptyTable : profTable}
            </TabPanel>
        </div>
    )

    let courseFilter = (
        // for courses:
        // current semester (checkbox)
        // department (dropdown select)
        // min rating (rating)
        // min num of ratings (slider)
        // hours (checkbox group)
        // upper/lower div (checkbox group)

        <div className="col-md-4">
            <div className='card'>

                <div className='card-header text-left font-weight-bold'>
                    Course Filters:
				</div>

                <div className='card-body'>
                    <div>

                        <label className="float-left text-left font-weight-bold">Department: </label>
                        <Select
                            // add deptList, handleDeptChange
                            className="basic-multi-select my-3 clear-both"
                            classNamePrefix="select"
                            name="dept"
                            options={props.data.deptList}
                            onChange={props.handleDeptChange}
                            placeholder="Select"
                            isClearable={true}
                            isSearchable={true}
                            isMulti
                        />
                    </div>

                    <div className="form-group my-3">
                        <label className="float-left text-left font-weight-bold">Min rating: </label>
                        <StyledRating
                            className="c-rating float-right"
                            type="rating"
                            value={props.data.minRating}
                            icon={<RadioButtonCheckedIcon />}
                            emptyIcon={<RadioButtonUncheckedIcon />}
                            name="Usefulness"
                            onChange={props.handleChange}
                        />

                    </div>

                    <div class="form-group my-3 clear-both">
                        <label className="float-left text-left font-weight-bold">Min num of ratings:</label>
                        <label className="float-right">(num of ratings)</label>

                        <input type="range" min="0" max="1000" className="c-range form-control-range" />
                    </div>

                    <div className='my-3' style={{ overflow: "auto" }}>
                        {/* change to checkbox on right, add handleChange */}

                        <div>

                            <label className="font-weight-bold text-left float-left">Semester</label>
                            <br />
                            <div class="form-check sem-radio">
                                <input class="form-check-input" type="radio" name="semester" value="" checked />
                                <label class="form-check-labe text-left ">All</label>
                            </div>
                            <br />
                            <div class="form-check sem-radio">
                                <input class="form-check-input" type="radio" name="semester" value="" />
                                <label class="form-check-label text-left ">Current (insert semester)</label>
                            </div>
                            <br />
                            <div class="form-check sem-radio">
                                <input class="form-check-input" type="radio" name="semester" value="" />
                                <label class="form-check-label text-left ">Next (insert semester)</label>
                            </div>

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

    let filter = (
        props.data.currentTab === 0 ? courseFilter : profFilter
    )

    let content = (
        <div className='container-fluid'>
            <div className='row'>
                {filter}
                {result}
            </div>
        </div>
    )

    let loaded = props.data.courseLoaded && props.data.profLoaded

    return (
        <main className="results-main">
            <div className="main-sub">

                <div className="py-5 px-5">
                    {loaded ? content : loading}
                </div>
            </div>
        </main>
    )
}

export default ResultsComponent