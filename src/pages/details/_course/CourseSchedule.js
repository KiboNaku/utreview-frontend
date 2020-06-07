import React from 'react';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import TabPanel from './../../results/TabPanel'
import CourseScheduleEntry from './CourseScheduleEntry'
import './../CourseDetails.css'

class CourseSchedule extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            courseSchedule: props.courseSchedule,
            currentTab: 0
        }

        this.handleTabChange = this.handleTabChange.bind(this)
    }

    handleTabChange(event, newValue) {
        this.setState({ currentTab: newValue })
    }

    render() {
        const courseScheduleList = this.state.courseSchedule.map(course => {
            return (
                <CourseScheduleEntry {...course} />
            )
        })
        let summer2020 = (
            <table className='table table-hover'>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Unique Number</th>
                        <th scope="col">Enrolled</th>
                        <th scope="col">Time</th>
                        <th scope="col">Days</th>
                        <th scope="col">Location</th>
                        <th scope="col">Professor</th>
                    </tr>
                </thead>
                <tbody>
                    {courseScheduleList}
                </tbody>
            </table>
        )

        let fall2020 = (
            <table className='table table-hover'>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Unique Number</th>
                        <th scope="col">Enrolled</th>
                        <th scope="col">Time</th>
                        <th scope="col">Days</th>
                        <th scope="col">Location</th>
                        <th scope="col">Professor</th>
                    </tr>
                </thead>
                <tbody>
                    {courseScheduleList}
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
                        <Tab label="Summer 2020" aria-controls='tabpanel-0' />
                        <Tab label="Fall 2020" aria-controls='tabpanel-1' />
                    </Tabs>
                </AppBar>

                <TabPanel index={0} value={this.state.currentTab}>
                    {summer2020}
                </TabPanel>

                <TabPanel index={1} value={this.state.currentTab}>
                    {fall2020}
                </TabPanel>
            </div>
        )

        return (
            <div className="courseSchedule">
                <h1> Course Schedule </h1>
                {result}
            </div>
        )
    }

}

export default CourseSchedule;