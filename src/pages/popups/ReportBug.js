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
				{ value: 'About', label: 'About' },
				{ value: 'AddReview', label: 'Add Review' },
				{ value: 'ContactUs', label: 'Contact Us' },
				{ value: 'Course', label: 'Course' },
				{ value: 'GradeDistribution', label: 'Grade Distribution' },
				{ value: 'Home', label: 'Home' },
				{ value: 'Login', label: 'Login' },
				{ value: 'PrivacyPolicy', label: 'Privacy Policy' },
				{ value: 'Professor', label: 'Professor' },
				{ value: 'Profile', label: 'Profile' },
				{ value: 'Search Results', label: 'Search Results' },
				{ value: 'SignUp', label: 'Sign Up' },
				{ value: 'Other', label: 'Other' }
			],
			bugTypes: {
				About:
					[
						{ value: 'Broken Links', label: 'Broken Links' },
						{ value: 'Incorrect Information', label: 'Incorrect Information' },
						{ value: 'Other', label: 'Other' }
					],
				AddReview:
					[
						{ value: 'Fail to Add Review', label: 'Fail to Add Review' },
						{ value: 'Incorrect Information', label: 'Incorrect Information' },
						{ value: 'Incorrect Validation', label: 'Incorrect Validation' },
						{ value: 'Missing Information', label: 'Missing Information' },
						{ value: 'Other', label: 'Other' }
					],
				ContactUs:
					[
						{ value: 'Fail to Submit Feedback', label: 'Fail to Submit Feedback' },
						{ value: 'Other', label: 'Other' }
					],
				Course:
					[
						{ value: 'Broken Links', label: 'Broken Links' },
						{ value: 'Fail to Report Comments', label: 'Fail to Report Comments' },
						{ value: 'Incorrect Information', label: 'Incorrect Information' },
						{ value: 'Missing Information', label: 'Missing Information' },
						{ value: 'Other', label: 'Other' }
					],
				GradeDistribution:
					[
						{ value: 'Incorrect Information', label: 'Incorrect Information' },
						{ value: 'Other', label: 'Other' }
					],
				Home:
					[
						{ value: 'Broken Links', label: 'Broken Links' },
						{ value: 'Other', label: 'Other' }
					],
				Login:
					[
						{ value: 'Fail to Login', label: 'Fail to Login' },
						{ value: 'Fail to Reset Password', label: 'Fail to Reset Password' },
						{ value: 'Other', label: 'Other' }
					],
				PrivacyPolicy:
					[
						{ value: 'Incorrect Information', label: 'Incorrect Information' },
						{ value: 'Other', label: 'Other' }
					],
				Professor:
					[
						{ value: 'Broken Links', label: 'Broken Links' },
						{ value: 'Fail to Report Comments', label: 'Fail to Report Comments' },
						{ value: 'Incorrect Information', label: 'Incorrect Information' },
						{ value: 'Missing Information', label: 'Missing Information' },
						{ value: 'Other', label: 'Other' }
					],
				Profile:
					[						
						{ value: 'Broken Links', label: 'Broken Links' },
						{ value: 'Fail to Change Information', label: 'Fail to Change Information' },
						{ value: 'Fail to Reset Password', label: 'Fail to Reset Password' },
						{ value: 'Incorrect Information', label: 'Incorrect Information' },
						{ value: 'Other', label: 'Other' }
					],
				SearchResults:
					[
						{ value: 'Broken Links', label: 'Broken Links' },
						{ value: 'Fail to Filter Results', label: 'Fail to Filter Results' }, 
						{ value: 'Fail to Sort Results', label: 'Fail to Sort Results'},
						{ value: 'Incorrect Information', label: 'Incorrect Information'},
						{ value: 'Missing Results', label: 'Missing Results' },
						{ value: 'Other', label: 'Other' }
					],
				SignUp:
					[
						{ value: 'Broken Links', label: 'Broken Links'},
						{ value: 'Fail to Sign Up', label: 'Fail to Sign Up' },
						{ value: 'Fail to Verify', label: 'Fail to Verify' },
						{ value: 'Other', label: 'Other' }
					],
				Other:
					[
						{ value: 'Browser Incompatability', label: 'Browser Incompatability' },
						{ value: 'Non-Responsive Page', label: 'Non-Responsive Page' },
						{ value: 'Slow Website', label: 'Slow Website' },
						{ value: 'Other', label: 'Other' }
					],
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
			$('#toast-report-bug').toast("show")
			const bug = {
				page: this.state.page.replace(/([A-Z])/g, ' $1').trim(),
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
			</div>
		)
	}
}

export default withRouter(ReportBug)