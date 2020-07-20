import React from 'react';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/core/styles';
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
        })
        )
    }

    render() {

        const useStyles = makeStyles((theme) => ({
            indicator: {
                backgroundColor: '#bf5700',
            }
        }));
    
        const classes = useStyles()

        let arrowIcon = this.state.open ? <i className="fas fa-angle-up rotate-icon"></i> : <i className="fas fa-angle-down rotate-icon"></i>
        const profScheduleList = this.state.profSchedule.map(course => {
            return (
                <ProfScheduleEntry {...course} />
            )
        })
        let summer2020 = (
            <table className='table table-hover table-responsive schedule-table'>
                <thead>
                    <tr>
                        <th scope="col">Unique #</th>
                        <th scope="col">Course</th>
                        <th scope="col">Enrolled</th>
                        <th scope="col">Time</th>
                        <th scope="col">Days</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {profScheduleList}
                </tbody>
            </table>
        )

        let fall2020 = (
            <table className='table table-hover table-responsive schedule-table'>
                <thead>
                    <tr>
                        <th scope="col">Unique #</th>
                        <th scope="col">Course</th>
                        <th scope="col">Enrolled</th>
                        <th scope="col">Time</th>
                        <th scope="col">Days</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {profScheduleList}
                </tbody>
            </table>
        )

        let result = (
            <div className="semSchedule">
                <AppBar position="static" color="default">
                    <Tabs
                        inkBarStyle={{backgroundColor: '#68C222', width: '33.3%'}}
                        value={this.state.currentTab}
                        variant="fullWidth"
                        centered
                        name="currentTab"
                        onChange={this.handleTabChange}
                        classes={{
                            indicator:classes.indicator
                        }}
                    >
                        <Tab label="Summer 2020" aria-controls='tabpanel-0' />
                        <Tab label="Fall 2020" aria-controls='tabpanel-1' />
                    </Tabs>
                </AppBar>

                <div className="semSchedule">
                    <TabPanel index={0} value={this.state.currentTab}>
                        {summer2020}
                    </TabPanel>
                </div>

                <div className="semSchedule">
                    <TabPanel index={1} value={this.state.currentTab}>
                        {fall2020}
                    </TabPanel>
                </div>
            </div>

        )

        return (
            <div className="profSchedule">
                <div className="card prof-card">
                    <div className="card-header prof-header" onClick={this.handleCollapse} role="button" data-toggle="collapse" data-target="#profschedule-collapse">
                        <h4 className="details-header"> Course Schedule {arrowIcon}</h4>
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