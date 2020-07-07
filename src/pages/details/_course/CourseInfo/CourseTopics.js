import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import { render } from '@testing-library/react';

class CourseTopics extends React.Component {

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
        let arrowIcon = this.state.open ? <i className="fas fa-angle-up rotate-icon"></i> : <i className="fas fa-angle-down rotate-icon"></i>
        let topicsList = this.props.topicsList.map(topic => {
            let topicPath = this.props.courseDept.toLowerCase().replace(' ', '') + "_" + this.props.courseNum.toLowerCase()
	        topicPath += "_" + topic.topicNum.toString()
            return (
                <li>
                    <Link
                        className="utcolor"
                        to={{
                            pathname: `course-results/${topicPath}`,
                        }}
                    > {topic.title}
                    </Link>
                </li>
            )
        })
        return (
            <div className="courseTopics">
                <div className="card course-card">
                    <div className="card-header course-header" onClick={this.handleCollapse} role="button" data-toggle="collapse" data-target="#topics-collapse">
                        <h4 className="details-header"> Topics {arrowIcon} </h4>
                    </div>
                    <div className="collapse show" id="topics-collapse" role="tabpanel">
                        <div className="card-body">
                            <div className="topics">
                                <ul>
                                    {topicsList}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

export default CourseTopics;