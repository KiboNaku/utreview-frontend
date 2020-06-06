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
        <h1> No results for your search </h1>
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
        <div className="col-lg-9">
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

        <div className="col-lg-3">
            <div className='card'>

                <div className='card-header text-left'>
                    Course Filters:
				</div>

                <div className='card-body'>

                    <Select
                        // add deptList, handleDeptChange
                        className="basic-multi-select"
                        classNamePrefix="select"
                        name="dept"
                        options={props.data.deptList}
                        onChange={props.handleDeptChange}
                        placeholder="Select Department"
                        isClearable={true}
                        isSearchable={true}
                        isMulti
                    />

                    <div className='form-check'>
                        {/* change to checkbox on right, add handleChange */}
                        <input type='checkbox' className='pull-right form-check-input' onChange={props.handleChange} />
                        <label className='form-check-label'>Current Semester</label>
                    </div>
                    <label> Min Rating: </label>
                    <StyledRating
                        type="rating"
                        value={props.data.minRating}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="Usefulness"
                        onChange={props.handleChange}
                    />
                    <label>Min Number of Ratings: </label>
                    <input type="range" class="custom-range" min="0" max="500" id="customRange3"></input>

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
            {loaded ? content : loading}
        </main>
    )
}

export default ResultsComponent