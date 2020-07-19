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
            major: '',
            majorList: null,
            firstSubmit: true
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleMajorChange = this.handleMajorChange.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.state.firstSubmit) {
            this.setState({ firstSubmit: false })
            if (this.state.password != this.state.confirm_password) {
                alert("Password fields don't match")
                return
            }

            const newUser = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                major: this.state.major
            }

            this.setState({ loading: true })

            signup(newUser).then(res => {

                this.setState({ loading: false })

                if (res.error) {
                    alert(res.error)
                } else {
                    $("#signup-modal").modal("hide");
                    $("#verifyemail-modal").modal("show");
                }
            })
        }
    }

    handleMajorChange = (inputValue, { action }) => {
        if (inputValue !== null) {
            this.setState({ major: inputValue.value })
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
                    handleMajorChange={this.handleMajorChange} data={this.state} />
            </div>
        )
    }
}

export default withRouter(Signup)