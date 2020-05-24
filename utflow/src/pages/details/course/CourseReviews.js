import React from 'react';
import CourseReviewEntry from './CourseReviewEntry';

class CourseReviews extends React.Component {
    constructor(){
        super()
        const courseReviews = [
            {
                key: 1,
                review: "I fucking hated this class",
                liked: false,
                usefulness: 1,
                difficulty: 5,
                workload: 5,
                userMajor: 'Electrical and Computer Engineering',
                profPic: "https://images.dog.ceo/breeds/pembroke/n02113023_12785.jpg",
                profName: 'Yale Patt'
            },
            {
                key: 2,
                review: "This was the most inspiring class of my life",
                liked: true,
                usefulness: 5,
                difficulty: 2,
                workload: 3,
                userMajor: 'Electrical and Computer Engineering',
                profPic: "https://images.dog.ceo/breeds/pembroke/n02113023_12785.jpg",
                profName: 'Seth Bank'
            },
            {
                key: 3,
                review: "Why did I even take this class",
                liked: false,
                usefulness: 1,
                difficulty: 2,
                workload: 3,
                userMajor: 'Business Honors',
                profPic: "https://images.dog.ceo/breeds/pembroke/n02113023_12785.jpg",
                profName: 'Emanuel Tutuc'
            },
        ]

        this.state = {
            courseReviews: courseReviews
        }
    }
    render() {
        const courseReviewList = this.state.courseReviews.map(review => {
            return (
				<CourseReviewEntry {...review}/>   
            )
		})
		  
        return (
			<div className = "courseReviews">
				<h1> Course Reviews </h1>
				<div className = "list-group">
					{courseReviewList}
				</div>
			</div>
            
        )
    }
	
}

export default CourseReviews;