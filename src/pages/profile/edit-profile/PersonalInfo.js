import React from 'react'
import * as Yup from 'yup'
import { Field, Formik, ErrorMessage, getIn } from 'formik'
import MajorSelect from './../../popups/_components/MajorSelect'

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
    }else{
        return null
    }
}

function PersonalInfo(props) {

    const PersonalInfoForm = () => {
        return (
            <Formik
                initialValues={{
                    firstName: props.data.firstName,
                    lastName: props.data.lastName,
                    major: props.data.major !== null && props.data.major !== "" ? {"value": props.data.major, "label": props.data.major}: '',
                    otherMajor: props.data.otherMajor !== null && props.data.otherMajor !== "" ? props.data.otherMajor : '',
                    showOtherMajor: props.data.otherMajor !== null && props.data.otherMajor !== "" ? true : false,
                    noMajor: props.data.otherMajor === null && props.data.major === null ? true : false
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
                })}
                onSubmit={(values, actions) => {
                    actions.setStatus({submitted: true})
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
                                    <label htmlFor="firstName">First Name<small className='text-danger'> *</small></label>
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

                            <div className="form-group my-3">
                                <MajorSelect
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

    return (
        <PersonalInfoForm />
    )
}

export default PersonalInfo