import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { withRouter } from 'react-router-dom'
import ContactUsComponent from './_components/ContactUsComponent'
import './ContactUs.css'

class ContactUs extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
			email: '',
			message: ''
		}
	}

	componentDidMount() {
		const token = localStorage.usertoken
		if (token !== undefined) {
			const decoded = jwt_decode(token)
			this.setState({
				name: decoded.identity.first_name + ' ' + decoded.identity.last_name,
				email: decoded.identity.email,
			})
		}
	}

	render() {
		return (
			<ContactUsComponent
				data={this.state}
			/>
		)
	}
}

export default withRouter(ContactUs);