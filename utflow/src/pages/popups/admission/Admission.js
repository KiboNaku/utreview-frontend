import React, { Component } from 'react'

class Admission extends Component {

    render() {

        /**
         * Properties:
         * 1. mode: show either login or signup page
         *    values = "login", "signup"
         *    default = "login"
         */

        let signup = this.props.mode === "signup"

        return (
            <div className="py-3">

                <form className="form-signin">

                    <h3 className="pb-2"><strong>{signup? "Sign up" : "Log in"}</strong></h3>

                    <div className={`form-label-group ${!signup && "d-none"}`}  >
                        <input type="text" id="inputEmail" className="form-control d-inline col-6" placeholder="first name" required autoFocus />
                        <input type="text" id="inputEmail" className="form-control d-inline col-6" placeholder="last name" required autoFocus />
                    </div>

                    <div className="form-label-group mt-3">
                        <span className="d-flex">
                            <input type="text" id="inputEmail" className="form-control d-inline" placeholder="email" required autoFocus />
                            <label className="px-2 float-right" style={{ marginTop: 6 }}>@utexas.edu</label>
                        </span>
                    </div>

                    <div className="form-label-group mt-3">
                        <input type="password" id="inputPassword" className="form-control" placeholder="password" required />
                    </div>

                    <div className={signup ? "form-label-group mt-3" : "d-none"}>
                        <input type="password" id="confirmPassword" className="form-control" placeholder="confirm password" requred={signup ? "true" : "false"} />
                    </div>

                    <div className={signup ? "d-none" : "checkbox mt-1"}>
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">{signup ? "Sign up" : "Log in"}</button>
                    <a href="#" className={signup && "d-none"}><p className="text-center">Forgot password?</p></a>
                </form>

                <div className="text-center my-3">
                    <h5><strong>OR</strong></h5>
                </div>

                <div>
                    <form className="form-signin">
                        <button className="btn btn-lg btn-dark btn-block" type="submit">
                            <div className="fab fa-google px-3"></div>
                            {signup ? "Sign up" : "Log in"} with Google
                        </button>
                    </form>

                </div>
            </div>
        )
    }
}

export default Admission