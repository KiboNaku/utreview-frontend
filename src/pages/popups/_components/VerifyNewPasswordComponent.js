import React from 'react'
import ModalHeader from './../_utils/ModalHeader'
import Loading from './../../_utils/Loading'

function VerifyNewPasswordComponent(props) {

	let loading =
		<div className="on-top">
			<Loading size='30px' bare="True" />
		</div>

	let loadingText =
		<p className="text-center">
			Please wait {props.data.loading} seconds before requesting another resend.
		</p>

	return (
		<div className="modal fade absolute" id="verify-new-password-modal" role="dialog">
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">

					<ModalHeader text="Password Creation" />

					<div className="modal-body">

						<p className="text-center">
							A password creation email has been sent to the address provided. Please click the link provided to set your password.
						</p>

						<div className="form-wrapper">
							{props.data.loading > 0 && loading}
							<form className="form-signin mt-3" onSubmit={props.onSubmit}>
								<button className="btn btn-sm btn-utcolor btn-block mt-1 font-weight-bold" type="submit">Resend Email</button>
							</form>

						</div>
						
						<p className="text-center loading-text">
							The email may take up to 2-3 minutes to send.
						</p>

						{props.data.loading > 0 && loadingText}
					</div>
				</div>
			</div >
		</div >
	)
}

export default VerifyNewPasswordComponent