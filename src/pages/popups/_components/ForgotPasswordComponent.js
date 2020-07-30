import React from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik, Field, Formik, Form, ErrorMessage, getIn } from 'formik'
import GoogleButton from "./../_utils/GoogleButton"
import ModalHeader from "./../_utils/ModalHeader"
import UTEmail from "./../_utils/UTEmail"
import './../../../utcolors.css'
import Loading from './../../_utils/Loading'

function invalidInputStyle(errors, touched, fieldName) {
    if (getIn(errors, fieldName) && getIn(touched, fieldName)) {
        return {
            border: '1px solid red'
        }
    }else{
        return null
    }
}

function ForgotPasswordComponent(props) {

    let loading =
        <div className="on-top">
            <Loading />
        </div>
    
    const ForgotPasswordForm = () => {
        return (
            <Formik
                initialValues={{
                    email: '',
                }}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .test('Check valid email', 'An account does not exist for this email',
                            function (value) {
                                if(value === undefined){
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
                                    <label htmlFor="email">Email<small className='warning'> *</small></label>
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

                            <button className="btn btn-lg btn-utcolor btn-block mt-2 font-weight-bold" type="submit"> Send Password Reset Email</button>

                        </form>
                    )
                }}

            </Formik>
        )
    }
    return (
        <div className="modal fade" id="forgot-password-modal" role="dialog">

            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">

                    <ModalHeader text="Forgot Password" />

                    <div className="modal-body">

                        {props.data.loading && loading}
                        <ForgotPasswordForm />
                    </div>
                </div>
            </div >
        </div >
    )
}

export default ForgotPasswordComponent