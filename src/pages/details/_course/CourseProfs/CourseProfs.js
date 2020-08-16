import React from 'react';
import CourseProfEntry from './CourseProfEntry'
import GradeDistributions from './../../../grade-distributions/GradeDistributions'
import './CourseProfs.css'

class CourseProfs extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            courseProfs: props.courseProfs,
            sortBy: 'profName',
            sortDir: 'down',
            open: true
        }

        this.handleCollapse = this.handleCollapse.bind(this)
        this.handleSortChange = this.handleSortChange.bind(this)
    }

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

    sortRows(a, b) {

        const sortBy = this.state.sortBy

        if (this.state.courseProfs.length >= 0) {

            switch (sortBy) {
                case 'profName':
                    let profNameA = a.firstName + " " + a.lastName
                    let profNameB = b.firstName + " " + b.lastName
                    return profNameB.localeCompare(profNameA)
                case 'profECIS':
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
                case 'profApproval':
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
                case 'profClear':
                    if (a.clear !== null && b.clear !== null) return a.clear - b.clear
                    else if (a.clear === null && b.clear !== null) {
                        if (this.state.sortDir === 'up') return 1
                        else return -1
                    }
                    else if (a.clear !== null && b.clear === null) {
                        if (this.state.sortDir === 'up') return -1
                        else return 1
                    }
                    else return 0
                case 'profEngaging':
                    if (a.engaging !== null && b.engaging !== null) return a.engaging - b.engaging
                    else if (a.engaging === null && b.engaging !== null) {
                        if (this.state.sortDir === 'up') return 1
                        else return -1
                    }
                    else if (a.engaging !== null && b.engaging === null) {
                        if (this.state.sortDir === 'up') return -1
                        else return 1
                    }
                    else return 0
                case 'profGrading':
                    if (a.grading !== null && b.grading !== null) return a.grading - b.grading
                    else if (a.grading === null && b.grading !== null) {
                        if (this.state.sortDir === 'up') return 1
                        else return -1
                    }
                    else if (a.grading !== null && b.grading === null) {
                        if (this.state.sortDir === 'up') return -1
                        else return 1
                    }
                    else return 0
                case 'profRatings':
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
    
        this.state.courseProfs.sort(sortTypes[this.state.sortDir].fn)

        const courseProfList = this.state.courseProfs.map(prof => {

            return (
                <CourseProfEntry course={this.props.courseInfo} {...prof} />

            )
        })

        const gradeDistributions = this.state.courseProfs.map(prof => {
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
                        <th className="sortable" scope="col" onClick={() => this.handleSortChange('profName')}>
                            <span>Professor</span>
                            <i className={'pl-3 fas fa-sort-' + this.state.sortDir + (this.state.sortBy === 'profName' ? '' : ' invisible')}></i>
                        </th>
                        <th className="sortable" scope="col" onClick={() => this.handleSortChange('profApproval')}>
                            <span>Liked</span>
                            <i className={'pl-3 fas fa-sort-' + this.state.sortDir + (this.state.sortBy === 'profApproval' ? '' : ' invisible')}></i>
                        </th>
                        <th className="sortable" scope="col" onClick={() => this.handleSortChange('profECIS')}>
                            <span>eCIS</span>
                            <i className={'pl-3 fas fa-sort-' + this.state.sortDir + (this.state.sortBy === 'profECIS' ? '' : ' invisible')}></i>
                        </th>
                        <th className="sortable" scope="col" onClick={() => this.handleSortChange('profClear')}>
                            <span>Clear</span>
                            <i className={'pl-3 fas fa-sort-' + this.state.sortDir + (this.state.sortBy === 'profClear' ? '' : ' invisible')}></i>
                        </th>
                        <th className="sortable" scope="col" onClick={() => this.handleSortChange('profEngaging')}>
                            <span>Engaging</span>
                            <i className={'pl-3 fas fa-sort-' + this.state.sortDir + (this.state.sortBy === 'profEngaging' ? '' : ' invisible')}></i>
                        </th>
                        <th className="sortable" scope="col" onClick={() => this.handleSortChange('profGrading')}>
                            <span>Grading</span>
                            <i className={'pl-3 fas fa-sort-' + this.state.sortDir + (this.state.sortBy === 'profGrading' ? '' : ' invisible')}></i>
                        </th>
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
            <div>
                <div className="courseProfs">
                    <div className="card course-card">
                        <div className="card-header course-header" onClick={this.handleCollapse} role="button" data-toggle="collapse" data-target="#profs-collapse">
                            <h4 className="details-header"> Professors {arrowIcon}</h4>
                        </div>
                        <div className="collapse show" id="profs-collapse" role="tabpanel">
                            <div className="card-body card-table">
                                {courseProfList.length > 0 ? profTable : noProfs}
                            </div>
                        </div>
                    </div>
                </div>
                {gradeDistributions}
            </div>
        )
    }
}

export default CourseProfs;