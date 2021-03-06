import React from 'react'
import * as Yup from 'yup'
import { Field, Formik, ErrorMessage, getIn } from 'formik'

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

function ResetPasswordComponent(props) {
    const ResetPasswordForm = () => {
        return (
            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: ''
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
                onSubmit={(values) => {
                    props.onSubmit(values)
                }}
            >
                {formik => {

                    return (
                        <form className="form-signin" onSubmit={formik.handleSubmit}>
                            <div className="form-group my-3">
                                <label htmlFor="password">Password<small className='text-danger'> *</small></label>
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
                                <label htmlFor="confirmPassword">Confirm Password<small className='text-danger'> *</small></label>
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    className="form-control"
                                    placeholder="********"
                                    style={invalidInputStyle(formik.errors, formik.touched, 'confirmPassword')}
                                />
                                <ErrorMessage component="div" className="text-danger" name="confirmPassword" />
                            </div>

                            <button className="btn btn-lg btn-utcolor btn-block mt-2 font-weight-bold" type="submit"> {props.data.reset ? "Reset Password" : "Create Password"} </button>

                        </form>
                    )
                }}

            </Formik>
        )
    }

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h3>{props.data.reset ? "Reset Password" : "Create Password"}</h3>
            </div>
            <div className="modal-body">
                <ResetPasswordForm />
            </div>
        </div>
    )
}

export default ResetPasswordComponent