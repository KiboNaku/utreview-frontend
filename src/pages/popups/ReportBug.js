import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import $ from './../../../node_modules/jquery'
import './popups.css'
import ReportBugComponent from './_components/ReportBugComponent'
import { sendMessage } from '../contact-us/_util/ContactUsFunctions'

class ReportBug extends Component {

	constructor() {
		super()

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			page: '',
			bugType: '',
			description: '',
			pages: [
				{ value: 'Home', label: 'Home' },
				{ value: 'SignUp', label: 'Sign Up' }
			],
			bugTypes: {

				Home:
					[
						{ value: 'Broken Links', label: 'Broken Links' }
					],

				SignUp:
					[
						{ value: 'Unable to Sign Up', label: 'Unable to Sign Up' }
					]
			}

		}

		this.handleSubmit = this.handleSubmit.bind()
		this.handlePageChange = this.handlePageChange.bind()
		this.handleBugTypeChange = this.handleBugTypeChange.bind()
		this.handleChange = this.handleChange.bind()
	}

	handleChange(e) {
		const { name, value } = e.target
		console.log(name, value)
		// this.setState({ [name]: value })
	}

	handlePageChange = (inputValue, { action }) => {
		if (inputValue == null) {
			this.setState({ page: '' })
		} else {
			this.setState({ page: inputValue.value })
		}
	}

	handleBugTypeChange = (inputValue, { action }) => {
		this.setState({ bugType: inputValue.value })
	}

	handleSubmit() {
		// let response = sendMessage(values)
		// if (response !== null) {
		$('#bug-report-received').toast('show')
		// }
	}

	render() {
		return (
			<div>
				<ReportBugComponent
					data={this.state}
					handleChange={this.handleChange}
					handlePageChange={this.handlePageChange}
					handleBugTypeChange={this.handleBugTypeChange}
					handleSubmit={this.handleSubmit}
				/>
				{/* <div id='bug-report-received' className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
					<div className="toast-body feedback-notif">
						<button type="button" className="close feedback-notif-close" data-dismiss="toast" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<div className='feedback-notif-text'>
							Thank you. We will handle the bug soon.
					</div>
					</div>
				</div> */}
			</div>
		)
	}
}

export default withRouter(ReportBug)