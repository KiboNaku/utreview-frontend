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
            <div>
                <div className="course-requisites">                 
                    <div className="prerequisites-wrapper">
                        <div className="requisites-title">Prerequisites</div>
                        <ul>
                            <li>
                                {this.props.preReqs !== "" ? this.props.preReqs: "No prerequisites"}
                            </li>
                        </ul>
                    </div>

                    <div className="restrictions-wrapper">
                        <div className="requisites-title">Restrictions</div>
                        <ul>
                            <li>
                                {this.props.restrictions !== "" ? this.props.restrictions: "No restrictions"}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}

export default CourseRequisites;