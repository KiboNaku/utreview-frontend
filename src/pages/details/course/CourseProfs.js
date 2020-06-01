import React from 'react';
import CourseProfEntry from './CourseProfEntry'
import './CourseDetails.css'

class CourseProfs extends React.Component {
    constructor(){
        super()
        const courseProfs = [
            {
                key: 1,
                firstName: 'Emanuel',
                lastName: 'Tutuc',
                percentLiked: 70,
                eCIS: 4.2
            },
            {   
                key: 2,
                firstName: 'Yale',
                lastName: 'Patt',
                percentLiked: 32,
                eCIS: 3.6
            },
            {   
                key: 3,
                firstName: 'Seth',
                lastName: 'Bank',
                percentLiked: 85,
                eCIS: 4.8
            },
        ]
        this.state = {
            courseProfs: courseProfs
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