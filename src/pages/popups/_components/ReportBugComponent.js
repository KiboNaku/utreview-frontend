import React from 'react'
import { useFormik, Field, Formik, Form, ErrorMessage, getIn } from 'formik'
import { validation } from './../_utils/ReportBugFunctions'
import ModalHeader from "./../_utils/ModalHeader"
import { BugAreaSelect } from './ReportBugElements'
import { TextInput, TextArea, } from './../../contact-us/_util/ContactUsFormElements'

function ReportBugComponent(props) {

	let initialValues = {
		firstname: '',
		lastname: '',
		email: '',
		bugArea: '',
		message: ''
	}

	return (
		<div className="modal fade" id="report-bug" role="dialog">
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<ModalHeader text="Report A Bug" />
					<div className="modal-body">
						<Formik
							enableReinitialize
							initialValues={initialValues}
							validationSchema={validation}
							onSubmit={props.handleSubmit}
						>
							<Form>
								{/* 
									name
									email 
									types of bug
										seperate by pages
									description 
								 */}

								<TextInput
									label='First Name'
									name='firstname'
									type='text'
								/>
								<TextInput
									label='Last Name'
									name='lastname'
									type='text'
								/>
								<TextInput
									label='Email'
									name='email'
									type='text'
								/>

								<BugAreaSelect
									value={values.bugArea}
									options={props.data.pages}
									onChange={setFieldValue}
									onBlur={setFieldTouched}
									error={errors.topics}
									touched={touched.topics}
									style={invalidInputStyle(errors, touched, 'bugArea')}
								/>

								<TextArea
									label='Message'
									name='message'
									type='text'
								/>

								<div className='contact-submit'>
									<button className='btn btn-outline-dark font-weight-bold' type="submit">Submit</button>
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReportBugComponent