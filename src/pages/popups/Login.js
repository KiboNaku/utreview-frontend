import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { withRouter } from 'react-router-dom'
import { login } from './_utils/UserFunctions'
import LoginComponent from './_components/LoginComponent'
import $ from './../../../node_modules/jquery'
import CompleteProfile from './_components/CompleteProfileComponent'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            loading: false,
            isLogined: false,
            accessToken: '',
            googleLogin: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.loginGoogle = this.loginGoogle.bind(this);
        this.handleLoginFailureGoogle = this.handleLoginFailureGoogle.bind(this);
    }

    loginGoogle(response) {
        if (response.accessToken) {
            this.setState({
                isLogined: true,
                accessToken: response.accessToken,
                googleLogin: true
            });
        }
        let email = response.profileObj.email
        let values = {
            email: email.substring(0, email.indexOf("@")),
            password: null
        }
        this.onSubmit(values);
    }

    handleLoginFailureGoogle(response) {
        alert('Failed to log in')
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    signup() {
        $("#signup-modal").modal("show");
        $("#login-modal").modal("hide");
    }

    onSubmit(values) {
        const NOT_VERIFIED = -101
        localStorage.setItem('email', values.email + "@utexas.edu")

        const user = {
            email: values.email,
            password: values.password
        }

        this.setState({ loading: true })

        login(user).then(res => {

            this.setState({ loading: false })

            if (res.error) {
                if (res.success === NOT_VERIFIED) {
                    $("#login-modal").modal("hide");
                    $("#verifyemail-modal").modal("show");
                } else {
                    alert(res.error)
                }
            } else {
                const token = localStorage.usertoken

                let profilePic = 'default.jpg'
                if (token !== undefined && token !== null) {
                    const decoded = jwt_decode(token)
                    profilePic = decoded.identity.profile_pic
                }
                this.props.handleProfilePicChange(profilePic)
                $("#login-modal").modal("hide")
            }
        })
    }

    render() {

        return (
            <LoginComponent
                signup={this.signup}
                onSubmit={this.onSubmit}
                onChange={this.onChange}
                loginGoogle={this.loginGoogle}
                handleLoginFailureGoogle={this.handleLoginFailureGoogle}
                data={this.state} />
        )
    }
}

export default withRouter(Login)