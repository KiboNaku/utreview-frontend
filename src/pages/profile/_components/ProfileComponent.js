import React from 'react'
import ProfilePicture from './../_utils/ProfilePicture'
import Loading from './../../_utils/Loading.js'

function ProfileComponent(props) {
	let loading = <Loading />
	let reviewList = (
	<div className='profile-review-list'>
		{props.setReviewData()}
	</div>
	)
	return (
		<div className='main-sub container-fluid profile-container'>
			<div className='d-flex justify-content-center'>
				<div className='col-lg-8 profile'>
					<div className='settings-button'>
						<button type="button" className="btn btn-outline-dark font-weight-bold" data-toggle="modal" data-target={'#settings'} >
							Settings </button>
					</div>
					<div className='user-information'>
						<ProfilePicture
							name={props.data.firstName + ' ' + props.data.lastName}
							image={props.data.profilePic}
						/>
						<h1 className='profile-name'>{props.data.firstName + ' ' + props.data.lastName}</h1>
						<p> <b>Email:</b> {props.data.email} </p>
						<p> <b>Major:</b> {props.data.major} </p>
					</div>
					<div className="reviews-title">
						Reviews
					</div>
					<hr className='profile-divider' />
						{props.data.loaded ? reviewList: loading}
				</div>
			</div>
		</div>
	)
}

export default ProfileComponent