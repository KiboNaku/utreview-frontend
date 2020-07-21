import React from 'react';
import ProfCourseEntry from './ProfCourseEntry'
import './ProfCourses.css'

class ProfCourses extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profCourses: props.profCourses,
            open: true
        }

        this.handleCollapse = this.handleCollapse.bind(this)
    }

    handleCollapse() {
        this.setState((prevState) => ({
            open: !prevState.open
        })
        )
    }

    render() {
        const profCourseList = this.state.profCourses.map(course => {
            return [
                <ProfCourseEntry prof={this.props.profInfo} {...course} />,
            ]

        })
        let noCourses = (
            <h5 className="none-scheduled">
                No courses available
            </h5>
        )

        let courseTable = (
            <table className='table table-hover table-responsive course-table' >
                <thead>
                    <tr>
                        <th className="name-column" scope="col">Course</th>
                        <th scope="col">Liked</th>
                        <th scope="col">eCIS</th>
                        <th scope="col">Difficulty</th>
                        <th scope="col">Usefulness</th>
                        <th scope="col">Workload</th>
                        <th scope="col">Syllabi</th>
                        <th scope="col">Catalyst</th>
                    </tr>
                </thead>
                <tbody>
                    {profCourseList}
                </tbody>
            </table>
        )
        let arrowIcon = this.state.open ? <i className="fas fa-angle-up rotate-icon"></i> : <i className="fas fa-angle-down rotate-icon"></i>
        return (
            <div className="profCourses">
                <div className="card prof-card">
                    <div className="card-header prof-header" onClick={this.handleCollapse} role="button" data-toggle="collapse" data-target="#courses-collapse">
                        <h4 className="details-header"> Courses {arrowIcon}</h4>
                    </div>
                    <div className="collapse show" id="courses-collapse" role="tabpanel">
                        <div className="card-body card-table">
                            {profCourseList.length > 0 ? courseTable: noCourses}
                        </div>
                    </div>

                </div>

            </div>
        )
    }

}

export default ProfCourses;