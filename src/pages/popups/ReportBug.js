import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import $ from './../../../node_modules/jquery'
import './popups.css'
import ReportBugComponent from './_components/ReportBugComponent'
import { sendMessage } from '../contact-us/_util/ContactUsFunctions'
import { sendBug } from './_utils/ReportBugFunctions'

class ReportBug extends Component {

	constructor() {
		super()

		this.state = {
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
			},
			error: {
				pageError: '',
				bugTypeError: '',
				descriptionError: ''
			}
		}

		this.validate = this.validate.bind()
		this.handleSubmit = this.handleSubmit.bind()
		this.handlePageChange = this.handlePageChange.bind()
		this.handleBugTypeChange = this.handleBugTypeChange.bind()
		this.handleChange = this.handleChange.bind()
	}

	validate = () => {
		let pageError = ""
		let bugTypeError = ""
		let descriptionError = ""

		let emptyErrorMessage = 'Required'

		if (this.state.page === '' || this.state.page === null) { pageError = emptyErrorMessage }
		if (this.state.bugType === '' || this.state.bugType === null) { bugTypeError = emptyErrorMessage }
		if (this.state.description === '') { descriptionError = emptyErrorMessage }

		if (pageError || bugTypeError || descriptionError) {
			this.setState({
				error: {
					pageError: pageError,
					bugTypeError: bugTypeError,
					descriptionError: descriptionError
				}
			})
			return false;
		} else {
			return true;
		}
	}

	handleChange = (event) => {
		const { name, value } = event.target
		this.setState({ [name]: value })
	}

	handlePageChange = (inputValue, { action }) => {
		if (inputValue == null) {
			this.setState({ page: '' })
		} else {
			this.setState({ page: inputValue.value })
		}
	}

	handleBugTypeChange = (inputValue, { action }) => {
		if (inputValue == null) {
			this.setState({ bugType: '' })
		} else {
			this.setState({ bugType: inputValue.value })
		}
	}

	handleSubmit = (event) => {
		event.preventDefault()
		const isValid = this.validate()
		if (isValid) {
			$('#report-bug').modal("hide");
			const bug = {
				page: this.state.page,
				bug_type: this.state.bugType,
				description: this.state.description
			}
			sendBug(bug)
			this.setState({
				page: '',
				bugType: '',
				description: '',
				error: {
					pageError: '',
					bugTypeError: '',
					descriptionError: ''
				}
			})
		}
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