import React from 'react';
import CourseInfo from './CourseInfo';
import CourseRatings from './CourseRatings';
import CourseProfs from './CourseProfs';
import CourseReviews from './CourseReviews';

class CourseDetails extends React.Component {
    constructor(){
        super() 
        const courseInfo = {
            courseDep: "EE",
            courseNo: 302,
            courseName: "Introduction to Electrical Engineering",
            courseDes: "Circuits and shit"
        }

        const courseRatings = {
            percentLiked: 22,
            difficulty: 4.3,
            usefulness: 2.2,
            workload: 4.9,
            eCIS: 4.3
        }

        this.state = {
            courseInfo: courseInfo,
            courseRatings: courseRatings,
        }
    }

    render(){

        return (
            <div className="CourseDetails">
                <CourseInfo 
                    {...this.state.courseInfo}
                />
                <CourseRatings
                    {...this.state.courseRatings}
                />
                <br />
                <CourseProfs />
                <CourseReviews />
            </div>
        );
    }
  
}

export default CourseDetails;