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
import { getProfilePictures, updateInfo, getReviews } from './_utils/ProfileFunctions'
import './Profile.css'
import axios from 'axios'


class Profile extends Component {
    constructor() {

        const reviewList = [
            {
                'id': 1,
                'date_posted': '1/1/2020',
                'semester': 'Spring 2020',
                'course_comments': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ultrices luctus.",
                'professor_comments': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ultrices luctus.",

                'user_posted': {
                    'major': {
                        'abr': 'EE',
                        'name': 'Electrical Engineering '
                    }
                },

                'professor': {
                    'firstName': 'Seth',
                    'lastName': 'Bank'
                },

                'course': {
                    'dept': {
                        'abr': 'EE',
                        'name': 'Electrical Engineering'
                    },
                    'num': 302,
                    'title': 'intro to ee',
                },

                'course_rating': {
                    'approval': false,
                    'usefulness': 3,
                    'difficulty': 2,
                    'workload': 4,
                },

                'professor_rating': {
                    'approval': true,
                    'clear': 4,
                    'engaging': 3,
                    'grading': 5,
                },
            }
        ]

        super()
        this.state = {
            first_name: 'Vina',
            last_name: 'Xue',
            email: 'yxue22@utexas.edu',
            major: 'ee',
            image: '',
            images: [],
            reviews: reviewList,
            majorList: []
        }

        this.setReviewData = this.setReviewData.bind(this)
        this.editReview = this.editReview.bind(this)
        this.setImageData = this.setImageData.bind(this)
        this.onImageChange = this.onImageChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {

        // const token = localStorage.usertoken
        // const decoded = jwt_decode(token)
        // this.setState({
        //     first_name: decoded.identity.first_name,
        //     last_name: decoded.identity.last_name,
        //     email: decoded.identity.email,
        //     major: decoded.identity.major,
        //     image: decoded.identity.image
        // })

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

        getProfilePictures().then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                let data = res.images
                let list = new Array()
                for (const i in data) {
                    list.push(data[i]['image'])
                }
                this.setState({ images: list })
            }
        })

        getReviews().then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                this.setState({ reviewList: res.reviews })
            }
        })
    }

    editReview(id) {
        let review
        this.state.reviews.map(r => {
            if (r.id == id) {
                review = r
            }
        })

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
                {this.state.images.map(image => (
                    <GridListTile key={image}>
                        <SelectionPicture
                            name={this.state.first_name + ' ' + this.state.last_name}
                            image={image}
                            onImageChange={this.onImageChange}
                        />
                    </GridListTile>
                ))}
            </GridList>
        )
    }

    onImageChange(image) {
        this.setState({ image: image })
        $('#change-profile-pic').modal('hide')
    }

    //all need to add backend stuff

    onSubmit(mode, firstName, lastName, password, major) {
        switch (mode) {
            case 'apply':
                this.setState({
                    first_name: firstName,
                    last_name: lastName,
                    major: major
                })

                const user = {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    password: password,
                    major: this.state.major,
                    image: this.state.image
                }

                updateInfo(user).then(res => {
                    if (res.error) {
                        alert(res.error)
                    } else {
                        $('#settings').modal('hide')
                    }
                })
            default:
                $('#settings').modal('hide')
        }
    }

    render() {
        return (
            <main>
                <h1>{this.state.success}</h1>
                <ProfileComponent
                    data={this.state}
                    setReviewData={this.setReviewData}
                />
                <ProfilePicModal
                    setImageData={this.setImageData}
                />
                <Settings
                    data={this.state}
                    onSubmit={this.onSubmit}
                />
            </main>
        )
    }
}

export default withRouter(Profile)