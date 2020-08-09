import React from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { Field, Formik, ErrorMessage, getIn } from 'formik'
import GoogleButton from "./../_utils/GoogleButton"
import ModalHeader from "./../_utils/ModalHeader"
import './../../../utcolors.css'
import Loading from './../../_utils/Loading'

function invalidInputStyle(errors, touched, fieldName) {
    if (getIn(errors, fieldName) && getIn(touched, fieldName)) {
        return {
            border: '1px solid red'
        }
    } else {
        return null
    }
}

function LoginComponent(props) {

    const LoginForm = () => {
        return (
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .test('Check valid email', 'An account does not exist for this email',
                            function (value) {
                                if (value === undefined) {
                                    return true
                                }
                                return new Promise((resolve, reject) => {
                                    axios
                                        .post('/api/check_valid_email', {
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
                    password: Yup.string()
                        .test('Check valid password', 'Invalid email/password combination',
                            function (value) {
                                if (value === undefined) {
                                    return true
                                }
                                return new Promise((resolve, reject) => {
                                    axios
                                        .post('/api/check_valid_password', {
                                            email: this.parent.email + '@utexas.edu',
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
                        .required('Required')
                })}
                onSubmit={(values, { validate }) => {
                    props.onSubmit(values)
                }}
            >
                {formik => {

                    return (
                        <form onSubmit={formik.handleSubmit}>
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
                                <label htmlFor="password">Password<small className='text-danger'> *</small></label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    style={invalidInputStyle(formik.errors, formik.touched, 'password')}
                                />
                                <ErrorMessage component="div" className="text-danger" name="password" />
                            </div>

                            <span className="forgot-password-text center" type="button" data-toggle="modal" data-target="#forgot-password-modal">
                                <a data-dismiss="modal" data-toggle="modal" data-target="#forgot-password-modal" className="utcolor"><p className="center">Forgot Password?</p></a>
                            </span>

                            <button className="btn btn-lg btn-utcolor btn-block mt-2 font-weight-bold" type="submit"> Log in </button>

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
        <div className="modal fade" id="login-modal" role="dialog">

            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">

                    <ModalHeader text="Log In" />

                    <div className="modal-body">

                        {props.data.loading && loading}

                        <LoginForm />

                        <div className="text-center my-3">
                            <h5 style={{marginBottom: "60px"}}><strong>OR</strong></h5>
                        </div>

                        <form className="mb-3" style={{position: "absolute", left: "50%", marginLeft: "-90px", marginTop: "-50px"}}>
                            <GoogleButton
                                loginGoogle={props.loginGoogle}
                                handleLoginFailureGoogle={props.handleLoginFailureGoogle}
                                logoutGoogle={props.logoutGoogle}
                                handleLogoutFailureGoogle={props.handleLogoutFailureGoogle}
                                data={props.data}
                                text='Login with Google'
                            />
                        </form>
                    </div>

                    <div className="modal-footer d-block" align="center">
                        <label className="center-text pt-3 d-inline-block">
                            <h6>
                                New to UT Flow?&nbsp;
                                    <span type="button" onClick={props.signup}>
                                    <a className="utcolor">Sign Up</a>
                                </span>
                            </h6>
                        </label>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default LoginComponent