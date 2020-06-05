
import React from 'react'
import Loading from './../../_utils/Loading.js'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from './../TabPanel'
import Select from 'react-select'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { StyledRating } from './../../review/_utils/Rating'

function ResultsComponent() {
    let CourseNumberSortIcon = <i className="fas fa-sort"></i>
    let CourseNameSortIcon = <i className="fas fa-sort"></i>
    let ProfNameSortIcon = <i className="fas fa-sort"></i>

    if (this.state.sortBy === 'courseNum') {
        if (this.state.currentSort === 'up') {
            CourseNumberSortIcon = <i className="fas fa-sort-up"></i>
        } else {
            CourseNumberSortIcon = <i className="fas fa-sort-down"></i>
        }
    } else if (this.state.sortBy === 'courseName') {
        if (this.state.currentSort === 'up') {
            CourseNameSortIcon = <i className="fas fa-sort-up"></i>
        } else {
            CourseNameSortIcon = <i className="fas fa-sort-down"></i>
        }
    } else if (this.state.sortBy === 'profName') {
        if (this.state.currentSort === 'up') {
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

    let empty = this.state.noCourses

    let courseTable = (
        <table id='courseResults' className='table table-hover'>
            <thead className='thead-dark'>
                <tr>
                    <th scope="col" onClick={() => this.handleSortChange('courseNum')}>
                        Course Number {CourseNumberSortIcon}
                    </th>
                    <th scope="col" onClick={() => this.handleSortChange('courseName')}>
                        Course Name {CourseNameSortIcon}
                    </th>
                    <th scope="col">
                        Professors
						</th>
                </tr>
            </thead>
            <tbody>
                {this.setData(0)}
            </tbody>
        </table>
    )

    let profTable = (
        <table id='professorResults' className='table table-hover'>
            <thead className='thead-dark'>
                <tr>
                    <th scope="col" onClick={() => this.handleSortChange('profName')}>
                        Professor Name {ProfNameSortIcon}
                    </th>
                    <th scope="col">
                        Courses Taught
								</th>
                </tr>
            </thead>
            <tbody>
                {this.setData(1)}
            </tbody>
        </table>
    )

    let result = (
        <div className="col-lg-9">
            <AppBar position="static" color="default">
                <Tabs
                    value={this.state.currentTab}
                    variant="fullWidth"
                    centered
                    name="currentTab"
                    onChange={this.handleTabChange}
                >
                    <Tab label="Courses" aria-controls='tabpanel-0' />
                    <Tab label="Professors" aria-controls='tabpanel-1' />
                </Tabs>
            </AppBar>

            <TabPanel index={0} value={this.state.currentTab}>
                {this.state.noCourses ? emptyTable : courseTable}
            </TabPanel>

            <TabPanel index={1} value={this.state.currentTab}>
                {this.state.noProfs ? emptyTable : profTable}
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
                <div className='card-header'>
                    Courses:
					</div>
                <div className='card-body'>
                    <div className='form-check'>
                        {/* change to checkbox on right, add handleChange */}
                        <input type='checkbox' className='pull-right form-check-input' onChange={this.handleChange} />
                        <label className='form-check-label'>Current Semester</label>
                    </div>
                    <Select
                        // add deptList, handleDeptChange
                        className="basic-multi-select"
                        classNamePrefix="select"
                        name="dept"
                        options={this.state.deptList}
                        onChange={this.handleDeptChange}
                        placeholder="Select Department..."
                        isClearable={true}
                        isSearchable={true}
                        isMulti
                    />
                    <label> Min Rating: </label>
                    <StyledRating
                        type="rating"
                        value={this.state.minRating}
                        icon={<RadioButtonCheckedIcon />}
                        emptyIcon={<RadioButtonUncheckedIcon />}
                        name="Usefulness"
                        onChange={this.handleChange}
                    />
                    <label>Min Number of Ratings: </label>
                    <input type="range" class="custom-range" min="0" max="500" id="customRange3"></input>

                    {hours}
                    {divisions}

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
        this.state.currentTab === 0 ? courseFilter : profFilter
    )

    let content = (
        <div className='container-fluid'>
            <div className='row'>
                {filter}
                {result}
            </div>
        </div>
    )

    let loaded = this.state.courseLoaded && this.state.profLoaded

    return (
        <div>
            {loaded ? content : loading}
        </div>

    )
}

export default ResultsComponent