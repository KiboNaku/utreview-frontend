import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import $ from './../../../node_modules/jquery'
import ProfileComponent from './_components/ProfileComponent'
import ReviewSummary from './_utils/ReviewSummary'
import { SelectionPicture } from './_utils/ProfilePicture'
import { ProfilePicModal } from './_utils/ProfilePicPopup'
import Settings from './_utils/Settings'
import { getMajor } from './../popups/_utils/UserFunctions'
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
            first_name: '',
            last_name: '',
            email: '',
            major: '',
            profilePic: '',
            pictures: ['corgi1.jpg', 'corgi2.jpg', 'corgi3.jpg'],
            reviews: reviewList,
            majorList: null
        }

        this.setReviewData = this.setReviewData.bind(this)
        this.editReview = this.editReview.bind(this)
        this.setImageData = this.setImageData.bind(this)
        this.onProfilePicChange = this.onProfilePicChange.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleMajorChange = this.handleMajorChange.bind(this)
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.identity.first_name,
            last_name: decoded.identity.last_name,
            email: decoded.identity.email,
            major: decoded.identity.major,
            // profilePic: decoded.identity.profile_pic
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
        $('#review-details-modal' + id).modal('hide')
    }

    setReviewData() {
        return this.state.reviews.map(review => {
            return (<ReviewSummary
                data={review}
                editReview={this.editReview}
            />
            )
        })
    }

    setImageData() {
        return (
            <GridList cellHeight={100} cols={4}>
                {this.state.pictures.map(picture => (
                    <GridListTile key={picture}>
                        <SelectionPicture
                            name={this.state.first_name + ' ' + this.state.last_name}
                            profilePic={picture}
                            onProfilePicChange={this.onProfilePicChange}
                        />
                    </GridListTile>
                ))}
            </GridList>
        )
    }

    onProfilePicChange(image) {
        this.setState({ profilePic: image })
        $('#change-profile-pic').modal('hide')
    }

    //all need to add backend stuff
    onChange(event) {

    }

    onSubmit(firstName, lastName, password, email, major) {
        this.setState({
            first_name: firstName,
            last_name: lastName,
            email: email,
            major: major
        })
        //do something with password
        $('#settings').modal('hide')
    }

    handleMajorChange = (inputValue, { action }) => {
        if (inputValue !== null) {
            this.setState({ major: inputValue.value })
        }
    }

    componentDidMount() {
        getMajor().then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                let data = res.majors
                let list = new Array()
                for (const i in data) {
                    list.push({
                        value: data[i]['name'],
                        label: data[i]['name']
                    })
                }
                this.setState({ majorList: list })
            }
        })
    }

    render() {
        return (
            <main>
                <ProfileComponent
                    data={this.state}
                    setReviewData={this.setReviewData}
                />
                <ProfilePicModal
                    setImageData={this.setImageData}
                />
                <Settings
                    data={this.state}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    handleMajorChange={this.handleMajorChange}
                />
            </main>
        )
    }
}

export default withRouter(Profile)