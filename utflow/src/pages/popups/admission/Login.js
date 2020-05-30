import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {login} from './UserFunctions'

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
            }else{
                this.props.history.push('/profile')
            }
        })
    }

    render() {

        /**
         * Properties:
         * 1. mode: show either login or signup page
         *    values = "login", "signup"
         *    default = "login"
         */

        let signup = false

        return (
            <div className="border rounded col-9 col-sm-7 col-md-5 col-lg-4 col-xl-3 pt-5">

                <div className="py-3">

                    <form className="form-signin" onSubmit = {this.onSubmit}>

                        <h3 className="pb-2"><strong> Log in </strong></h3>

                        <div className="form-label-group mt-3">
                            <span className="d-flex">
                                <input 
                                    type="text" 
                                    id="inputEmail" 
                                    name="email"
                                    className="form-control d-inline" 
                                    value = {this.state.email}
                                    onChange = {this.onChange}
                                    placeholder="email" 
                                    required autoFocus />
                                <label className="px-2 float-right" style={{ marginTop: 6 }}>@utexas.edu</label>
                            </span>
                        </div>

                        <div className="form-label-group mt-3">
                            <input 
                                type="password" 
                                id="inputPassword" 
                                name="password"
                                className="form-control" 
                                value = {this.state.password}
                                onChange = {this.onChange}
                                placeholder="password" 
                                required />
                        </div>

                        <div className="checkbox mt-1">
                            <label>
                                <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                        </div>

                        <button className="btn btn-lg btn-primary btn-block mt-3" type="submit"> Log in </button>

                        <a href="#"><p className="text-center">Forgot password?</p></a>

                    </form>

                    <div className="text-center my-3">
                        <h5><strong>OR</strong></h5>
                    </div>

                    <div>
                        <form className="form-signin">
                            <button className="btn btn-lg btn-dark btn-block" type="submit">
                                <div className="fab fa-google px-3"></div>
                            Log in with Google
                        </button>
                        </form>

                    </div>
                </div>

                <hr />

                <div align="center">
                    <label className="center-text pt-3 d-inline-block">
                        <h6>
                            New to UT Flow?&nbsp;
                            <Link to="/signup">
                                Sign up
                            </Link>
                        </h6>
                    </label>
                </div>
            </div>


        )
    }
}

export default Login