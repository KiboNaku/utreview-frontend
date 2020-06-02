import React, { Component } from 'react'
import ModalHeader from './ModalHeader'
import UTEmail from './UTEmail'
import { signup } from './UserFunctions'
import GoogleButton from "./GoogleButton"

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
            major: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        console.log("changed state")
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        console.log("submit pressed")

        if (this.state.password != this.state.confirm_password) {
            console.log("password fields dont match")
            alert("Password fields don't match")
            return
        }

        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            major: this.state.major
        }

        signup(newUser).then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                this.props.history.push('/login')
            }
        })

    }

    render() {

        return (
            <div className="modal fade" id="signup-modal" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                        <ModalHeader text="Sign Up" />

                        <div className="modal-body">

                            <form className="form-signin mt-3" onSubmit={this.onSubmit}>

                                <div className="form-group my-3">
                                    <input
                                        type="text"
                                        name="first_name"
                                        className="form-control d-inline col-6"
                                        placeholder="first name"
                                        value={this.state.first_name}
                                        onChange={this.onChange}
                                        required autoFocus />

                                    <input
                                        type="text"
                                        name="last_name"
                                        className="form-control d-inline col-6"
                                        placeholder="last name"
                                        value={this.state.last_name}
                                        onChange={this.onChange}
                                        required autoFocus />
                                </div>

                                <div className="my-3">
                                    <UTEmail email={this.state.email} onChange={this.onChange} />
                                </div>

                                <div className="form-group my-3">
                                    <input
                                        type="text"
                                        name="major"
                                        className="form-control"
                                        placeholder="major"
                                        value={this.state.major}
                                        onChange={this.onChange}
                                        required autoFocus />
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

                                <div className={"form-group my-3"}>
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        className="form-control"
                                        value={this.state.confirm_password}
                                        onChange={this.onChange}
                                        placeholder="confirm password"
                                        required />
                                </div>

                                <button className="btn btn-lg btn-primary btn-block mt-2" type="submit"> Sign up </button>

                            </form>

                            <div className="text-center my-3">
                                <h5><strong>OR</strong></h5>
                            </div>

                            <form className="mb-3">
                                <GoogleButton text="Sign Up with Google" />
                            </form>
                        </div>

                        <div className="modal-footer d-block" align="center">
                            <label className="center-text pt-3 d-inline-block">
                                <h6>
                                    Already have an account?&nbsp;
                                    <span type="button" data-toggle="modal" data-target="#signup-modal">
                                        <a data-dismiss="modal" data-toggle="modal" data-target="#login-modal" className="utcolor">Log In</a>
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

export default Signup