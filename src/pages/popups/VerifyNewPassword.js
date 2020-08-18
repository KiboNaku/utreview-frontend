import React, { Component } from 'react'
import VerifyNewPasswordComponent from './_components/VerifyNewPasswordComponent'
import { sendConfirmEmail, sendCreatePassword } from './_utils/UserFunctions'
import { withRouter } from 'react-router-dom'
import './popups.css'

class VerifyNewPassword extends Component {

    constructor() {
        super()
        this.state = {
            loading: 0,
        }
        this.timeout = this.timeout.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillUnmount() {
        if (this.state.loading > 0) clearTimeout(this.id)
    }

    timeout(){
        this.id = setTimeout(() => {

            if(this.state.loading > 0){
                this.setState(prevState => ({ loading: prevState.loading-1 }))
                this.timeout()
            }
        }, 1000)
    }

    onSubmit(e) {

        e.preventDefault()
        this.setState({ loading: 5 })

        this.timeout()

        sendCreatePassword()
    }

    render() {

        return (
            <VerifyNewPasswordComponent onSubmit={this.onSubmit} data={this.state} />
        )
    }
}

export default withRouter(VerifyNewPassword)