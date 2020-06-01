import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { login } from './UserFunctions'
import './../../css/utcolors.css'

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
        e.preventDefault()
        console.log("submitted")


        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                this.props.history.push('/profile')
            }
        })
    }

    render() {

        return (

            <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Log In</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">

                            <form className="form-signin pt-3" onSubmit={this.onSubmit}>

                                <div className="form-label-group mt-3">
                                    <span className="d-flex">
                                        <input
                                            type="text"
                                            name="email"
                                            className="form-control d-inline"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            placeholder="email"
                                            required autoFocus />
                                        <label className="px-2 float-right" style={{ marginTop: 6 }}>@utexas.edu</label>
                                    </span>
                                </div>

                                <div className="form-label-group mt-3">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        placeholder="password"
                                        required />
                                </div>

                                <div className="checkbox mt-1">

                                    <input type="checkbox" value="remember-me" />
                                    <label className="pl-2">Remember me</label>
                                </div>

                                <button className="btn btn-lg btn-primary btn-block mt-3" type="submit"> Log In </button>

                                <a href="#"><p className="text-center">Forgot password?</p></a>

                            </form>

                            <div className="text-center mb-3">
                                <h5><strong>OR</strong></h5>
                            </div>

                            <div>
                                <form className="form-signin">
                                    <button className="btn btn-lg btn-dark btn-block" type="submit">
                                        <span className="fab fa-google px-3"></span>
                                        Log In with Google
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="modal-footer d-block" align="center">
                            <label className="center-text pt-3 d-inline-block">
                                <h6>
                                    New to UT Flow?&nbsp;
                                    <span type="button" data-toggle="modal" data-target="#signup-modal">
                                        <a data-dismiss="modal" data-toggle="modal" data-target="#signup-modal" className="utcolor">Sign Up</a>
                                    </span>
                                </h6>
                            </label>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default Login