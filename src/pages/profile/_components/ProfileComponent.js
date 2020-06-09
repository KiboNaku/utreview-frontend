import React from 'react'
import Avatar from 'react-avatar'

function ProfileComponent(props) {
	return (
		<div className='main-sub container-fluid profile-container'>
			<div className='row'>
				<div className='col-lg-8 profile'>
					<div className='user-information'>
						<Avatar
							className='profile-pic'
							name={props.data.first_name + ' ' + props.data.last_name}
							size="100"
							src={props.data.profilePic}
							round={true} />
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