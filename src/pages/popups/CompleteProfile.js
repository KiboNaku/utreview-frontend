import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { getMajor } from './_utils/UserFunctions'
import $ from './../../../node_modules/jquery'
import CompleteProfileComponent from './_components/CompleteProfileComponent'
import { updateMajor } from './_utils/CompleteProfileFunctions'

class CompleteProfile extends Component {

	constructor(props) {
		super(props)
		this.state = {
			majorList: null,
			majorListLoaded: false,
			majorPage: true
		}
		this.onMajorCompletion = this.onMajorCompletion.bind(this)
		this.onPasswordCompletion = this.onPasswordCompletion.bind(this)
		this.handleSkip = this.handleSkip.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}

	handleSkip() {
		if (this.state.majorPage) {
			this.setState({
				majorPage: false
			})
		} else {
			$("#complete-profile").modal("hide");
			$("#verifyemail-modal").modal("show");
		}
	}

	onMajorCompletion(values) {
		let major = values.major
		let otherMajor = values.otherMajor
		if (values.showOtherMajor) {
			major = null
		} else if (values.noMajor) {
			major = null
			otherMajor = null
		} else {
			otherMajor = null
		}

		const user = {
			first_name: this.props.data.firstName,
			last_name: this.props.data.lastName,
			email: this.props.data.email,
			major: major !== null ? values.major.value : null,
			other_major: otherMajor
		}

		updateMajor(user)
	}


	onPasswordCompletion(values) {
		axios
			.post('/api/reset_password', {
				email: this.props.data.email,
				password: values.password
			})
			.then(response => {
			})
	}

	handleClose() {
		this.setState({ majorPage: true })
		$("#complete-profile").modal("hide");
		$("#verifyemail-modal").modal("show");
	}

	componentDidMount() {
		getMajor().then(res => {

			if (res.error) {
				alert(res.error)
			} else {
				let data = res.majors
				let list = []
				for (const i in data) {
					list.push({
						value: data[i]['name'],
						label: data[i]['name']
					})
				}
				list = list.sort((a, b) => a.label.localeCompare(b.label))
				this.setState({ majorList: list, majorListLoaded: true })
			}
		})
		this.setState({ majorPage: true })
	}

	render() {
		return (
			<CompleteProfileComponent
				data={this.state}
				onMajorCompletion={this.onMajorCompletion}
				onPasswordCompletion={this.onPasswordCompletion}
				handleSkip={this.handleSkip}
				handleClose={this.handleClose}
			/>
		)
	}
}

export default withRouter(CompleteProfile)