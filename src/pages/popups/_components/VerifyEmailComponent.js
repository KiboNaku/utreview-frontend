import React from 'react'
import ModalHeader from './../_utils/ModalHeader'
import Loading from './../../_utils/Loading'

function VerifyEmailComponent(props) {

	let loading =
		<div className="on-top">
			<Loading />
		</div>

	return (
		<div className="modal fade absolute" id="verifyemail-modal" role="dialog">
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">

					<ModalHeader text="Verify Account" />

					<div className="modal-body">

						{props.data.loading && loading}
						
						<p className="text-center">
							For your protection, a verification email has been sent to { props.data.email }. Please click the link provided to verify this email.
						</p>

						<form className="form-signin mt-3" onSubmit={props.onSubmit}>
							<button className="btn btn-sm btn-utcolor btn-block mt-1 font-weight-bold" type="submit">Resend Email</button>
						</form>
					</div>
				</div>
			</div >
		</div >
	)
}

export default VerifyEmailComponent