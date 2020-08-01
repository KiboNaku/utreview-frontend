import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import $ from './../../../node_modules/jquery'
import './popups.css'
import ReportBugComponent from './_components/ReportBugComponent'
import { sendMessage } from '../contact-us/_util/ContactUsFunctions'

class ReportBug extends Component {

	constructor() {
		super()

		this.handleSubmit = this.handleSubmit.bind()
	}

	handleSubmit = (values, { setSubmitting, resetForm }) => {
		setTimeout(() => {
			let response = sendMessage(values)
			if (response !== null) {
				$('#feedback-received').toast('show')
			}
			setSubmitting(false)
			resetForm()
		}, 400);
	}

	render() {
		return (
			<div>
				<ReportBugComponent
					handleSubmit={this.handleSubmit}
				/>
				<div id='feedback-received' className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
					<div className="toast-body feedback-notif">
						<button type="button" className="close feedback-notif-close" data-dismiss="toast" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<div className='feedback-notif-text'>
							Thank you. We will handle the bug soon.
					</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(ReportBug)