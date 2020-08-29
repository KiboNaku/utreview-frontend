import React, { Component } from 'react'
import SignupComponent from './_components/SignupComponent'
import { signup, getMajor } from './_utils/UserFunctions'
import { withRouter } from 'react-router-dom'
import $ from './../../../node_modules/jquery'
import Error from './../_utils/Error'
import './popups.css'
import CompleteProfile from './CompleteProfile'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            loading: false,
            error: null,
            verifyEmail: false,
            majorList: null,
            majorListLoaded: false,
            isLogined: false,
            accessToken: '',
            googleSignup: false,
            firstName: '',
            lastName: '',
            email: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.loginGoogle = this.loginGoogle.bind(this);
        this.handleLoginFailureGoogle = this.handleLoginFailureGoogle.bind(this);
    }

    loginGoogle(response) {
        if (response.accessToken) {
            let email = response.profileObj.email
            if (/\S+@utexas.edu+/.test(email)) {
                this.setState({
                    isLogined: true,
                    accessToken: response.accessToken,
                    googleSignup: true
                });

                this.setState({
                    firstName: response.profileObj.givenName,
                    lastName: response.profileObj.familyName,
                    email: email,
                })

                let values = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: email.substring(0, email.indexOf("@")),
                    password: null,
                    major: null,
                    otherMajor: null,
                    showOtherMajor: false,
                    noMajor: false
                }

                this.onSubmit(values)
            } else {
                alert('Invalid Email')
            }
        }
    }

    handleLoginFailureGoogle(error, response) {
        if (error.error !== 'idpiframe_initialization_failed') {
            alert('Failed to sign up')
            this.setState({
                isLogined: false,
                accessToken: '',
                googleSignup: false
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(values) {
        $('#signup-modal-content').animate({ scrollTop: 0 }, 'fast');

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
        const newUser = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password: values.password,
            major: major !== null ? major.value : null,
            other_major: otherMajor
        }

        this.setState({ loading: true })

        signup(newUser).then(res => {

            this.setState({ loading: false })

            if (res.error) {
                if (this.state.googleSignup) {
                    alert(res.error)
                    this.setState({ googleSignup: false })
                } else {
                    this.setState({ error: res.error })
                }
            } else {
                if (this.state.googleSignup) {
                    $("#signup-modal").modal("hide");
                    $("#complete-profile").modal("show")
                } else {
                    $("#signup-modal").modal("hide");
                    $("#verifyemail-modal").modal("show");
                }
            }
        })
    }

    componentDidMount() {
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
    }

    render() {
        return (
            <div>
                <SignupComponent
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    handleMajorChange={this.handleMajorChange}
                    handleShowOtherMajor={this.handleShowOtherMajor}
                    loginGoogle={this.loginGoogle}
                    handleLoginFailureGoogle={this.handleLoginFailureGoogle}
                    data={this.state}
                />
                <CompleteProfile
                    data={this.state}
                />
            </div>
        )
    }
}

export default withRouter(Signup)