import React from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik, Field, Formik, Form, ErrorMessage, getIn } from 'formik'
import ModalHeader from "./../popups/_utils/ModalHeader"
import './../../utcolors.css'
import Loading from './../_utils/Loading'
import './ReportComment.css'

function invalidInputStyle(errors, touched, fieldName) {
    if (getIn(errors, fieldName) && getIn(touched, fieldName)) {
        return {
            border: '1px solid red'
        }
    } else {
        return null
    }
}

function ReportCommentComponent(props) {

    const ReportCommentForm = () => {
        return (
            <Formik
                initialValues={{
                    selected: [],
                    otherSelected: false,
                    other: ""
                }}
                validationSchema={Yup.object({
                    selected: Yup.array()
                    .when('otherSelected', {
                        is: (otherSelected) => !otherSelected,
                        then: Yup.array()
                            .required('Please select at least one option')
                    }),
                    otherSelected: Yup.boolean(),
                    other: Yup.string()
                        .when('otherSelected', {
                            is: (otherSelected) => otherSelected,
                            then: Yup.string()
                                .required('Required')
                        })
                })}
                onSubmit={(values, { validate }) => {
                    props.onSubmit(values)
                }}
            >
                {formik => {

                    console.log(formik)

                    return (
                        <form onSubmit={formik.handleSubmit}>

                            <div role="group" aria-labelledby="checkbox-group">
                                <div className="report-checkbox">
                                    <Field className="report-type" type="checkbox" role="button" name="selected" value="Harrassment" />
                                    <label className="report-type">
                                        <span className="report-type-header">Harassment: </span>
                                        <span>
                                            Disparaging or adversial towards a person or group
                                        </span>
                                    </label>
                                </div>
                                <div className="report-checkbox">
                                    <Field className="report-type" type="checkbox" role="button" name="selected" value="Spam" />
                                    <label className="report-type" >
                                        <span className="report-type-header">Spam: </span>
                                        <span>
                                            Undisclosed promotion for a link or product
                                        </span>
                                    </label>
                                </div>
                                <div className="report-checkbox">
                                    <Field className="report-type" type="checkbox" role="button" name="selected" value="Unrelated Content" />
                                    <label className="report-type">
                                        <span className="report-type-header">Unrelated Content: </span>
                                        <span>
                                            Off topic or unrelated to the course/professor being discussed
                                        </span>
                                    </label>
                                </div>
                                <div className="report-checkbox">
                                    <Field className="report-type" type="checkbox" role="button" name="selected" value="Adult Content" />
                                    <label className="report-type" >
                                        <span className="report-type-header">Adult Content: </span>
                                        <span>
                                            Sexually explicit, violent, or otherwise inappropriate
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="report-checkbox report-other">
                                <Field className="report-type" type="checkbox" role="button" name="otherSelected" />
                                <label className="report-type report-other" >
                                    <span className="report-type-header">Other: </span>
                                    <div className="report-other-field">
                                        <Field disabled={!formik.values.otherSelected} className="form-control" type="text" name="other" />
                                        <ErrorMessage component="div" className="text-danger" name="other" />
                                    </div>

                                </label>
                            </div>

                            <ErrorMessage component="div" className="text-danger" name="selected" />
                            <div className='modal-footer d-block' align='center'>
                                <button
                                    type='submit'
                                    className='btn btn-outline-dark font-weight-bold'
                                >
                                    Submit </button>
                                <button
                                    type='button'
                                    className='btn btn-outline-dark font-weight-bold'
                                    data-dismiss="modal"
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
        <div className="modal fade" id={`report-comment-modal-${props.reviewId}`} role="dialog">

            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">

                    <ModalHeader text="Report Comment" />

                    <div className="modal-body">

                        {props.data.loading && loading}

                        <ReportCommentForm />
                    </div>
                </div>
            </div >
            <div id='report-comment' className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
				<div className="toast-body feedback-notif">
					<button type="button" className="close feedback-notif-close" data-dismiss="toast" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<div className='feedback-notif-text'>
						Thank you for submitting a report. We will look into it as soon as possible.
					</div>
				</div>
			</div>
        </div >
    )
}

export default ReportCommentComponent