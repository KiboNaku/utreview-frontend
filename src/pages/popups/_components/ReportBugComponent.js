import React from 'react'
import Select from "react-select"
import UTEmail from './../_utils/UTEmail'
import ModalHeader from "./../_utils/ModalHeader"

function ReportBugComponent(props) {

	return (
		<div className="modal fade" id="report-bug" role="dialog">
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<ModalHeader text="Report A Bug" />
					<div className="modal-body">
						<form class="needs-validation" novalidate>
							<div className='form-group'>
								<label for='page'>Page <small className='text-danger'>*</small></label>
								<Select
									name="page"
									value={props.data.page !== null ?
										props.data.pages.filter(page => page.value === props.data.page) : null}
									options={props.data.pages}
									onChange={props.handlePageChange}
									placeholder='location of bug'
									isClearable={true}
									isSearchable={true}
								/>
							</div>
							{props.data.page !== '' && props.data.page !== null && props.data.page !== undefined &&
								<div className='form-group'>
									<label for='page'>Bug Type <small className='text-danger'>*</small></label>
									<Select
										name="bugType"
										value={props.data.bugType !== null ?
											props.data.bugTypes[props.data.page].filter(bugType => bugType.value === props.data.bugType) : null}
										options={props.data.bugTypes[props.data.page]}
										onChange={props.handleBugTypeChange}
										placeholder='type of bug'
										isClearable={true}
										isSearchable={true}
									/>
								</div>
							}
							<div className='form-group'>
								<label for='description'>Description <small className='text-danger'>*</small></label>
								<textarea
									className="form-control" rows="3"
									name='description'
									value={props.data.description}
									placeholder="describe the bug"
									onChange={props.handleChange}
									maxlength="1000"
								/>
							</div>

							<div style={{ textAlign: 'center' }} className='mb-3'>
								<button className='btn btn-outline-dark font-weight-bold' type="submit">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div >
	)
}

export default ReportBugComponent