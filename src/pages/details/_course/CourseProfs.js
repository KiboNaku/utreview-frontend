import React from 'react';
import CourseProfEntry from './CourseProfEntry'
import './../CourseDetails.css'

class CourseProfs extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            courseProfs: props.courseProfs
        }
    }
    
    render() {
        const courseProfList = this.state.courseProfs.map(prof => {
            return (
                <CourseProfEntry {...prof}/>
            )
        })
        return (
            <div className="courseProfs">
                <h1> Professors </h1>
                <table className='table table-hover'>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Liked</th>
                            <th scope="col">eCIS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseProfList}
                    </tbody>
                </table>
            </div>
        )
    }
	
}

export default CourseProfs;