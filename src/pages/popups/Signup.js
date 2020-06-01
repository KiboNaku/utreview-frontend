import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { signup } from './UserFunctions'

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


            <div className="modal fade" id="signup-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Sign Up</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">

                            <form className="form-signin" onSubmit={this.onSubmit}>
                                <div className="form-label-group">
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
                                    <input
                                        type="text"
                                        name="major"
                                        className="form-control mt-3"
                                        placeholder="major"
                                        value={this.state.major}
                                        onChange={this.onChange}
                                        required autoFocus />
                                </div>
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

                                <div className={"form-label-group mt-3"}>
                                    <input
                                        type="password"
                                        name="confirm_password"
                                        className="form-control"
                                        value={this.state.confirm_password}
                                        onChange={this.onChange}
                                        placeholder="confirm password"
                                        required />
                                </div>

                                <button className="btn btn-lg btn-primary btn-block mt-3" type="submit"> Sign up </button>

                            </form>

                            <div className="text-center mb-3">
                                <h5><strong>OR</strong></h5>
                            </div>

                            <div>
                                <form className="form-signup">
                                    <button className="btn btn-lg btn-dark btn-block" type="submit">
                                        <span className="fab fa-google px-3"></span>
                                Sign up with Google
                            </button>
                                </form>
                            </div>
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