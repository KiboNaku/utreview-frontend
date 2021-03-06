import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { withRouter } from 'react-router-dom'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import $ from './../../../node_modules/jquery'
import ProfileComponent from './_components/ProfileComponent'
import ReviewSummary from './review-list/ReviewSummary'
import { sendResetPassword, sendCreatePassword } from './../popups/_utils/UserFunctions'
import { SelectionPicture } from './_utils/ProfilePicture'
import { ProfilePicModal } from './_utils/ProfilePicPopup'
import EditProfile from './edit-profile/EditProfile'
import { getMajor } from './../popups/_utils/UserFunctions'
import { getProfilePictures, updateProfilePic, updatePersonalInfo, getReviews, hasPassword, deleteReview } from './_utils/ProfileFunctions'
import Loading from './../_utils/Loading.js'
import './Profile.css'
import axios from 'axios'
import MetaTags from 'react-meta-tags';


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            major: '',
            profilePic: '',
            otherMajor: '',
            profilePicList: [],
            reviews: [],
            majorList: [],
            majorListLoaded: false,
            loaded: false,
            uploadedCourses: false,
            hasPassword: false,
            userCourses: [
                {

                    semester: 'Spring',
                    year: 2020,
                    index: 0,
                    courses: [
                        {
                            courseId: 1,
                            profId: 1,
                            semId: 1,
                            uniqueNum: 12345,
                            courseDept: 'E E',
                            courseNum: '302',
                            topicNum: -1,
                            profFirst: 'Nina',
                            profLast: 'Telang'
                        },
                        {
                            courseId: 5,
                            profId: 5,
                            semId: 5,
                            uniqueNum: 52345,
                            courseDept: 'E E',
                            courseNum: '360C',
                            topicNum: -1,
                            profFirst: 'Pedro',
                            profLast: 'Santacruz'
                        },
                    ]
                },
                {

                    semester: 'Fall',
                    year: 2019,
                    index: 1,
                    courses: [
                        {
                            courseId: 2,
                            profId: 4,
                            semId: 3,
                            uniqueNum: 12345,
                            courseDept: 'E E',
                            courseNum: '306',
                            topicNum: -1,
                            profFirst: 'Yale',
                            profLast: 'Patt'
                        }
                    ]
                }
            ],
        }

        this.setReviewData = this.setReviewData.bind(this)
        this.editReview = this.editReview.bind(this)
        this.setImageData = this.setImageData.bind(this)
        this.onImageChange = this.onImageChange.bind(this)
        this.deleteReview = this.deleteReview.bind(this)
        this.editPersonalInfo = this.editPersonalInfo.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.setPassword = this.setPassword.bind(this)
    }

    componentDidMount() {

        const token = localStorage.usertoken
        if (token === null || token === undefined) {
            this.props.history.push('/')
            $('#login-modal').modal('show')
            return
        }
        const decoded = jwt_decode(token)
        this.setState(prevState => ({
            firstName: decoded.identity.first_name,
            lastName: decoded.identity.last_name,
            email: decoded.identity.email,
            major: decoded.identity.major,
            profilePic: decoded.identity.profile_pic,
            otherMajor: decoded.identity.other_major,
            userCourses: decoded.identity.user_courses,
            uploadedCourses: decoded.identity.user_courses !== null && decoded.identity.user_courses !== undefined ? true : false
        }))

        if (localStorage.getItem("new-review-message")) {
            $("#toast-new-review").toast("show")
            localStorage.removeItem("new-review-message")
        }

        if (localStorage.getItem("edit-review-message")) {
            $("#toast-edit-review").toast("show")
            localStorage.removeItem("edit-review-message")
        }

        getMajor().then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                let data = res.majors
                let list = []
                for (const i in data) {
                    list.push({
                        value: data[i]['name'],
                        label: data[i]['name']
                    })
                }
                list = list.sort((a, b) => a.label.localeCompare(b.label))
                this.setState({ majorList: list, majorListLoaded: true })
            }
        })

        getProfilePictures().then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                let data = res.profile_pics
                let list = []
                for (const i in data) {
                    list.push(data[i]['profile_pic'])
                }
                this.setState({ profilePicList: list })
            }
        })

        const user = {
            email: decoded.identity.email
        }

        hasPassword(user).then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                this.setState({ hasPassword: res.hasPassword })
            }
        })

        getReviews(user).then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                this.setState({ reviews: res.reviews, loaded: true })
            }
        })
    }

    editReview(id) {
        let review
        this.state.reviews.forEach((_review) => {
            if (_review.id === id) review = _review
        })

        this.props.history.push({
            pathname: '/edit-review',
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
                deleteReview={this.deleteReview}
            />
            )
        })
    }

    setImageData() {
        return (
            <GridList cellHeight={100} cols={4}>
                {this.state.profilePicList.map(image => (
                    <GridListTile key={image}>
                        <SelectionPicture
                            name={this.state.firstName + ' ' + this.state.lastName}
                            image={image}
                            onImageChange={this.onImageChange}
                        />
                    </GridListTile>
                ))}
            </GridList>
        )
    }

    onImageChange(image) {
        this.setState({ profilePic: image })
        $('#change-profile-pic').modal('hide')
        const user = {
            email: this.state.email,
            profile_pic: image
        }

        updateProfilePic(user).then(res => {
            if (res.error) {
                alert(res.error)
            }
        })

        this.props.handleProfilePicChange(image)
    }

    //all need to add backend stuff

    editPersonalInfo(values) {
        let major = values.major
        let otherMajor = values.otherMajor
        if (values.showOtherMajor) {
            major = null
        } else if (values.noMajor) {
            major = null
            otherMajor = null
        } else {
            otherMajor = null
        }

        const user = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: this.state.email,
            major: major !== null ? values.major.value : null,
            other_major: otherMajor
        }

        this.setState(prevState => ({
            firstName: values.firstName,
            lastName: values.lastName,
            major: major !== null ? values.major.value : null,
            otherMajor: otherMajor,
        }))

        updatePersonalInfo(user).then(res => {


        })
    }

    changePassword(values) {
        axios
            .post('/api/reset_password', {
                email: localStorage.email,
                password: values.password
            })
            .then(response => {

            })
    }

    //TODO: write this function and implement backend 
    deleteReview(id) {
        const review = {
            id: id
        }
        deleteReview(review).then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                this.setState({ loaded: false })
                $("#toast-delete-review").toast("show")
                this.componentDidMount()
            }
        })
    }

    setPassword() {
        localStorage.setItem("email", this.state.email)
        $("#edit-profile").modal("hide")
        $("#verify-new-password-modal").modal("show");
        sendCreatePassword()
    }

    render() {
        let loading = <Loading />
        let content = (
            <main>
                <ProfileComponent
                    data={this.state}
                    setReviewData={this.setReviewData}
                    editReview={this.editReview}
                    deleteReview={this.deleteReview}
                />
                <ProfilePicModal
                    setImageData={this.setImageData}
                />
                <EditProfile
                    data={this.state}
                    editPersonalInfo={this.editPersonalInfo}
                    changePassword={this.changePassword}
                    setPassword={this.setPassword}
                />
            </main>
        )
        return (

            <div>
                <MetaTags>
                    <title>{this.props.title} | {this.props.mainTitle}</title>
                    <meta name="description" content={this.props.description} />
                </MetaTags>

                {this.state.loaded ? content : loading}
            </div>
        )
    }
}

export default withRouter(Profile)