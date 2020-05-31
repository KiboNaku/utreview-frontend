import React, { Component } from 'react'

class Login extends Component {

    render() {
        return (
            <div>
                <form className="form-signin">
                    <div className="form-label-group">
                        
                        <label for="inputEmail">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
                    </div>

                    <div className="form-label-group">
                        
                        <label for="inputPassword">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </div>
        )
    }
}

export default Login