import React from 'react'
import ModalHeader from '../../popups/_utils/ModalHeader'

export function ProfilePicModal(props) {
	return (
		<div className="modal fade" id={'change-profile-pic'} role="dialog">
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<ModalHeader text="Profile Pictures" />
					<div className="modal-body">
						{props.setImageData()}
					</div>
				</div>
			</div>
		</div>
	)
}