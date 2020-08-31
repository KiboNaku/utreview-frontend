import React from 'react';
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import TabPanel from '../TabPanel'
import { getSemester } from './../../../popups/_utils/UserFunctions'
import CourseScheduleEntry from './CourseScheduleEntry'
import './CourseSchedule.css'

const propTypes = {
    courseSchedule: PropTypes.shape({
        
        // list of courses scheduled for the current semester
        currentSem: PropTypes.arrayOf(
            PropTypes.shape({
                // id of the scheduled course instance
                id: PropTypes.number.required,

                // unique number of the scheduled course
                uniqueNum: PropTypes.number.required,

                // string representation of the days of the week the lecture is held
                days: PropTypes.string,

                // string representation of the time of day the lecture starts
                timeFrom: PropTypes.string,

                // string representation of the time of day the lecture ends
                timeTo: PropTypes.string,

                // max number of seats allowed for the course
                maxEnrollment: PropTypes.number,

                // number of seats currently taken for the course
                seatsTaken: PropTypes.number,

                // location of the lecture (building and room number or Online)
                location: PropTypes.string,

                // id of the prof teaching the course
                profId: PropTypes.number,

                // first name of the prof teaching the course
                profFirst: PropTypes.string,

                // last name of the prof teaching the course
                profLast: PropTypes.string,

                // string representation of the semester the course is scheduled for
                semester: PropTypes.string,

                // year the course is scheduled for
                year: PropTypes.number,

                // list of courses the course is cross listed with
                crossListed: PropTypes.arrayOf(
                    PropTypes.shapeOf({
                        // id of the cross listed course
                        id: PropTypes.number,

                        // department abbreviation of the cross listed course
                        dept: PropTypes.string,

                        // cross listed course number
                        num: PropTypes.string,

                        // title of the cross listed course
                        title: PropTypes.string,

                        // topic number of the cross listed course
                        topicNum: PropTypes.number
                    })
                )
            })
        ),

        // list of courses scheduled for the future semester
        futureSem: PropTypes.arrayOf(
            PropTypes.shape({
                // id of the scheduled course instance
                id: PropTypes.number.required,

                // unique number of the scheduled course
                uniqueNum: PropTypes.number.required,

                // string representation of the days of the week the lecture is held
                days: PropTypes.string,

                // string representation of the time of day the lecture starts
                timeFrom: PropTypes.string,

                // string representation of the time of day the lecture ends
                timeTo: PropTypes.string,

                // max number of seats allowed for the course
                maxEnrollment: PropTypes.number,

                // number of seats currently taken for the course
                seatsTaken: PropTypes.number,

                // location of the lecture (building and room number or Online)
                location: PropTypes.string,

                // id of the prof teaching the course
                profId: PropTypes.number,

                // first name of the prof teaching the course
                profFirst: PropTypes.string,

                // last name of the prof teaching the course
                profLast: PropTypes.string,

                // string representation of the semester the course is scheduled for
                semester: PropTypes.string,

                // year the course is scheduled for
                year: PropTypes.number,

                // list of courses the course is cross listed with
                crossListed: PropTypes.arrayOf(
                    PropTypes.shape({
                        // id of the cross listed course
                        id: PropTypes.number,

                        // department abbreviation of the cross listed course
                        dept: PropTypes.string,

                        // cross listed course number
                        num: PropTypes.string,

                        // title of the cross listed course
                        title: PropTypes.string,

                        // topic number of the cross listed course
                        topicNum: PropTypes.number
                    })
                )
            })
        ),
    }),
}

class CourseSchedule extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // list of course schedule instances for the specific course
            courseSchedule: props.courseSchedule,

            // string representation of the current semester
            currentSem: "Fall 2020",

            // string representation of the future semester
            futureSem: "Spring 2021",

            // indicates whether the current semester tab or the future semester tab is showing
            currentTab: 0,

            // indicates whether the component is collapsed or showing
            open: true
        }

        this.handleCollapse = this.handleCollapse.bind(this)
        this.handleTabChange = this.handleTabChange.bind(this)
    }

    handleTabChange(event, newValue) {
        // changes the current tab to the one the user clicked on
        this.setState({ currentTab: newValue })
    }

    handleCollapse() {
        // handles the collapsing and opening of the component
        this.setState((prevState) => ({
            open: !prevState.open
        }))
    }

    componentDidMount(){
        // get current and future semester values
        getSemester().then(res => {
			this.setState({currentSem: res['current'], futureSem: res['next']})
		})
    }

    render() {

        let arrowIcon = this.state.open ? 
        <i className="fas fa-angle-up rotate-icon"></i> : <i className="fas fa-angle-down rotate-icon"></i>
        
        // create a CourseScheduleEntry component for each instance in the current semester
        const currentSemList = this.state.courseSchedule.currentSem !== null ? this.state.courseSchedule.currentSem.map(course => {
            return (
                <CourseScheduleEntry {...course} />
            )
        }) : null

        // create a CourseScheduleEntry component for each instance in the future semester
        const futureSemList = this.state.courseSchedule.futureSem !== null ? this.state.courseSchedule.futureSem.map(course => {
            return (
                <CourseScheduleEntry {...course} />
            )
        }) : null

        // generate a component to show when the course schedule has not been released for that semester
        let unavailableCourses = (
            <h5 className="none-scheduled">
                The course schedule is not available yet for this semester <br></br><br></br>
            </h5>
        )
        
        // generate a component to show when there are no courses scheduled for that semester
        let noCourses = (
            <h5 className="none-scheduled">
                This course is not scheduled for this semester <br></br><br></br>
            </h5>
        )
        
        // generate the current semester course schedule table
        let currentSem = (
            <table className='table table-hover table-responsive schedule-table'>
                <thead>
                    <tr>
                        <th scope="col">Unique #</th>
                        <th scope="col">Professor</th>
                        <th scope="col">Enrolled</th>
                        <th scope="col">Time</th>
                        <th scope="col">Days</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSemList}
                </tbody>
            </table>
        )
        
        // generate the future semester course schedule table
        let futureSem = (
            <table className='table table-hover table-responsive schedule-table'>
                <thead>
                    <tr>
                        <th scope="col">Unique #</th>
                        <th scope="col">Professor</th>
                        <th scope="col">Enrolled</th>
                        <th scope="col">Time</th>
                        <th scope="col">Days</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {futureSemList}
                </tbody>
            </table>
        )
        
        // generate the overall component, with tabs for each semester
        let result = (
            <div className="semSchedule">
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.currentTab}
                        variant="fullWidth"
                        centered
                        name="currentTab"
                        onChange={this.handleTabChange}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: '#bf5700'
                            }
                        }}
                    >
                        <Tab className="schedule-tabs" label={this.state.currentSem} aria-controls='tabpanel-0' />
                        <Tab className="schedule-tabs" label={this.state.futureSem} aria-controls='tabpanel-1' />
                    </Tabs>
                </AppBar>

                <div className="semSchedule">
                    <TabPanel index={0} value={this.state.currentTab}>
                        {currentSemList !== null ? (currentSemList.length > 0 ? currentSem : noCourses) : unavailableCourses}
                    </TabPanel>
                </div>

                <div className="semSchedule">
                    <TabPanel index={1} value={this.state.currentTab}>
                        {futureSemList !== null ? (futureSemList.length > 0 ? futureSem : noCourses) : unavailableCourses}
                    </TabPanel>
                </div>
            </div>
        )

        return (
            <div className="courseSchedule">
                <div className="course-card">
                    <div className="card-header course-header" /*onClick={this.handleCollapse} role="button" data-toggle="collapse" data-target="#schedule-collapse"*/>
                        <h4 className="details-header"> Course Schedule</h4>
                    </div>
                    <div className="collapse show" id="schedule-collapse" role="tabpanel">
                        <div className="card-body card-table">
                            {result}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CourseSchedule.propTypes = propTypes

export default CourseSchedule;