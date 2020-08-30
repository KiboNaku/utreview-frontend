import React from 'react';
import PropTypes from 'prop-types';
import ProfCourseEntry from './ProfCourseEntry'
import GradeDistributions from './../../../grade-distributions/GradeDistributions'
import './ProfCourses.css'

const propTypes = {

    // contains information of the prof
    profInfo: PropTypes.shape({
        // id of the prof
        id: PropTypes.number.isRequired,

        // first name of the prof
        firstName: PropTypes.string.isRequired,

        // last name of the prof
        lastName: PropTypes.string.isRequired,

        // the median grade that the prof gives with all courses factored in
        medianGrade: PropTypes.string.isRequired,

        // scrolls to the review section of the page
        handleScrollToReview: PropTypes.func.isRequired
    }),
    
    // the department that the course taught by the prof is in
    courseDept: PropTypes.string.isRequired,

    // percentage of students who liked the prof
    courseNum: PropTypes.string.isRequired,

    // average rating for the clearness for the prof
    topicNum: PropTypes.number,

    // percentage of people who liked the course taught by the prof
    percentLiked: PropTypes.number,

    // average rating for difficulty of the course taught by the prof
    difficulty: PropTypes.number,
    
    // average rating for usefulness of the course taught by the prof
    usefulness: PropTypes.number,

    // average rating for workload of the course taught by the prof
    workload: PropTypes.number,

    // average rating for eCIS of the course taught by the prof
    eCIS: PropTypes.number
}

class ProfCourses extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profCourses: props.profCourses,
            sortBy: 'courseName',
            sortDir: 'down',
            open: true
        }

        // allow the tables to be sorted and minimized
        this.handleCollapse = this.handleCollapse.bind(this)
        this.handleSortChange = this.handleSortChange.bind(this)
    }

    // sorts the courses by a specific value (name, liked, ecis, usefulness, difficulty, workload)
    handleSortChange(sortByName){
        let nextSort
        if (this.state.sortBy !== sortByName) nextSort = 'down';
        else if (this.state.sortDir === 'down') nextSort = 'up';
        else if (this.state.sortDir === 'up') nextSort = 'down';

        this.setState({
            sortBy: sortByName,
            sortDir: nextSort
        })
    }

    // compare a specific value (name, liked, ecis, usefulness, difficulty, workload) to sort the courses
    sortRows(a, b) {

        const sortBy = this.state.sortBy

        if (this.state.profCourses.length >= 0) {

            switch (sortBy) {
                case 'courseName':
                    let courseNameA = a.courseDept + " " + a.courseNum
                    let courseNameB = b.courseDept + " " + b.courseNum
                    return courseNameB.localeCompare(courseNameA)
                case 'courseECIS':
                    if (a.eCIS !== null && b.eCIS !== null) return a.eCIS - b.eCIS
                    else if (a.eCIS === null && b.eCIS !== null) {
                        if (this.state.sortDir === 'up') return 1
                        else return -1
                    }
                    else if (a.eCIS !== null && b.eCIS === null) {
                        if (this.state.sortDir === 'up') return -1
                        else return 1
                    }
                    else return 0
                case 'courseApproval':
                    if (a.percentLiked !== null && b.percentLiked !== null) return a.percentLiked - b.percentLiked
                    else if (a.percentLiked === null && b.percentLiked !== null) {
                        if (this.state.sortDir === 'up') return 1
                        else return -1
                    }
                    else if (a.percentLiked !== null && b.percentLiked === null) {
                        if (this.state.sortDir === 'up') return -1
                        else return 1
                    }
                    else return 0
                case 'courseUsefulness':
                    if (a.usefulness !== null && b.usefulness !== null) return a.usefulness - b.usefulness
                    else if (a.usefulness === null && b.usefulness !== null) {
                        if (this.state.sortDir === 'up') return 1
                        else return -1
                    }
                    else if (a.usefulness !== null && b.usefulness === null) {
                        if (this.state.sortDir === 'up') return -1
                        else return 1
                    }
                    else return 0
                case 'courseDifficulty':
                    if (a.difficulty !== null && b.difficulty !== null) return a.difficulty - b.difficulty
                    else if (a.difficulty === null && b.difficulty !== null) {
                        if (this.state.sortDir === 'up') return 1
                        else return -1
                    }
                    else if (a.difficulty !== null && b.difficulty === null) {
                        if (this.state.sortDir === 'up') return -1
                        else return 1
                    }
                    else return 0
                case 'courseWorkload':
                    if (a.workload !== null && b.workload !== null) return a.workload - b.workload
                    else if (a.workload === null && b.workload !== null) {
                        if (this.state.sortDir === 'up') return 1
                        else return -1
                    }
                    else if (a.workload !== null && b.workload === null) {
                        if (this.state.sortDir === 'up') return -1
                        else return 1
                    }
                    else return 0
                case 'courseRatings':
                    return a.numRatings - b.numRatings
                default:
                    return null;
            }
        }

        return null;
    }

    handleCollapse() {
        this.setState((prevState) => ({
            open: !prevState.open
        }))
    }

    render() {

        // direction of the sort
        const sortTypes = {
            up: {
                class: 'sortUp',
                fn: (a, b) => this.sortRows(a, b)
            },
            down: {
                class: 'sortDown',
                fn: (a, b) => this.sortRows(b, a)
            },
            default: {
                class: 'sort',
                fn: (a, b) => a
            }
        }
    
        this.state.profCourses.sort(sortTypes[this.state.sortDir].fn)

        const profCourseList = this.state.profCourses.map(course => {
            return (
                <ProfCourseEntry prof={this.props.profInfo} {...course} />

            )

        })

        const gradeDistributions = this.state.profCourses.map(course => {
            return (
                <GradeDistributions isCourse={false} course={course} prof={this.props.profInfo} courseId={course.id} profId={this.props.profInfo.id} />
            )
        })
        let noCourses = (
            <h5 className="none-scheduled">
                No courses available
            </h5>
        )

        // table containing all the courses that the prof teaches with their ratings
        let courseTable = (
            <table className='table table-hover table-responsive prof-table' style={{border: "none"}} >
                <thead>
                    <tr>
                    <th className="sortable" scope="col" onClick={() => this.handleSortChange('courseName')}>
                            <span>Course</span>
                            <i className={'pl-3 fas fa-sort-' + this.state.sortDir + (this.state.sortBy === 'courseName' ? '' : ' invisible')}></i>
                        </th>
                        <th className="sortable" scope="col" onClick={() => this.handleSortChange('courseApproval')}>
                            <span>Liked</span>
                            <i className={'pl-3 fas fa-sort-' + this.state.sortDir + (this.state.sortBy === 'courseApproval' ? '' : ' invisible')}></i>
                        </th>
                        <th className="sortable" scope="col" onClick={() => this.handleSortChange('courseECIS')}>
                            <span>eCIS</span>
                            <i className={'pl-3 fas fa-sort-' + this.state.sortDir + (this.state.sortBy === 'courseECIS' ? '' : ' invisible')}></i>
                        </th>
                        <th className="sortable" scope="col" onClick={() => this.handleSortChange('courseUsefulness')}>
                            <span>Usefulness</span>
                            <i className={'pl-3 fas fa-sort-' + this.state.sortDir + (this.state.sortBy === 'courseUsefulness' ? '' : ' invisible')}></i>
                        </th>
                        <th className="sortable" scope="col" onClick={() => this.handleSortChange('courseDifficulty')}>
                            <span>Difficulty</span>
                            <i className={'pl-3 fas fa-sort-' + this.state.sortDir + (this.state.sortBy === 'courseDifficulty' ? '' : ' invisible')}></i>
                        </th>
                        <th className="sortable" scope="col" onClick={() => this.handleSortChange('courseWorkload')}>
                            <span>Workload</span>
                            <i className={'pl-3 fas fa-sort-' + this.state.sortDir + (this.state.sortBy === 'courseWorkload' ? '' : ' invisible')}></i>
                        </th>
                        <th scope="col">Syllabi</th>
                        <th scope="col">Grades</th>
                    </tr>
                </thead>
                <tbody>
                    {profCourseList}
                </tbody>
            </table>
        )
        let arrowIcon = this.state.open ? <i className="fas fa-angle-up rotate-icon"></i> : <i className="fas fa-angle-down rotate-icon"></i>
        return (
            <div>
                <div className="courseProfs prof-courses">
                    <div className="course-card">
                        <div className="card-header course-header" onClick={this.handleCollapse} role="button" data-toggle="collapse" data-target="#courses-collapse">
                            <h4 className="details-header"> Courses {arrowIcon}</h4>
                        </div>
                        <div className="collapse show" id="courses-collapse" role="tabpanel">
                            <div className="card-body card-table" style={{border: "none"}}>
                                {profCourseList.length > 0 ? courseTable : noCourses}
                            </div>
                        </div>

                    </div>
                </div>
                {gradeDistributions}
            </div>
        )
    }

}

ProfCourses.props = propTypes;

export default ProfCourses;