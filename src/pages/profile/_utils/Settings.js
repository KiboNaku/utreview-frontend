import React, { Component } from 'react'
import Select from 'react-select'
import ModalHeader from './../../popups/_utils/ModalHeader'
import UTEmail from './../../popups/_utils/UTEmail'

class Settings extends Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName: props.data.first_name,
			lastName: props.data.last_name,
			password: '',
			confirmPassord: '',
			email: props.data.email
		}

		console.log(props.data)
		console.log('constructor', this.state)
		this.onChange = this.onChange.bind(this)
	}

	onChange(event) {
		this.setState({ [event.target.name]: [event.target.value] })
		console.log(this.state.firstName)
	}

	render() {

		let prevFirstName = this.props.data.first_name
		let prevLastName = this.props.data.last_name
		console.log(this.state)

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
												onChange={this.props.handleMajorChange}
												placeholder="Select major..."
												isClearable={true}
												isSearchable={true}
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
												value={this.state.confirm_password}
												onChange={this.onChange}
												placeholder="confirm password"
											/>
										</div>
									</div>
								</div>
								<div className="form-group row">
									{/* <label for='major' className='col-sm-4 col-form-label'>Major: </label>
									<div className='col-sm-8'>
										<Select
											id='major'
											className="basic-single"
											classNamePrefix="select"
											name="major"
											options={this.props.data.majorList}
											onChange={this.props.handleMajorChange}
											placeholder="Select major..."
											isClearable={true}
											isSearchable={true}
										/>
									</div> */}
								</div>
							</form>
							<div className='modal-footer d-block' align='center'>
								<button
									type='button'
									className='btn btn-outline-dark font-weight-bold'
									onClick={() => this.props.onSubmit(this.state.firstName, this.state.lastName, this.state.password, this.state.major)}>
									Apply </button>
								<button
									type='button'
									className='btn btn-outline-dark font-weight-bold'
									onClick={() => this.props.onSubmit(prevFirstName, prevLastName)}>
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