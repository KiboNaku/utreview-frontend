import React from 'react'
import GoogleButton from "./../_utils/GoogleButton"
import ModalHeader from "./../_utils/ModalHeader"
import UTEmail from "./../_utils/UTEmail"
import './../../../utcolors.css'
import Loading from './../../_utils/Loading'

function ForgotPasswordComponent(props) {

    let loading =
        <div className="on-top">
            <Loading />
        </div>

    return (
        <div className="modal fade" id="forgot-password-modal" role="dialog">

            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">

                    <ModalHeader text="Forgot Password" />

                    <div className="modal-body">

                        {props.data.loading && loading}
                        <form className="form-signin mt-3" onSubmit={props.onSubmit}>

                            <div className="my-3">
                                <UTEmail email={props.data.email} onChange={props.onChange} />
                            </div>

                            <button className="btn btn-lg btn-utcolor btn-block mt-2 font-weight-bold" type="submit">Send Password Reset Email</button>

                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default ForgotPasswordComponent