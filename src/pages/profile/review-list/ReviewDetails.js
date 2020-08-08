import React from 'react'
import { Link } from 'react-router-dom'
import ModalHeader from './../../popups/_utils/ModalHeader'
import $ from './../../../../node_modules/jquery'

function ReviewDetails(props) {
	const profPath = props.data.prof.firstName.toLowerCase().replace(" ", "") + "_" + props.data.prof.lastName.toLowerCase().replace(" ", "")
	let coursePath = props.data.course.dept.abr.toLowerCase().replace(' ', '') + "_" + props.data.course.num.toLowerCase()
	if (props.data.course.topicNum >= 0) {
		coursePath += "_" + props.data.course.topicNum.toString()
	}
	return (
		<div className="modal fade" id={'review-details-modal' + props.data.id} role="dialog">

			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<ModalHeader text="Details" />
					<div className="modal-body">
						<h5>Last updated: {props.data.timeAgo} </h5>
						<h5> Grade: {props.data.grade !== null ? props.data.grade : "N/A"}</h5>
						<table className='table table-borderless review-content'>
							<thead>
								<tr>
									<th className='review-cell' scope="col" colSpan='2'>
										Course: <Link
											className="utcolor"
											to={{
												pathname: `/course-results/${coursePath}`,
											}}
											onClick={() => { $('.modal').modal('hide') }}
										> {props.data.course.dept.abr + " " + props.data.course.num}
										</Link>
									</th>
									<th className='review-cell' scope="col" colSpan='2'>
										Professor: <Link
											className="utcolor"
											to={{
												pathname: `/prof-results/${profPath}`,
												state: {
													profId: props.data.prof.id
												}
											}}
											onClick={() => { $('.modal').modal('hide') }}
										> {props.data.prof.firstName} {props.data.prof.lastName}
										</Link>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td> Usefulness: </td>
									<td> {props.data.courseRating.usefulness}</td>
									<td> Clear: </td>
									<td> {props.data.profRating.clear}</td>
								</tr>
								<tr>
									<td> Difficulty: </td>
									<td> {props.data.courseRating.difficulty}</td>
									<td> Engaging: </td>
									<td> {props.data.profRating.engaging}</td>
								</tr>
								<tr>
									<td> Workload: </td>
									<td> {props.data.courseRating.workload}</td>
									<td> Grading: </td>
									<td> {props.data.profRating.grading}</td>
								</tr>
								<tr>
									<td colSpan='2'>{props.data.courseRating.comments}</td>
									<td colSpan='2'>{props.data.profRating.comments}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="modal-footer d-block" align="center">
						<button
							type="button"
							className="btn btn-outline-dark font-weight-bold"
							onClick={() => props.editReview(props.data.id)}
						> Edit Review
                    </button>
					</div>
				</div>
			</div >
		</div >
	)
}

export default ReviewDetails