import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { login } from './_utils/UserFunctions'
import LoginComponent from './_components/LoginComponent'
import $ from './../../../node_modules/jquery'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
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
            password: this.state.password
        }

        login(user).then(res => {
            if (res.error) {
                if(res.success == NOT_VERIFIED){
                    $("#login-modal").modal("hide");
                    $("#verifyemail-modal").modal("show");
                } else {
                    alert(res.error)
                }
            } else {
                this.props.history.push('/profile')
                $("#login-modal").modal("hide")
            }
        })
    }

    render() {

        return (
            <LoginComponent onSubmit={this.onSubmit} onChange={this.onChange} data={this.state}/>
        )
    }
}

export default withRouter(Login)