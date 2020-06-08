import React from 'react'
import ModalHeader from './../../popups/_utils/ModalHeader'

function ReviewDetails(props) {
	return (
		<div className="modal fade" id="review-details-modal" role="dialog">

			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<ModalHeader text="Details" />
					<div className="modal-body">
						<table className='table table-borderless review-content'>
							<thead>
								<tr>
									<th style={{ width: '50%' }} className='review-cell' scope="col" colspan='2'>
										Course:
									</th>
									<th style={{ width: '50%' }} className='review-cell' scope="col" colspan='2'>
										Professor:
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td> Usefulness: </td>
									<td> {props.data.Usefulness}</td>
									<td> Clear: </td>
									<td> {props.data.Clear}</td>
								</tr>
								<tr>
									<td> Difficulty: </td>
									<td> {props.data.Difficulty}</td>
									<td> Engaging: </td>
									<td> {props.data.Engaging}</td>
								</tr>
								<tr>
									<td> Workload: </td>
									<td> {props.data.Workload}</td>
									<td> Grading Difficulty: </td>
									<td> {props.data.GradingDifficulty}</td>
								</tr>
								<tr>
									<td style={{ borderRight: 'solid 1px' }} colspan='2'>{props.data.CourseComment}</td>
									<td colspan='2'>{props.data.ProfessorComment}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="modal-footer d-block" align="center">
						<button
							type="button"
							className="btn btn-outline-dark font-weight-bold"
							onClick={props.editReview}
						> Edit Review
                    </button>
					</div>
				</div>
			</div >
		</div >
	)
}

export default ReviewDetails