import React from 'react';

class CourseRequisites extends React.Component {

    constructor() {
        super()
        this.state = {
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
        return (
            <div className="courseRequisites">
                <div className="card course-card">
                    <div className="card-header course-header" onClick={this.handleCollapse} data-toggle="collapse" data-target="#requisites-collapse">
                        <h4 className="details-header"> Requisites </h4>
                    </div>
                    <div>
                        <div className="card-body">
                            <div className="requisites">
                                <div>
                                    <h5> Prerequisites </h5>
                                    <ul>
                                        <li>
                                            {this.props.preReqs !== "" ? this.props.preReqs: "No prerequisites"}
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h5> Restrictions </h5>
                                    <ul>
                                        <li>
                                            {this.props.restrictions !== "" ? this.props.restrictions: "No restrictions"}
                                        </li>
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