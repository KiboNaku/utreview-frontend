import React from 'react';
import CourseLink from './../../../_utils/CourseLink'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const propTypes = {
    // course id
    id: PropTypes.number.isRequired,

	// course's department abbreviation
	courseDept: PropTypes.string.isRequired,

    // course number
    courseNum: PropTypes.string.isRequired,

    // course title
    courseTitle: PropTypes.string.isRequired,

    // course description
	courseDes: PropTypes.string.isRequired,
	
	// course's topic id
	topicId: PropTypes.number.isRequired,

	// course's topic number
    topicNum: PropTypes.number.isRequired,
	
	// course's parent topic's id
	parentId: PropTypes.number,
	
	// course's parent topic's title
	parentTitle: PropTypes.string,
	
	// list of children topics, only if course is a parent topic
    topicsList: PropTypes.arrayOf(
		PropTypes.shape({
			// course id
			id: PropTypes.number,

			// course's topic number
			topicNum: PropTypes.number,
			
			// course's title
			title: PropTypes.string
		})
	),
	
	// median letter grade obtained in the course
	medianGrade: PropTypes.string,
}

class CourseTopics extends React.Component {

    constructor() {
        super()
        this.state = {
            // indicates whether the component is expanded or collapsed
            open: true
        }

        this.handleCollapse = this.handleCollapse.bind(this)
    }

    handleCollapse() {
        // toggle collapsing and expanding the component
        this.setState((prevState) => ({
            open: !prevState.open
        }))
    }

    render() {
        let arrowIcon = this.state.open ?
            <i className="fas fa-angle-up rotate-icon"></i> : <i className="fas fa-angle-down rotate-icon"></i>

        // generate list of links to the child topics
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

CourseTopics.propTypes = propTypes

export default withRouter(CourseTopics);