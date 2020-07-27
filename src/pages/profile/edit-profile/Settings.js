import React, { Component } from 'react'
import Select from 'react-select'
import ModalHeader from '../../popups/_utils/ModalHeader'
import $ from 'jquery'
import UTEmail from '../../popups/_utils/UTEmail'

class Settings extends Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName: props.data.firstName,
			lastName: props.data.lastName,
			password: '',
			confirmPassword: '',
			major: props.data.major,
			otherMajor: props.data.otherMajor !== null && props.data.otherMajor !== "" ? props.data.otherMajor : '',
			email: '',
			showOtherMajor: props.data.otherMajor !== null && props.data.otherMajor !== "" ? true : false
		}

		console.log('constructor', this.state)
		console.log(props)

		this.onChange = this.onChange.bind(this)
		this.handleMajorChange = this.handleMajorChange.bind(this)
		this.setValues = this.setValues.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleShowOtherMajor = this.handleShowOtherMajor.bind(this)
	}

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleMajorChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			this.setState({ major: inputValue.value })
		} else {
			this.setState({ major: null })
		}
	}

	handleShowOtherMajor(e) {
		if (e.target.checked) {
			this.setState({
				showOtherMajor: true,
				major: null
			})
		} else {
			this.setState({
				showOtherMajor: false,
				otherMajor: ''
			})
		}
	}

	setValues() {
		if (this.props.firstName !== this.state.firstName) {
			this.setState({
				firstName: this.props.data.firstName,
				lastName: this.props.data.lastName,
				major: this.props.data.major,
				email: this.props.data.email
			})
		}
	}

	handleCancel() {
		console.log(this.props)
		this.setState({
			firstName: this.props.data.firstName,
			lastName: this.props.data.lastName,
			password: '',
			confirmPassword: '',
			major: this.props.data.major,
			email: '',
			showOtherMajor: this.props.data.otherMajor !== null ? true : false,
			otherMajor: this.props.data.otherMajor !== null ? this.props.data.otherMajor : ''
		})
		$('#settings').modal('hide')
	}

	handleSubmit() {
		let showOtherMajor = this.state.showOtherMajor
		let otherMajor = this.state.otherMajor
		let major = this.state.major
		if (this.state.showOtherMajor) {
			if (this.state.otherMajor == null || this.state.otherMajor === "") {
				showOtherMajor = false
				otherMajor = null
				major = null
			}
		} else {
			if (this.state.major == null || this.state.major === "") {
				showOtherMajor = false
				otherMajor = null
				major = null
			}
		}
		this.setState(prevState => ({
			firstName: prevState.firstName !== null && prevState.firstName !== "" ? prevState.firstName : this.props.data.firstName,
			lastName: prevState.lastName !== null && prevState.lastName !== "" ? prevState.lastName : this.props.data.lastName,
			password: '',
			confirmPassword: '',
			major: major,
			otherMajor: otherMajor,
			showOtherMajor: showOtherMajor
		}))
		this.props.onSubmit('apply', this.state.firstName, this.state.lastName, this.state.password, this.state.confirmPassword, major, otherMajor)
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.firstName !== prevProps.firstName) {
			this.fetchData(this.props.userID);
		}
	}

	render() {
		// this.setValues()

		let otherMajor = (
			<div className="form-group row">
				<label for='otherMajor' className='col-sm-4 col-form-label'> Other Major: </label>
				<div className='col-sm-8'>
					<input
						id="otherMajor"
						type="text"
						name="otherMajor"
						className="form-control"
						placeholder="other major"
						value={this.state.otherMajor}
						onChange={this.onChange}
					/>
				</div>
			</div>
		)

		let otherMajorText = this.state.showOtherMajor ? "Select from pre-existing majors" : "Don't see your major?"
		console.log('render', this.props)
		return (
			<div className="modal fade" id={'settings'} role="dialog">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Settings</h5>
							<button onClick={() => this.handleCancel()} type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form className="form-signin mt-3">
								<div>
									<h4>Personal Information: </h4>
									<div className="form-group row">
										<label for='firstName' className='col-sm-4 col-form-label'> First Name: </label>
										<div className='col-sm-8'>
											<input
												id="firstName"
												type="text"
												name="firstName"
												className="form-control"
												placeholder="first name"
												value={this.state.firstName}
												onChange={this.onChange}
												autoFocus 
												required
												/>
										</div>
									</div>
									<div className='form-group row'>
										<label for='lastName' className='col-sm-4 col-form-label'> Last Name:</label>
										<div className='col-sm-8'>
											<input
												id='lastName'
												type="text"
												name="lastName"
												className="form-control"
												placeholder="last name"
												value={this.state.lastName}
												onChange={this.onChange}
												autoFocus 
												required
												/>
										</div>
									</div>
									<div className="form-group row">
										<label for='major' className='col-sm-4 col-form-label'>Major: </label>
										<div className='col-sm-8'>
											<Select
												id='major'
												className="basic-single"
												classNamePrefix="select"
												name="major"
												options={this.props.data.majorList}
												onChange={this.handleMajorChange}
												placeholder="Select major..."
												isClearable={true}
												isSearchable={true}
												isDisabled={this.state.showOtherMajor}
												value={this.state.major !== null ?
													this.props.data.majorList.filter(major => major.value === this.state.major) : null}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label className='col-sm-4 col-form-label'></label>
										<div className="col-sm-4">
											<input
												role="button"
												id='showOtherMajor'
												type="checkbox"
												name="showOtherMajor"
												checked={this.state.showOtherMajor}
												onChange={this.handleShowOtherMajor} />
											<label for="showOtherMajor" className="other-major-label" > Other major</label>
										</div>
									</div>
									{this.state.showOtherMajor ? otherMajor : null}

								</div>
								<div>
									<h4>Password: </h4>
									<div className="form-group row">
										<label for='password' className='col-sm-4 col-form-label'>New Password: </label>
										<div className='col-sm-8'>
											<input
												id='password'
												type="password"
												name="password"
												className="form-control"
												value={this.state.password}
												onChange={this.onChange}
												placeholder="password"
											/>
										</div>
									</div>
									<div className='form-group row'>
										<label for='confirmPassword' className='col-sm-4 col-form-label'>Confirm Password: </label>
										<div className="col-sm-8">
											<input
												id='confirmPassword'
												type="password"
												name="confirmPassword"
												className="form-control"
												value={this.state.confirmPassword}
												onChange={this.onChange}
												placeholder="confirm password"
											/>
										</div>
									</div>
								</div>
							</form>
							<div className='modal-footer d-block' align='center'>
								<button
									type='button'
									className='btn btn-outline-dark font-weight-bold'
									onClick={() => this.handleSubmit()}
									>
									Apply </button>
								<button
									type='button'
									className='btn btn-outline-dark font-weight-bold'
									onClick={() => this.handleCancel()}>
									Cancel </button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Settings