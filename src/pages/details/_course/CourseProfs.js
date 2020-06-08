import React from 'react';
import CourseProfEntry from './CourseProfEntry'
import CourseProfExpanded from './CourseProfExpanded'
import './../CourseDetails.css'

class CourseProfs extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            courseProfs: props.courseProfs
        }
    }

    render() {
        const courseProfList = this.state.courseProfs.map(prof => {
            return [
                <CourseProfEntry {...prof} />,
                <CourseProfExpanded {...prof} />
            ]

        })
        return (
            <div className="courseProfs">
                <div className="card">
                    <div className="card-header">
                        <h3> Professors </h3>
                    </div>
                    <div className="card-body">
                        <table className='table table-hover'>
                            <thead className="thead-dark">
                                <tr>
                                    <th className="name-column" scope="col">Name</th>
                                    <th scope="col">Liked</th>
                                    <th scope="col">eCIS</th>
                                    <th scope="col">Clear</th>
                                    <th scope="col">Engaging</th>
                                    <th scope="col">Grading</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseProfList}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        )
    }

}

export default CourseProfs;