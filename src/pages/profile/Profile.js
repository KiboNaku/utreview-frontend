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
import Settings from './edit-profile/Settings'
import EditProfile from './edit-profile/EditProfile'
import { getMajor } from './../popups/_utils/UserFunctions'
import { getProfilePictures, updateProfilePic, updatePersonalInfo, getReviews, deleteReview } from './_utils/ProfileFunctions'
import Loading from './../_utils/Loading.js'
import './Profile.css'
import axios from 'axios'


class Profile extends Component {
    constructor() {
        super()
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
            loaded: false
        }

        this.setReviewData = this.setReviewData.bind(this)
        this.editReview = this.editReview.bind(this)
        this.setImageData = this.setImageData.bind(this)
        this.onImageChange = this.onImageChange.bind(this)
        this.deleteReview = this.deleteReview.bind(this)
        this.editPersonalInfo = this.editPersonalInfo.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }

    componentDidMount() {

        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            firstName: decoded.identity.first_name,
            lastName: decoded.identity.last_name,
            email: decoded.identity.email,
            major: decoded.identity.major,
            profilePic: decoded.identity.profile_pic,
            otherMajor: decoded.identity.other_major
        })

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
                let data = res.profile_pics
                let list = new Array()
                for (const i in data) {
                    list.push(data[i]['profile_pic'])
                }
                this.setState({ profilePicList: list })
            }
        })

        const user = {
            email: decoded.identity.email
        }

        console.log(user)

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
        this.state.reviews.map(r => {
            if (r.id === id) {
                review = r
            }
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

    editPersonalInfo(values){
        let major = values.major
        let otherMajor = values.otherMajor
        if(values.showOtherMajor){
            major = null
        }else if(values.noMajor){
            major = null
            otherMajor = null
        }else{
            otherMajor = null
        }

        const user = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: this.state.email,
            major: major !== null ? values.major.value : null,
            other_major: otherMajor
        }

        updatePersonalInfo(user).then(res => {
            this.setState(prevState => ({
                firstName: values.firstName,
                lastName: values.lastName,
                major: major !== null ? values.major.value : null,
                otherMajor: otherMajor,
            }))
            
        })
    }

    changePassword(values){
        axios
        .post('/api/reset_password', {
            email: localStorage.email,
            password: values.password
        })
        .then(response => {
            
        })
    }

    //TODO: write this function and implement backend 
    deleteReview(id){
        const review = {
            id: id
        }
        deleteReview(review).then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                this.componentDidMount()
            }
        })
    }

    render() {
        let loading = <Loading /> 
        let content = (
            <main>
                <ProfileComponent
                    data={this.state}
                    setReviewData={this.setReviewData}
                />
                <ProfilePicModal
                    setImageData={this.setImageData}
                />
                <EditProfile
                    data={this.state}
                    editPersonalInfo={this.editPersonalInfo}
                    changePassword={this.changePassword}
                />
            </main>
        )
        return (
            this.state.loaded ? content: loading
        )
    }
}

export default withRouter(Profile)