import React from 'react';
import { render } from '@testing-library/react';

class CourseRequisites extends React.Component{

    constructor(){
        super()
        this.state = {
            open: true
        }

        this.handleCollapse = this.handleCollapse.bind(this)
    }

    handleCollapse(){
        this.setState( (prevState) => ({
            open: !prevState.open
        })
        )
    }

    render(){
        let arrowIcon = this.state.open ? <i className="fas fa-angle-up rotate-icon"></i> : <i className="fas fa-angle-down rotate-icon"></i>
        const prerequisites = this.props.preRequisites.map(prereq => {
            return <li> {prereq} </li>
        })
        const corequisites = this.props.coRequisites.map(coreq => {
            return <li> {coreq} </li>
        })
        const antirequisites = this.props.antiRequisites.map(antireq => {
            return <li> {antireq} </li>
        })
        return (
            <div className="courseRequisites">
                <div className="card course-card">
                    <div className="card-header course-header" onClick={this.handleCollapse} role="button" data-toggle="collapse" data-target="#requisites-collapse">
                        <h4 className="details-header"> Requisites {arrowIcon} </h4>    
                    </div>
                    <div className="collapse show" id="requisites-collapse" role="tabpanel">
                        <div className="card-body">
                            <div className="requisites">
                                <div>
                                    <h5> Prerequisites </h5>
                                    <ul>
                                        {prerequisites}
                                    </ul>
                                </div>
                                <div>
                                    <h5> Corequisites </h5>
                                    <ul>
                                        {corequisites}
                                    </ul>
                                </div>
                                <div>
                                    <h5> Antirequisites </h5>
                                    <ul>
                                        {antirequisites}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        );
    }
    
}

export default CourseRequisites;