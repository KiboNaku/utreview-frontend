import React from 'react'
import Select from 'react-select'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik, Field, Formik, Form, ErrorMessage, getIn, setNestedObjectValues } from 'formik'
import MajorSelect from './../../popups/_components/MajorSelect'
import Loading from './../../_utils/Loading'
import { contains } from 'jquery'

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

function ReviewInfo(props) {

    const ReviewInfoForm = () => {
        return (
            <Formik
                initialValues={{
                    courseApproval: null,
                    courseDifficulty: null,
                    courseUsefulness: null,
                    courseWorkload: null,
                    courseComments: '',
                    profApproval: null,
                    profClear: null,
                    profEngaging: null,
                    profGrading: null,
                    profComments: ''
                }}
                validationSchema={Yup.object({
                    courseApproval: Yup.boolean()
                        .required('Required')
                        .nullable(),
                    courseDifficulty: Yup.number()
                        .required('Required')
                        .nullable(),
                    courseWorkload: Yup.number()
                        .required('Required')
                        .nullable(),
                    courseComments: Yup.number()
                        .required('Required')
                        .nullable(),
                    profClear: Yup.number()
                        .required('Required')
                        .nullable(),
                    profEngaging: Yup.number()
                        .required('Required')
                        .nullable(),
                    profGrading: Yup.number()
                        .required('Required')
                        .nullable(),
                })}
                onSubmit={(values, actions) => {
                    actions.setStatus({ submitted: true })
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

                    let success = (
                        <div className="text-success">
                            Your changes have been saved
                        </div>
                    )

                    return (
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group my-3">
                                <div className="form-group my-3">
                                    <label htmlFor="firstName">First Name</label>
                                    <Field
                                        name="firstName"
                                        type="text"
                                        className="form-control"
                                        placeholder="John"
                                        style={invalidInputStyle(formik.errors, formik.touched, 'firstName')}
                                    />
                                    <ErrorMessage component="div" className="text-danger" name="firstName" />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="lastName">Last Name</label>
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

                            <div className="form-group my-3">
                                <MajorSelect
                                    required={true}
                                    value={formik.values.major}
                                    options={props.data.majorList}
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
                                        id='showOtherMajor'
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
                                {formik.dirty ? null : success}
                                <button
                                    type='submit'
                                    className='btn btn-outline-dark font-weight-bold'
                                >
                                    Apply </button>
                                <button
                                    type='button'
                                    className='btn btn-outline-dark font-weight-bold'
                                    onClick={formik.handleReset}
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
        <ReviewInfoForm />
    )
}

export default ReviewInfo