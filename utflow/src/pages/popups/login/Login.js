import React, { Component } from 'react'

class Login extends Component {

    render() {
        return (
            <div>

                <h3 class="font-weight-bold">Log in</h3>
                <form className="form-signin">
                    <div className="form-label-group">
                        
                        <label for="inputEmail" className="mx-2">Email</label>
                        <br/>
                        <span className="d-flex">
                            <input type="email" id="inputEmail" className="form-control d-inline" placeholder="example" required autofocus />
                            <label className="px-2 float-right" style={{marginTop:6}} for="inputEmail"> @utexas.edu</label>
                        </span>
                        </div>

                    <div className="form-label-group">
                        
                        <label for="inputPassword" className="mx-2">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="1234567890" required />
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