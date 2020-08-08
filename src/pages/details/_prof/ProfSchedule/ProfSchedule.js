import React from 'react';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import TabPanel from '../TabPanel'
import ProfScheduleEntry from './ProfScheduleEntry'
import './ProfSchedule.css'

class ProfSchedule extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profSchedule: props.profSchedule,
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
        }))
    }

    render() {

        let arrowIcon = this.state.open ? 
        <i className="fas fa-angle-up rotate-icon"></i> : <i className="fas fa-angle-down rotate-icon"></i>
        
        const currentSemList = this.state.profSchedule.currentSem.map(prof => {
            return (
                <ProfScheduleEntry {...prof} />
            )
        })
        const futureSemList = this.state.profSchedule.futureSem.map(prof => {
            return (
                <ProfScheduleEntry {...prof} />
            )
        })

        let noCourses = (
            <h5 className="none-scheduled">
                This professor is not scheduled for this semester
            </h5>
        )

        let currentSem = (
            <table className='table table-hover table-responsive schedule-table'>
                <thead>
                    <tr>
                        <th scope="col">Unique #</th>
                        <th scope="col">Course</th>
                        <th scope="col">Enrolled</th>
                        <th scope="col">Time</th>
                        <th scope="col">Days</th>
                        <th scope="col">Location</th>
                        <th scope="col">Cross Listed</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSemList}
                </tbody>
            </table>
        )

        let futureSem = (
            <table className='table table-hover table-responsive schedule-table'>
                <thead>
                    <tr>
                        <th scope="col">Unique #</th>
                        <th scope="col">Course</th>
                        <th scope="col">Enrolled</th>
                        <th scope="col">Time</th>
                        <th scope="col">Days</th>
                        <th scope="col">Location</th>
                        <th scope="col">Cross Listed</th>
                    </tr>
                </thead>
                <tbody>
                    {futureSemList}
                </tbody>
            </table>
        )

        let result = (
            <div className="semSchedule">
                <AppBar position="static" color="default">
                    <Tabs
                        inkBarStyle={{ backgroundColor: '#68C222', width: '33.3%' }}
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
                        <Tab label="Summer 2020" aria-controls='tabpanel-0' />
                        <Tab label="Fall 2020" aria-controls='tabpanel-1' />
                    </Tabs>
                </AppBar>

                <div className="semSchedule">
                    <TabPanel index={0} value={this.state.currentTab}>
                        {currentSemList.length > 0 ? currentSem : noCourses}
                    </TabPanel>
                </div>

                <div className="semSchedule">
                    <TabPanel index={1} value={this.state.currentTab}>
                        {futureSemList.length > 0 ? futureSem : noCourses}
                    </TabPanel>
                </div>
            </div>
        )

        return (
            <div className="profSchedule">
                <div className="card prof-card">
                    <div className="card-header prof-header" onClick={this.handleCollapse} role="button" data-toggle="collapse" data-target="#profschedule-collapse">
                        <h4 className="details-header"> Professor Schedule {arrowIcon}</h4>
                    </div>
                    <div className="collapse show" id="profschedule-collapse" role="tabpanel">
                        <div className="card-body card-table">
                            {result}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfSchedule;