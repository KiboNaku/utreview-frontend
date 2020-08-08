import React from 'react'
import ProfilePicture from './../_utils/ProfilePicture'
import Loading from './../../_utils/Loading.js'
import UserCourses from '../user-courses/UserCourses'
import UploadCourses from '../user-courses/UploadCourses'
import ReviewList from './../review-list/ReviewList.js'

function ProfileComponent(props) {
	let loading = <Loading />
	let reviewList = (
		<div className='profile-review-list'>
			{props.setReviewData()}
		</div>
	)

	let uploadCourses = (
	<button type="button" className="btn btn-outline-dark font-weight-bold btn-upload-courses" data-toggle="modal" data-target={'#upload-courses'} >
		Upload Courses
	</button>
	)
	return (
		<div className='main-sub container-fluid profile-container'>
			<div className='d-flex justify-content-center'>
				<div className='col-lg-8 profile'>
					<div className='settings-button'>
						<button type="button" className="btn btn-outline-dark font-weight-bold" data-toggle="modal" data-target={'#edit-profile'} >
							Edit Profile
						</button>
					</div>
					<div className='user-information'>
						<ProfilePicture
							name={props.data.firstName + ' ' + props.data.lastName}
							image={props.data.profilePic}
						/>
						<h1 className='profile-name'>{props.data.firstName + ' ' + props.data.lastName}</h1>
						<p> <b>Email:</b> {props.data.email} </p>
						<p> <b>Major:</b> {props.data.major !== null ? props.data.major : (props.data.otherMajor !== null && props.data.otherMajor !== "" ? props.data.otherMajor : "N/A")} </p>
					</div>
					
					
					{props.data.loading ? loading : <ReviewList editReview={props.editReview} 
							deleteReview={props.deleteReview} reviewList={props.data.reviews}/>}
					{props.data.uploadedCourses ? <UserCourses /> : uploadCourses}
					<UploadCourses />
				</div>
			</div>
		</div>
	)
}

export default ProfileComponent