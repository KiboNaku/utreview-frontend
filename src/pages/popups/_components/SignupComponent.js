import React from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { Field, Formik, ErrorMessage, getIn } from 'formik'
import MajorSelect from './MajorSelect'
import GoogleButton from "./../_utils/GoogleButton"
import ModalHeader from './../_utils/ModalHeader'
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

function SignupComponent(props) {

    const SignupForm = () => {
        return (
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    major: '',
                    otherMajor: '',
                    password: '',
                    confirmPassword: '',
                    showOtherMajor: false,
                    noMajor: false
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .required('Required')
                        .max(50, 'Must be 50 characters or less')
                        .min(2, 'Must be at least 2 characters')
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
                    lastName: Yup.string()
                        .required('Required')
                        .max(50, 'Must be 50 characters or less')
                        .min(2, 'Must be at least 2 characters')
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
                    email: Yup.string()
                        .test('Check duplicate email', 'An account already exists for this email',
                            function (value) {
                                return new Promise((resolve, reject) => {
                                    axios
                                        .post('/api/check_duplicate_email', {
                                            email: value + '@utexas.edu',
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
                    showOtherMajor: Yup.boolean(),
                    noMajor: Yup.boolean(),
                    major: Yup.string()
                        .nullable()
                        .when(['showOtherMajor', 'noMajor'], {
                            is: (showOtherMajor, noMajor) => !showOtherMajor && !noMajor,
                            then: Yup.string()
                                .required('Required')
                        }),
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

                    let noMajor = (
                        <div className="col-sm-4">
                            <input
                                role="button"
                                id='noMajor'
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
                                <div className="form-group my-3">
                                    <label htmlFor="firstName">First Name<small className='text-danger'> *</small></label>
                                    <Field
                                        name="firstName"
                                        type="text"
                                        className="form-control"
                                        placeholder="John"
                                        style={formik.errors.firstName && formik.touched.firstName ? { "border": '1px solid red' } : null}
                                    />
                                    <ErrorMessage component="div" className="text-danger" name="firstName" />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="lastName">Last Name<small className='text-danger'> *</small></label>
                                    <Field
                                        name="lastName"
                                        type="text"
                                        className="form-control"
                                        placeholder="Doe"
                                        style={invalidInputStyle(formik.errors, formik.touched, 'lastName')}
                                    />
                                    <ErrorMessage component="div" className="text-danger" name="lastName" />
                                </div>
                            </div>


                            <div className="my-3">
                                <div className="form-label-group">
                                    <label htmlFor="email">Email<small className='text-danger'> *</small></label>
                                    <span className="d-flex">
                                        <Field
                                            name="email"
                                            type="text"
                                            className="form-control d-inline"
                                            placeholder="john.doe"
                                            style={invalidInputStyle(formik.errors, formik.touched, 'email')}
                                        />
                                        <label className="px-2 float-right" style={{ marginTop: 6 }}>@utexas.edu</label>
                                    </span>
                                    <ErrorMessage component="div" className="text-danger" name="email" />
                                </div>
                            </div>

                            <div className="form-group my-3">
                                <MajorSelect
                                    required={true}
                                    value={formik.values.major}
                                    options={props.data.majorList}
                                    onChange={formik.setFieldValue}
                                    onBlur={formik.setFieldTouched}
                                    error={formik.errors.topics}
                                    touched={formik.touched.topics}
                                    isLoading={!props.data.majorListLoaded}
                                    style={invalidInputStyle(formik.errors, formik.touched, 'major')}
                                    disabled={formik.values.showOtherMajor || formik.values.noMajor}
                                />
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-4">
                                    <input
                                        role="button"
                                        id='showOtherMajor'
                                        type="checkbox"
                                        name="showOtherMajor"
                                        className='utcolor'
                                        checked={formik.values.showOtherMajor}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        disabled={formik.values.noMajor} />
                                    <label for="showOtherMajor" className="other-major-label" > Other major</label>
                                </div>
                                {formik.values.showOtherMajor ? otherMajor : noMajor}
                            </div>


                            <div className="form-group my-3">
                                <label htmlFor="password">Password<small className='text-danger'> *</small></label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="form-control"
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
                                    style={invalidInputStyle(formik.errors, formik.touched, 'confirmPassword')}
                                />
                                <ErrorMessage component="div" className="text-danger" name="confirmPassword" />
                            </div>

                            <button className="btn btn-lg btn-utcolor btn-block mt-2 font-weight-bold" type="submit"> Sign up </button>

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
        <div className="modal fade" id="signup-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">

                    <ModalHeader text="Sign Up" />

                    <div className="modal-body">

                        {props.data.loading && loading}
                        <SignupForm />

                        <div className="text-center my-3">
                            <h5><strong>OR</strong></h5>
                        </div>

                        <form className="mb-3">
                            <GoogleButton
                                loginGoogle={props.loginGoogle}
                                handleLoginFailureGoogle={props.handleLoginFailureGoogle}
                                logoutGoogle={props.logoutGoogle}
                                handleLogoutFailureGoogle={props.handleLogoutFailureGoogle}
                                data={props.data}
                                text='Sign Up with Google'
                            />
                        </form>
                    </div>

                    <div className="modal-footer d-block" align="center">
                        <label className="center-text pt-3 d-inline-block">
                            <h6>
                                Already have an account?&nbsp;
                                    <span className='button-type' data-toggle="modal" data-target="#signup-modal">
                                    <a data-dismiss="modal" data-toggle="modal" data-target="#login-modal" className="utcolor">Log In</a>
                                </span>
                            </h6>
                        </label>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SignupComponent