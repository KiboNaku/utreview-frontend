import React from 'react'
import ModalHeader from '../popups/_utils/ModalHeader'

function ResetPasswordForm(props) {
    let passwordsNoMatch = (
        <small>
            The passwords must match
        </small>
        )
    return (
        <div>
            <h3>Reset Password</h3>
            <form className="form-signin mt-3" onSubmit={props.onSubmit}>
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

                <div className={"form-group my-3"}>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        value={props.data.confirmPassword}
                        onChange={props.onChange}
                        placeholder="confirm password"
                        required />
                </div>
                {props.data.passwordsNoMatch ? passwordsNoMatch : null}
                <button className="btn btn-lg btn-utcolor btn-block mt-2 font-weight-bold" type="submit"> Reset Password </button>

            </form>
        </div>
    )
}

export default ResetPasswordForm