import React from 'react';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import TabPanel from '../_utils/TabPanel'
import UserCourseEntry from './UserCourseEntry'

class UserCourses extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userCourses: props.userCourses,
            currentTab: 0,
            open: true
        }

        this.handleCollapse = this.handleCollapse.bind(this)
        this.handleTabChange = this.handleTabChange.bind(this)
    }

    handleTabChange(event, newValue) {
        this.setState({ currentTab: newValue })
    }

    handleCollapse() {
        this.setState((prevState) => ({
            open: !prevState.open
        })
        )
    }

    render() {

        let arrowIcon = this.state.open ? <i className="fas fa-angle-up rotate-icon"></i> : <i className="fas fa-angle-down rotate-icon"></i>
        const semestersList = this.state.userCourses.map(semester =>{
            const currentSemList = semester.courses.map(course => {
                return (
                    <UserCourseEntry semester={semester.semester} year={semester.year} {...course} />
                )
            })
            return (
                    <table className='table table-hover table-responsive schedule-table'>
                        <thead>
                            <tr>
                                <th scope="col">Unique #</th>
                                <th scope="col">Course</th>
                                <th scope="col">Professor</th>
                                <th scope="col">Add Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSemList}
                        </tbody>
                    </table>
            )
        })
        
        let noCourses = (
            <h5 className="none-scheduled">
                This course is not scheduled for this semester
            </h5>
        )

        let semesterTabs = this.state.userCourses.map(semester =>{
            return (
                <Tab className="schedule-tabs" label={semester.semester + ' ' + semester.year} aria-controls={`tabpanel-${semester.index}`} />
            )
        })

        let semesterContent = this.state.userCourses.map(semester => {
            return (
                <div className="semSchedule">
                    <TabPanel index={semester.index} value={this.state.currentTab}>
                        {semestersList[semester.index]}
                    </TabPanel>
                </div>
            )
        })

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
                        {semesterTabs}
                    </Tabs>
                </AppBar>

                {semesterContent}
            </div>

        )

        return (
            <div className="courseSchedule">
                <div className="card course-card">
                    <div className="card-header course-header" onClick={this.handleCollapse} role="button" data-toggle="collapse" data-target="#schedule-collapse">
                        <h4 className="details-header"> Your Courses {arrowIcon}</h4>
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

export default UserCourses;