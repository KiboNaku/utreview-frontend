import React, { Component } from 'react'
import SignupComponent from './_components/SignupComponent'
import { signup, getMajor } from './_utils/UserFunctions'
import { withRouter } from 'react-router-dom'
import $ from './../../../node_modules/jquery'
import './popups.css'

class Signup extends Component {

    constructor() {
        super()
        this.state = {

            loading: false,
            verifyEmail: false,
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
            major: null,
            majorList: null,
            otherMajor: '',
            showOtherMajor: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleMajorChange = this.handleMajorChange.bind(this)
        this.handleShowOtherMajor = this.handleShowOtherMajor.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
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

    onSubmit(values) {
        console.log(values)
        let major = values.major
        let otherMajor = values.otherMajor
        if(values.showOtherMajor){
            major = null
        }else if(values.noMajor){
            major = null
            otherMajor = null
        }else{
            otherMajor = null
        }
        const newUser = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password: values.password,
            major: major,
            other_major: otherMajor
        }

        this.setState({ loading: true })

        signup(newUser).then(res => {

            this.setState({ loading: false })

            if (res.error) {
                // alert(res.error)
            } else {
                $("#signup-modal").modal("hide");
                $("#verifyemail-modal").modal("show");
            }
        })

    }

    handleMajorChange = (inputValue, { action }) => {
        if (inputValue !== null) {
            this.setState({ major: inputValue.value })
        }else{
            this.setState({major : null})
        }
    }

    componentDidMount() {
        getMajor().then(res => {

            if (res.error) {
                alert(res.error)
            } else {
                let data = res.majors
                let list = new Array()
                for (const i in data) {
                    list.push({
                        value: data[i]['name'],
                        label: data[i]['name']
                    })
                }
                this.setState({ majorList: list })
            }
        })
    }

    render() {

        return (
            <div>
                <SignupComponent onSubmit={this.onSubmit} onChange={this.onChange}
                    handleMajorChange={this.handleMajorChange} handleShowOtherMajor={this.handleShowOtherMajor} 
                    data={this.state} />
            </div>
        )
    }
}

export default withRouter(Signup)