import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { withRouter } from 'react-router-dom'
import $ from './../../../node_modules/jquery'
import ProfileComponent from './_components/ProfileComponent'
import ReviewSummary from './_utils/ReviewSummary'
import './Profile.css'


class Profile extends Component {
    constructor() {
        const reviewList = [
            {
                id: 1,
                CourseNumber: "E E 302",
                CourseApproval: true,
                Usefulness: 3,
                Difficulty: 4,
                Workload: 2,
                CourseComment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ultrices luctus.",

                ProfessorName: "Bank, Seth",
                ProfessorApproval: false,
                Clear: 3,
                Engaging: 2,
                GradingDifficulty: 4,
                ProfessorComment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ultrices luctus."
            },
            {
                id: 2,
                CourseNumber: "E E 306",
                CourseApproval: true,
                Usefulness: 4,
                Difficulty: 2,
                Workload: 2,
                CourseComment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ultrices luctus.",

                ProfessorName: "Patt, Yale",
                ProfessorApproval: true,
                Clear: 1,
                Engaging: 2,
                GradingDifficulty: 4,
                ProfessorComment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ultrices luctus."
            },
        ]

        super()
        this.state = {
            first_name: 'Vina',
            last_name: 'Xue',
            email: '',
            major: '',
            profilePic: '',
            reviews: reviewList
        }

        this.setReviewData = this.setReviewData.bind(this)
        this.editReview = this.editReview.bind(this)
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            // first_name: decoded.identity.first_name,
            // last_name: decoded.identity.last_name,
            email: decoded.identity.email,
            major: decoded.identity.major
        })
    }

    editReview(id) {
        let review
        this.state.reviews.map(r => {
            if (r.id == id) {
                review = r
            }
        })

        console.log(review)

        this.props.history.push({
            pathname: '/add-review',
            state: {
                review: review
            }
        })
        $('#review-details-modal').modal('hide')
    }

    setReviewData() {
        return this.state.reviews.map(review => {
            return (<ReviewSummary
                data={review}
                editReview={this.editReview}
            />)
        })
    }

    render() {
        return (
            <main>
                <ProfileComponent
                    data={this.state}
                    setReviewData={this.setReviewData}
                />
            </main>
        )
    }
}

export default withRouter(Profile)