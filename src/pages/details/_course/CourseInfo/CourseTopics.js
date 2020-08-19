import React from 'react';
import CourseLink from './../../../_utils/CourseLink'
import { withRouter, Link } from 'react-router-dom'

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
        }))
    }

    render() {
        let arrowIcon = this.state.open ?
            <i className="fas fa-angle-up rotate-icon"></i> : <i className="fas fa-angle-down rotate-icon"></i>

        let topicsList = this.props.topicsList.map(topic => {

            return (
                <li className="topic-item">
                    <CourseLink
                        courseId={topic.id}
                        courseDept={this.props.courseDept}
                        courseNum={this.props.courseNum}
                        topicNum={topic.topicNum}
                        courseTitle={topic.title}
                        display="title"
                    />
                </li>
            )
        })

        return (
            <div className="courseTopics">
                <div className="course-card">
                    <div className="card-header course-header" /*onClick={this.handleCollapse} role="button" data-toggle="collapse" data-target="#topics-collapse"*/>
                        <h4 className="details-header"> Topics </h4>
                    </div>
                    <div className="collapse show" id="topics-collapse" role="tabpanel">
                        <div className="card-body">
                            <div className="topics">
                                <ul className="topics-list d-flex flex-wrap">
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

export default withRouter(CourseTopics);