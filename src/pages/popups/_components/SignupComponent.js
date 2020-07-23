import React from 'react'
import Select from 'react-select'
import GoogleButton from "./../_utils/GoogleButton"
import ModalHeader from './../_utils/ModalHeader'
import UTEmail from './../_utils/UTEmail'
import Loading from './../../_utils/Loading'

function SignupComponent(props) {

    let loading =
        <div className="on-top">
            <Loading />
        </div>

    let otherMajor = (
            <div className='col-sm-8'>
                <input
                    id="otherMajor"
                    type="text"
                    name="otherMajor"
                    className="form-control"
                    placeholder="other major"
                    value={props.data.otherMajor}
                    onChange={props.onChange}
                />
            </div>
    )

    return (
        <div className="modal fade absolute" id="signup-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">

                    <ModalHeader text="Sign Up" />

                    <div className="modal-body">

                        {props.data.loading && loading}

                        <form className="form-signin mt-3" onSubmit={props.onSubmit}>

                            <div className="form-group my-3">
                                <input
                                    type="text"
                                    name="first_name"
                                    className="form-control d-inline col-6"
                                    placeholder="first name"
                                    value={props.data.first_name}
                                    onChange={props.onChange}
                                    required autoFocus />

                                <input
                                    type="text"
                                    name="last_name"
                                    className="form-control d-inline col-6"
                                    placeholder="last name"
                                    value={props.data.last_name}
                                    onChange={props.onChange}
                                    required autoFocus />
                            </div>

                            <div className="my-3">
                                <UTEmail email={props.data.email} onChange={props.onChange} />
                            </div>

                            <div className="form-group my-3">
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    name="major"
                                    options={props.data.majorList}
                                    onChange={props.handleMajorChange}
                                    placeholder="select field of study"
                                    isClearable={true}
                                    isSearchable={true}
                                />
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-4">
                                    <input
                                        role="button"
                                        id='showOtherMajor'
                                        type="checkbox"
                                        name="showOtherMajor"
                                        checked={props.data.showOtherMajor}
                                        onChange={props.handleShowOtherMajor} />
                                    <label for="showOtherMajor" className="other-major-label" > Other major</label>
                                </div>
                                {props.data.showOtherMajor ? otherMajor : null}
                            </div>
                            

                            <div className="form-group my-3">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={props.data.password}
                                    onChange={props.onChange}
                                    placeholder="password"
                                    required />
                            </div>

                            <div className={"form-group my-3"}>
                                <input
                                    type="password"
                                    name="confirm_password"
                                    className="form-control"
                                    value={props.data.confirm_password}
                                    onChange={props.onChange}
                                    placeholder="confirm password"
                                    required />
                            </div>

                            <button className="btn btn-lg btn-utcolor btn-block mt-2 font-weight-bold" type="submit"> Sign up </button>

                        </form>

                        <div className="text-center my-3">
                            <h5><strong>OR</strong></h5>
                        </div>

                        <form className="mb-3">
                            <GoogleButton text="Sign Up with Google" />
                        </form>
                    </div>

                    <div className="modal-footer d-block" align="center">
                        <label className="center-text pt-3 d-inline-block">
                            <h6>
                                Already have an account?&nbsp;
                                    <span type="button" data-toggle="modal" data-target="#signup-modal">
                                    <a data-dismiss="modal" data-toggle="modal" data-target="#login-modal" className="utcolor">Log In</a>
                                </span>
                            </h6>
                        </label>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default SignupComponent