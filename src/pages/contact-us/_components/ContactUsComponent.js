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

	let nextState = {
		firstname: '',
		lastname: '',
		email: '',
		message: ''
	}

	return (
		<main className='main-sub container-fluid' >
			<div className='contact-us col-lg-6 mx-auto'>
				<div style={{ textAlign: 'center' }}>
					<h1 className='display-3 contact-header'>Contact Us</h1>
					<div className='contact-description lead'>
						We would like to hear your thoughts on our website. <br /> Send us a feedback so we can improve!
					</div>
				</div>
				<div className='d-flex justify-content-center'>
					<div className='col-sm-6'>
						<Formik
							enableReinitialize
							initialValues={initialValues}
							validationSchema={validation}
							onSubmit={props.handleSubmit}
							nextInitialState={nextState}
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
								<div className='contact-submit'>
									<button className='btn btn-outline-dark font-weight-bold' type="submit">Submit</button>
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
		</main>
	)
}

export default ContactUsComponent