import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {signup} from './UserFunctions'

class Signup extends Component {

    constructor(){
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password:'',
            major: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        console.log("changed state")
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()
        console.log("submit pressed")

        if(this.state.password != this.state.confirm_password){
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
            if(res.error){
                alert(res.error)
            }else{
                this.props.history.push('/login')
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

        let signup = true

        return (

            <div className="border rounded col-9 col-sm-7 col-md-5 col-lg-4 col-xl-3 pt-5">
                <div className="py-3">
                    <form className="form-signin" onSubmit = {this.onSubmit}>
                        <h3 className="pb-2"><strong> Sign Up </strong></h3>
                        <div className="form-label-group">
                            <input 
                                type="text" 
                                id="firstName" 
                                name="first_name"
                                className="form-control d-inline col-6" 
                                placeholder="first name" 
                                value = {this.state.first_name}
                                onChange = {this.onChange}
                                required autoFocus />
                            <input 
                                type="text" 
                                id="lastName" 
                                name="last_name"
                                className="form-control d-inline col-6" 
                                placeholder="last name" 
                                value = {this.state.last_name}
                                onChange = {this.onChange}
                                required autoFocus />
                            <input 
                                type="text" 
                                id="major" 
                                name="major"
                                className="form-control mt-3" 
                                placeholder="major" 
                                value = {this.state.major}
                                onChange = {this.onChange}
                                required autoFocus />
                        </div>
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
                        
                        <div className={"form-label-group mt-3"}>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                name="confirm_password"
                                className="form-control" 
                                value = {this.state.confirm_password}
                                onChange = {this.onChange}
                                placeholder="confirm password" 
                                required />
                        </div>

                        <button className="btn btn-lg btn-primary btn-block mt-3" type="submit" > Sign up </button>
                        
                    </form>

                    <div className="text-center my-3">
                        <h5><strong>OR</strong></h5>
                    </div>

                    <div>
                        <form className="form-signin">
                            <button className="btn btn-lg btn-dark btn-block" type="submit">
                                <div className="fab fa-google px-3"></div>
                                Sign up with Google
                            </button>
                        </form>

                    </div>
                </div>

                <hr />

                <div align="center">
                    <label className="center-text pt-3 d-inline-block">
                        <h6>
                            Already have an account?&nbsp;
                            <Link to="/login">
                                Log in
                            </Link>
                        </h6>
                    </label>
                </div>
            </div>
        )
    }
}

export default Signup