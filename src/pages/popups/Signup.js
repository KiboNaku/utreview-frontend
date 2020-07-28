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
            majorList: null,
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(values) {
        console.log(values)
        let major = values.major.value
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
            major: major !== null ? major.value : null,
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