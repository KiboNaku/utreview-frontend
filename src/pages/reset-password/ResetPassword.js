import React, { Component } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import ResetPasswordForm from './ResetPasswordForm'
import Loading from './../_utils/Loading'   
import axios from 'axios'
import qs from 'qs'

class ResetPassword extends Component {

    constructor() {

        super()
        this.state = {
            redirect: false,
            success: 0,
            error: null,
            password: '',
            confirmPassword: '',
            passwordsNoMatch: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {

        axios
            .post('/api/reset_password_link', {
                token: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).token
            })
            .then(response => {
                this.setState({ success: response.data.success, error: response.data.error })
            })
    }


    onChange(e) {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault()
        if(this.state.password !== this.state.confirmPassword){
            this.setState({passwordsNoMatch: true})
        }else{
            this.setState({passwordsNoMatch: false})
            axios
            .post('/api/reset_password', {
                email: localStorage.email,
                password: this.state.password
            })
            .then(response => {
                this.props.history.push('/')
            })
        }
    }
    

    render() {

        let message = ""

        if (this.state.success < 0) {
            message = "An error has occured: " + this.state.error
        }

        let loading = <Loading />

        let resetForm = <ResetPasswordForm onSubmit={this.onSubmit} onChange={this.onChange} data={this.state}/>

        return (
            <main className="bg-grey">
                <div className="main-sub container py-5">
                    <div className="container justify-content-center px-5 py-5 col-12 col-sm-11 col-md-9 col-lg-7 bg-light">
                        <h3 className='py-5 text-center'>
                            {this.state.success < 0 ? message : resetForm}
                        </h3>
                    </div>
                </div>
            </main>
        )
    }
}

export default withRouter(ResetPassword)