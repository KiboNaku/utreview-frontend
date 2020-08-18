import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ResetPasswordComponent from './ResetPasswordComponent'
import Loading from './../_utils/Loading'   
import axios from 'axios'
import qs from 'qs'

class ResetPassword extends Component {

    constructor() {

        super()
        this.state = {
            loading: false,
            redirect: false,
            success: 0,
            error: null,
            passwordUpdated: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {

        document.title = "Reset Password - UT Review"

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

    onSubmit(values){
        
        this.setState({ loading: true })
        axios
        .post('/api/reset_password', {
            email: localStorage.email,
            password: values.password
        })
        .then(response => {
            this.setState({passwordUpdated: true, loading: false})
        })
        
    }


    render() {

        let message = ""

        let loading =
            <div className="on-top">
                <Loading />
            </div>

        if (this.state.success < 0) {
            message = (
            <h3>{"An error has occured: " + this.state.error}</h3>
            )
        }

        let successMessage = (
            <h3>Your password has been successfully updated</h3>
        )
        
        let resetForm = <ResetPasswordComponent onSubmit={this.onSubmit} onChange={this.onChange} data={this.state}/>

        return (
            <main className="bg-grey">
                <div className="main-sub container py-5">
                    <div className="container justify-content-center px-5 py-5 col-12 col-sm-11 col-md-9 col-lg-7 bg-light">
                        <div className='py-5'>

                            {this.state.loading && loading}
                            {this.state.passwordUpdated ? successMessage : (this.state.success < 0 ? message : resetForm)}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default withRouter(ResetPassword)