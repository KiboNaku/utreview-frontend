import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { login } from './UserFunctions'
import './../../css/utcolors.css'
import UTEmail from "./UTEmail"
import ModalHeader from "./ModalHeader"
import GoogleButton from "./GoogleButton"

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

            <div className="modal fade" id="login-modal" role="dialog">

                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                        <ModalHeader text="Log In" />

                        <div className="modal-body">

                            <form className="form-signin mt-3" onSubmit={this.onSubmit}>

                                <div className="my-3">
                                    <UTEmail email={this.state.email} onChange={this.onChange} />
                                </div>

                                <div className="form-group my-3">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        placeholder="password"
                                        required />
                                </div>

                                <div className="form-label-group checkbox my-1">
                                    <input type="checkbox" value="remember-me" />
                                    <label className="pl-2">Remember me</label>
                                </div>

                                <button className="btn btn-lg btn-primary btn-block mt-2" type="submit">Log In</button>

                                <a href="#"><p className="text-center">Forgot password?</p></a>

                            </form>

                            <div className="text-center my-3">
                                <h5><strong>OR</strong></h5>
                            </div>

                            <form className="mb-3">
                                <GoogleButton text="Log In with Google" />
                            </form>
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

export default withRouter(Login)