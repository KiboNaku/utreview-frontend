import React, { Component } from 'react'
import Select from 'react-select'
import ModalHeader from './../../popups/_utils/ModalHeader'
import UTEmail from './../../popups/_utils/UTEmail'

class Settings extends Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName: '',
			lastName: '',
			password: '',
			confirmPassord: '',
			major: '',
			email: ''
		}

		console.log('constructor', this.state)
		console.log(props)

		this.onChange = this.onChange.bind(this)
		this.handleMajorChange = this.handleMajorChange.bind(this)
		this.setValues = this.setValues.bind(this)
	}

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleMajorChange = (inputValue, { action }) => {
		if (inputValue !== null) {
			this.setState({ major: inputValue.value })
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

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.firstName !== prevProps.firstName) {
		  this.fetchData(this.props.userID);
		}
	  }

	render() {
		// this.setValues()
		console.log('render', this.props)
		return (
			<div className="modal fade" id={'settings'} role="dialog">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<ModalHeader text="Settings" />
						<div className="modal-body">
							<form>
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
												autoFocus />
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
												autoFocus />
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
												defaultValue={{ label: this.state.major, value: this.state.major }}
											/>
										</div>
									</div>
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
												name="confirm_password"
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
									onClick={() => this.props.onSubmit('apply', this.state.firstName, this.state.lastName, this.state.password, this.state.confirmPassword, this.state.major)}>
									Apply </button>
								<button
									type='button'
									className='btn btn-outline-dark font-weight-bold'
									onClick={() => this.props.onSubmit('cancel')}>
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