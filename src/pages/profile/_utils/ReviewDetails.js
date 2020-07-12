import React from 'react'
import ModalHeader from './../../popups/_utils/ModalHeader'

function ReviewDetails(props) {
	return (
		<div className="modal fade" id={'review-details-modal' + props.data.id} role="dialog">

			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<ModalHeader text="Details" />
					<div className="modal-body">
						<table className='table table-borderless review-content'>
							<thead>
								<tr>
									<th className='review-cell' scope="col" colSpan='2'>
										Course:
									</th>
									<th className='review-cell' scope="col" colSpan='2'>
										Professor:
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
									<td style={{ borderRight: 'solid 1px' }} colSpan='2'>{props.data.courseRating.comments}</td>
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