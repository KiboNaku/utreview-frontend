import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { forgotPassword } from './_utils/UserFunctions'
import ForgotPasswordComponent from './_components/ForgotPasswordComponent'
import $ from './../../../node_modules/jquery'

class ForgotPassword extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {

        const NOT_VERIFIED = -101
        localStorage.setItem('email', this.state.email + "@utexas.edu")

        e.preventDefault()

        const user = {
            email: this.state.email,
        }

        this.setState({ loading: true })
        forgotPassword(user).then(res => {

            this.setState({ loading: false })

            if (res.error) {   
                alert(res.error)    
            } else {
                $("#forgot-password-modal").modal("hide")
                $("#verify-password-modal").modal("show");
            }
        })
    }

    render() {

        return (
            <ForgotPasswordComponent onSubmit={this.onSubmit} onChange={this.onChange} data={this.state} />
        )
    }
}

export default withRouter(ForgotPassword)