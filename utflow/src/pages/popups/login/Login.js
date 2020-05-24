import React, { Component } from 'react'

class Login extends Component {

    render() {
        return (
            <div className="py-5">

                <form className="form-signin">
                    <div className="form-label-group">

                        <label for="inputEmail"><h6 className="text-center">EMAIL</h6></label>
                        <br />
                        <span className="d-flex">
                            <input type="email" id="inputEmail" className="form-control d-inline" placeholder="example" required autofocus />
                            <label className="px-2 float-right" style={{ marginTop: 6 }} for="inputEmail"> @utexas.edu</label>
                        </span>
                    </div>

                    <div className="form-label-group mt-3">

                        <label for="inputPassword"><h6 className="text-center">PASSWORD</h6></label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="1234567890" required />
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
                    <a href="#"><p className="text-center">Forgot password?</p></a>
                </form>

                <div class="text-center my-3">
                    <h5><strong>OR</strong></h5>
                </div>

                <div>
                    <form className="form-signin">
                        <button class="btn btn-lg btn-dark btn-block" type="submit">
                            <div class="fab fa-google px-3"></div>
                            Log in with Google
                        </button>
                    </form>

                </div>

                <hr/>

                <div align="center">
                    <p className="center-text pt-3 d-inline-block"><h6>New to UT Flow? <a href="#">Sign up</a></h6></p>
                </div>
            </div>
        )
    }
}

export default Login