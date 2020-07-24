import React from 'react'
import GoogleButton from "./../_utils/GoogleButton"
import ModalHeader from "./../_utils/ModalHeader"
import UTEmail from "./../_utils/UTEmail"
import './../../../utcolors.css'
import Loading from './../../_utils/Loading'

function LoginComponent(props) {

    let loading =
        <div className="on-top">
            <Loading />
        </div>

    return (
        <div className="modal fade" id="login-modal" role="dialog">

            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">

                    <ModalHeader text="Log In" />

                    <div className="modal-body">

                        {props.data.loading && loading}
                        <form className="form-signin mt-3" onSubmit={props.onSubmit}>

                            <div className="my-3">
                                <UTEmail email={props.data.email} onChange={props.onChange} />
                            </div>

                            <div className="form-group my-3">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={props.data.password}
                                    onChange={props.onChange}
                                    placeholder="password"
                                    required />
                            </div>

                            {/* <div className="form-label-group checkbox my-1">
                                <input type="checkbox" value="remember-me" />
                                <label className="pl-2">Remember me</label>
                            </div> */}

                            <button className="btn btn-lg btn-utcolor btn-block mt-2 font-weight-bold" type="submit">Log In</button>

                            <span className="forgot-password-text center" type="button" data-toggle="modal" data-target="#forgot-password-modal">
                                    <a data-dismiss="modal" data-toggle="modal" data-target="#forgot-password-modal" className="utcolor"><p className="center">Forgot Password?</p></a>
                                </span>

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

export default LoginComponent