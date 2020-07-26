import React from 'react'
import { Formik, Form } from 'formik';
import { TextInput } from './../_util/ContactUsFunctions'


function ContactUsComponent(props) {

	let initialValues = {
		name: props.data.name,
		email: props.data.email,
		message: ''
	}

	console.log(initialValues)

	return (
		<main className='main-sub about container-fluid'>
			<h1 className='display-3 contact-header'>Contact Us</h1>
			<div className='d-flex justify-content-center'>
				<div className='col-lg-8'>
					<Formik
						enableReinitialize
						initialValues={initialValues}
						validate={(values => {
							const errors = {};
							if (!values.name) {
								errors.name = 'Required';
							}

							if (!values.email) {
								errors.email = 'Required';
							} else if (!/^[A-Z0-9._%+-]+@utexas.edu$/i.test(values.email)) {
								errors.email = 'Invalid email address';
							}

							if (!values.message) {
								errors.message = 'Required';
							}

							return errors;
						})}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
								setSubmitting(false);
							}, 400);
						}}
					>
						<Form>
							<TextInput
								label='Name'
								name='name'
								type='text'
							/>
							<TextInput
								label='Email'
								name='email'
								type='text'
							/>
							<TextInput
								label='Message'
								name='message'
								type='text'
							/>
							<button className='contact-submit' type="submit">Submit</button>
						</Form>
					</Formik>
				</div>
			</div>
		</main>
	)
}

export default ContactUsComponent