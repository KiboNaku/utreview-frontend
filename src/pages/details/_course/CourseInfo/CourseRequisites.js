import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    // course pre-requisites
    preReqs: PropTypes.string,

	// course restrictions
	restrictions: PropTypes.string,
}

class CourseRequisites extends React.Component {

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

CourseRequisites.propTypes = propTypes

export default CourseRequisites;