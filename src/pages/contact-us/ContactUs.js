import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { withRouter } from 'react-router-dom'
import $ from './../../../node_modules/jquery'
import ContactUsComponent from './_components/ContactUsComponent'
import './ContactUs.css'
import { sendMessage } from './_util/ContactUsFunctions'

class ContactUs extends Component {
	constructor() {
		super()
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			message: ''
		}
		this.handleSubmit = this.handleSubmit.bind()
	}

	componentDidMount() {

		document.title = "Contact Us - UT Review"

		const token = localStorage.usertoken
		if (token !== undefined) {
			const decoded = jwt_decode(token)
			this.setState({
				firstName: decoded.identity.first_name,
				lastName: decoded.identity.last_name,
				email: decoded.identity.email,
			})
		}
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
			<ContactUsComponent
				data={this.state}
				handleSubmit={this.handleSubmit}
			/>
		)
	}
}

export default withRouter(ContactUs);