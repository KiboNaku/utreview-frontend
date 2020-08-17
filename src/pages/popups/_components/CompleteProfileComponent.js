import React from 'react'
import * as Yup from 'yup'
import { Field, Formik, ErrorMessage, getIn } from 'formik'
import MajorSelect from './../../popups/_components/MajorSelect'
import ModalHeader from "../_utils/ModalHeader"

function containsSpecialChars(str) {
	var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
	return regex.test(str);
}

function containsNumbers(str) {
	var regex = /\d/g;
	return regex.test(str);
}

function invalidInputStyle(errors, touched, fieldName) {
	if (getIn(errors, fieldName) && getIn(touched, fieldName)) {
		return {
			border: '1px solid red'
		}
	} else {
		return null
	}
}

export default function CompleteProfileComponent(props) {

	const CompleteMajorForm = () => {
		return (
			<Formik
				initialValues={{
					major: null,
					otherMajor: '',
					showOtherMajor: false,
					noMajor: false
				}}
				validationSchema={Yup.object({
					showOtherMajor: Yup.boolean(),
					noMajor: Yup.boolean(),
					major: Yup.string()
						.nullable(),
					otherMajor: Yup.string()
						.when('showOtherMajor', {
							is: (showOtherMajor) => showOtherMajor,
							then: Yup.string()
								.required('Required')
						})
						.test(
							'No special characters',
							'Must not contain special characters',
							function (value) {
								return !containsSpecialChars(value);
							}
						)
						.test(
							'No numeric characters',
							'Must not contain numeric characters',
							function (value) {
								return !containsNumbers(value);
							}
						),
				})}
				onSubmit={(values, actions) => {
					actions.setStatus({ submitted: true })
					props.onMajorCompletion(values)
				}}
			>
				{formik => {
					let noMajor = (
						<div className="col-sm-4">
							<input
								role="button"
								type="checkbox"
								name="noMajor"
								checked={formik.values.noMajor}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange} />
							<label for="noMajor" className="other-major-label" > No major</label>
						</div>
					)

					let otherMajor = (
						<div className='col-sm-8'>
							<Field
								name="otherMajor"
								type="text"
								className="form-control"
								placeholder="Other Major"
								style={invalidInputStyle(formik.errors, formik.touched, 'otherMajor')}
							/>
							<ErrorMessage component="div" className="text-danger" name="otherMajor" />
						</div>
					)

					return (
						<form onSubmit={formik.handleSubmit}>
							<div className="form-group my-3">
								<MajorSelect
									required={false}
									value={formik.values.major}
									options={props.data.majorList}
									isLoading={!props.data.majorListLoaded}
									onChange={formik.setFieldValue}
									onBlur={formik.setFieldTouched}
									error={formik.errors.topics}
									touched={formik.touched.topics}
									style={invalidInputStyle(formik.errors, formik.touched, 'major')}
									disabled={formik.values.showOtherMajor || formik.values.noMajor}
								/>
							</div>
							<div className="form-group row">
								<div className="col-sm-4">
									<input
										role="button"
										type="checkbox"
										name="showOtherMajor"
										checked={formik.values.showOtherMajor}
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										disabled={formik.values.noMajor} />
									<label for="showOtherMajor" className="other-major-label" > Other major</label>
								</div>
								{formik.values.showOtherMajor ? otherMajor : noMajor}
							</div>

							<div className='modal-footer d-block' align='center'>
								<div className='small'>Note: You may edit the following fields from your profile in the future.</div>
								<button
									type='submit'
									className='btn btn-outline-dark font-weight-bold'
									disabled={!formik.dirty}
								>
									Submit
								</button>
								<button
									className='btn btn-outline-dark font-weight-bold'
									type='button'
									onClick={props.handleSkip}
									disabled={formik.dirty && formik.submitCount < 1}
								>
									{formik.dirty ?
										'Next' : 'Skip'}
								</button>
							</div>

						</form>
					)
				}}
			</Formik>
		)
	}

	const CompletePasswordForm = () => {
		let formSubmitted = false

		return (
			<Formik
				initialValues={{
					password: '',
					confirmPassword: '',
				}}
				validationSchema={Yup.object({
					password: Yup.string()
						.max(50, 'Must be 50 characters or less')
						.min(8, 'Must be at least 8 characters')
						.test(
							'Not enough alphabet characters',
							'Must contain at least 1 alphabet character',
							function (value) {
								return /[a-zA-Z]/.test(value)
							}
						)
						.test(
							'Not enough special characters',
							'Must contain at least 1 special character',
							function (value) {
								return containsSpecialChars(value);
							}
						)
						.test(
							'Not enough numeric characters',
							'Must contain at least 1 numeric character',
							function (value) {
								return containsNumbers(value);
							}
						)
						.nullable(),
					confirmPassword: Yup.string()
						.when('password', {
							is: (password) => password !== undefined ? password.length > 0 : false,
							then: Yup.string()
								.required('Required')
						})
						.oneOf([Yup.ref('password'), null], 'Passwords must match')
				})}
				onSubmit={(values, actions) => {
					actions.setStatus({ submitted: true })
					formSubmitted = true
					props.onPasswordCompletion(values)
				}}
			>
				{formik => {
					return (
						<form className="form-signin" onSubmit={formik.handleSubmit}>

							<div className="form-group my-3">
								<label htmlFor="password">Password</label>
								<Field
									name="password"
									type="password"
									className="form-control"
                                    placeholder="********"
									style={invalidInputStyle(formik.errors, formik.touched, 'password')}
								/>
								<ErrorMessage component="div" className="text-danger" name="password" />
							</div>

							<div className="form-group my-3">
								<label htmlFor="confirmPassword">Confirm Password</label>
								<Field
									name="confirmPassword"
									type="password"
									className="form-control"
                                    placeholder="********"
									style={invalidInputStyle(formik.errors, formik.touched, 'confirmPassword')}
								/>
								<ErrorMessage component="div" className="text-danger" name="confirmPassword" />
							</div>

							<div className='modal-footer d-block' align='center'>
								<div className='small'>Note: You may edit the following fields from your profile in the future.</div>
								<button
									type='submit'
									className='btn btn-outline-dark font-weight-bold'
									disabled={!formik.dirty}
								>
									Submit
								</button>
								<button
									className='btn btn-outline-dark font-weight-bold'
									type='button'
									onClick={props.handleSkip}
									disabled={formik.dirty && formik.submitCount < 1}
								>
									{formik.dirty ?
										'Finish' : 'Skip'}
								</button>
							</div>

						</form>
					)
				}}

			</Formik>
		)
	}

	return (
		<div className="modal fade" id="complete-profile" role="dialog">
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<ModalHeader text="Complete Your Profile (Optional)" />
					<div className="modal-body">
						{props.data.majorPage ?
							<CompleteMajorForm /> :
							<CompletePasswordForm />
						}
					</div>
				</div>
			</div>
		</div>
	)
}