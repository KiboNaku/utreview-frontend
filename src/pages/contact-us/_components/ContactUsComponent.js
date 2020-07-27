import React from 'react'
import { Formik, Form } from 'formik'
import { validation } from './../_util/ContactUsFunctions'
import { TextInput, TextArea, } from './../_util/ContactUsFormElements'

function ContactUsComponent(props) {

	let initialValues = {
		firstname: props.data.firstName,
		lastname: props.data.lastName,
		email: props.data.email,
		message: ''
	}

	return (
		<main className='main-sub about container-fluid'>
			<h1 className='display-3 contact-header'>Contact Us</h1>
			<div className='d-flex justify-content-center'>
				<div className='col-lg-8'>
					<Formik
						enableReinitialize
						initialValues={initialValues}
						validationSchema={validation}
						onSubmit={props.handleSubmit}
					>
						<Form>
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
							<TextArea
								label='Message'
								name='message'
								type='text'
							/>
							<button className='btn btn-outline-dark font-weight-bold contact-submit' type="submit">Submit</button>
						</Form>
					</Formik>
				</div>
			</div>

			<div id='feedback-received' className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
				<div className="toast-body feedback-notif">
					<button type="button" className="close feedback-notif-close" data-dismiss="toast" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<div className='feedback-notif-text'>
						Thank you. We will use your feedback to improve your experience.
					</div>
				</div>
			</div>
		</main>
	)
}

export default ContactUsComponent