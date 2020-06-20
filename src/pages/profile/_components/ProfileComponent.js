import React from 'react'
import ProfilePicture from './../_utils/ProfilePicture'

function ProfileComponent(props) {
	return (
		<div className='main-sub container-fluid profile-container'>
			<div className='d-flex justify-content-center'>
				<div className='col-lg-8 profile'>
					<div className='settings-button'>
						<button type="button" className="btn btn-outline-dark font-weight-bold" data-toggle="modal"data-target={'#settings'} >
							Settings </button>
					</div>
					<div className='user-information'>
						<ProfilePicture
							name={props.data.first_name + ' ' + props.data.last_name}
							profilePic={props.data.profilePic}
						/>
						<h1 className='profile-name'>{props.data.first_name + ' ' + props.data.last_name}</h1>
						<p> <b>Email:</b> {props.data.email} </p>
						<p> <b>Major:</b> {props.data.major} </p>
					</div>
					<hr className='profile-divider' />
					<div className='review-list'>
						<div className="row">
							{props.setReviewData()}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileComponent