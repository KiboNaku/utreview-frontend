import React from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { Field, Formik, ErrorMessage, getIn } from 'formik'
import Loading from './../../_utils/Loading'

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

class ChangePassword extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            passwordValidated: false
        }
    }

    render() {
        let success = (
            <div className="text-success" style={{ "margin-bottom": "10px" }}>
                Your changes have been saved
            </div>
        )

        let passwordValidated = (
            <div className="text-success" style={{ "margin-bottom": "10px" }}>
                Your password has been validated
            </div>
        )

        let forgotPassword = (
            <span className="forgot-password-text center">
                <a data-dismiss="modal"  type="button" data-toggle="modal" data-target="#forgot-password-modal" className="utcolor">
                    <p className="center">Forgot Password?</p>
                </a>
            </span>
        )

        let email = this.props.data.email

        const ValidatePasswordForm = () => {
            return (
                <Formik
                    initialValues={{
                        currentPassword: '',
                    }}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validationSchema={Yup.object({
                        currentPassword: Yup.string()
                            .test('Check valid password', 'Invalid password',
                                function (value) {
                                    if (value === undefined) {
                                        return true
                                    }

                                    return new Promise((resolve, reject) => {
                                        axios
                                            .post('/api/check_valid_password', {
                                                email: email,
                                                password: value
                                            })
                                            .then(response => {
                                                if (response.data.error) {
                                                    resolve(false)
                                                } else {
                                                    resolve(true)
                                                }
                                            })
                                    })
                                }
                            )
                            .required('Required'),
                    })}
                    onSubmit={(values) => {
                        this.setState({ passwordValidated: true })
                    }}
                >
                    {formik => {

                        return (
                            <form className="form-signin" onSubmit={formik.handleSubmit}>
                                <div className="form-group my-3">
                                    <label htmlFor="currentPassword">Current Password<small className='text-danger'> *</small></label>
                                    <Field
                                        name="currentPassword"
                                        type="password"
                                        className="form-control"
                                        style={invalidInputStyle(formik.errors, formik.touched, 'currentPassword')}
                                        disabled={this.state.passwordValidated}
                                    />
                                    <ErrorMessage component="div" className="text-danger" name="currentPassword" />
                                </div>

                                {this.state.passwordValidated ? null : forgotPassword}

                                <div className='d-block' align='center'>
                                    {this.state.passwordValidated ? passwordValidated : null}
                                    <button
                                        type='submit'
                                        className='btn btn-outline-dark font-weight-bold'
                                        disabled={this.state.passwordValidated}
                                    >
                                        Validate Password
                                        </button>
                                </div>

                            </form>
                        )
                    }}

                </Formik>
            )
        }

        const ChangePasswordForm = () => {
            return (
                <Formik
                    initialValues={{
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={Yup.object({
                        password: Yup.string()
                            .required('Required')
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
                            ),
                        confirmPassword: Yup.string()
                            .required('Required')
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    })}
                    onReset={(values, actions) => {
                        this.props.handleSubmitChange(false)
                        this.setState({ passwordValidated: false })
                    }}
                    onSubmit={(values) => {
                        this.props.onSubmit(values)
                        this.props.handleSubmitChange(true)
                        this.setState({ passwordValidated: false })
                    }}
                >
                    {formik => {

                        return (
                            <form className="form-signin" onSubmit={formik.handleSubmit}>

                                <div className="form-group my-3">
                                    <label htmlFor="password">New Password<small className='text-danger'> *</small></label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        style={invalidInputStyle(formik.errors, formik.touched, 'password')}
                                        disabled={!this.state.passwordValidated}
                                    />
                                    <ErrorMessage component="div" className="text-danger" name="password" />
                                </div>

                                <div className="form-group my-3">
                                    <label htmlFor="confirmPassword">Confirm New Password<small className='text-danger'> *</small></label>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        className="form-control"
                                        style={invalidInputStyle(formik.errors, formik.touched, 'confirmPassword')}
                                        disabled={!this.state.passwordValidated}
                                    />
                                    <ErrorMessage component="div" className="text-danger" name="confirmPassword" />
                                </div>

                                <div className='modal-footer d-block' align='center'>
                                    {formik.dirty || !this.props.submitted ? null : success}
                                    <button
                                        type='submit'
                                        className='btn btn-outline-dark font-weight-bold'
                                        disabled={!this.state.passwordValidated}
                                    >
                                        Reset Password </button>
                                    <button
                                        type='button'
                                        className='btn btn-outline-dark font-weight-bold'
                                        onClick={formik.handleReset}
                                        disabled={!this.state.passwordValidated}
                                    >
                                        Cancel </button>
                                </div>

                            </form>
                        )
                    }}

                </Formik>
            )
        }

        let loading =
            <div className="on-top">
                <Loading />
            </div>



        return (
            <div>
                <ValidatePasswordForm />
                <ChangePasswordForm />
            </div>

        )
    }

}

export default ChangePassword