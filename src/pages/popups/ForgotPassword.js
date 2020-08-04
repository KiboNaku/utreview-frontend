import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
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

    onSubmit(values) {

        localStorage.setItem('email', values.email + "@utexas.edu")

        const user = {
            email: values.email,
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