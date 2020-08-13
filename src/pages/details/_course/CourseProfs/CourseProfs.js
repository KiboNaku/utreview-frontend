import React from 'react';
import CourseProfEntry from './CourseProfEntry'
import GradeDistributions from './../../../grade-distributions/GradeDistributions'
import './CourseProfs.css'

class CourseProfs extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            courseProfs: props.courseProfs,
            open: true
        }

        this.handleCollapse = this.handleCollapse.bind(this)
    }

    handleCollapse() {
        this.setState((prevState) => ({
            open: !prevState.open
        }))
    }

    render() {
        const courseProfList = this.state.courseProfs.map(prof => {

            return (
                    <CourseProfEntry course={this.props.courseInfo} {...prof} />
                    
            )
        })

        const gradeDistributions = this.state.courseProfs.map(prof =>{
            let courseId = this.props.courseInfo.id
            let profId = prof.id
            return (
                <GradeDistributions isCourse={true} course={this.props.courseInfo} prof={prof} courseId={courseId} profId={profId} />
            )
        })

        let noProfs = (
            <h5 className="none-scheduled">
                No Professors available
            </h5>
        )

        let profTable = (
            <table className='table table-hover table-responsive prof-table' >
                <thead>
                    <tr>
                        <th className="name-column" scope="col">Name</th>
                        <th scope="col">Liked</th>
                        <th scope="col">eCIS</th>
                        <th scope="col">Clear</th>
                        <th scope="col">Engaging</th>
                        <th scope="col">Grading</th>
                        <th scope="col">Syllabi</th>
                        <th scope="col">Grades</th>
                    </tr>
                </thead>
                <tbody>
                    {courseProfList}
                </tbody>
            </table>
        )

        let arrowIcon = this.state.open ? 
        <i className="fas fa-angle-up rotate-icon"></i> : <i className="fas fa-angle-down rotate-icon"></i>
        
        return (
            <div className="courseProfs">
                <div className="card course-card">
                    <div className="card-header course-header" onClick={this.handleCollapse} role="button" data-toggle="collapse" data-target="#profs-collapse">
                        <h4 className="details-header"> Professors {arrowIcon}</h4>
                    </div>
                    <div className="collapse show" id="profs-collapse" role="tabpanel">
                        <div className="card-body card-table">
                            {courseProfList.length > 0 ? profTable: noProfs}
                        </div>
                    </div>
                </div>
                {gradeDistributions}
            </div>
        )
    }
}

export default CourseProfs;