import React from 'react';
import CourseScheduleEntry from './CourseScheduleEntry'
import './../CourseDetails.css'

class CourseSchedule extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            courseSchedule: props.courseSchedule
        }
    }
    
    render() {
        const courseScheduleList = this.state.courseSchedule.map(course => {
            return (
                <CourseScheduleEntry {...course}/>
            )
        })
        return (
            <div className="courseSchedule">
                <h1> Course Schedule </h1>
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
            </div>
        )
    }
	
}

export default CourseSchedule;