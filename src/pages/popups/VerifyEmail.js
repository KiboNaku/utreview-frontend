import React, { Component } from 'react'
import VerifyEmailComponent from './_components/VerifyEmailComponent'
import { signup, getMajor } from './_utils/UserFunctions'
import { withRouter } from 'react-router-dom'
import $ from './../../../node_modules/jquery'
import './popups.css'

class VerifyEmail extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            loading: false,
        }

        this.localStorageUpdated = this.localStorageUpdated.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {

        console.log("verify email component mounted")
        if (typeof window !== 'undefined') {
            if(typeof localStorage.email !== 'undefined') this.setState({email: localStorage.email})
            window.addEventListener('storage', this.localStorageUpdated)
        }
    }
    componentWillUnmount(){
        if (typeof window !== 'undefined') {
            window.removeEventListener('storage', this.localStorageUpdated)
        }
    }

    localStorageUpdated(){
        console.log("local storage updated")
        this.setState({email: localStorage.email})
    }

    onSubmit(e) {

        e.preventDefault()
        this.setState({loading: true})

        // signup(newUser).then(res => {
        //     this.setState({ loading: false })
        // })

    }

    render() {

        return (
            <VerifyEmailComponent onSubmit={this.onSubmit} data={this.state}/>
        )
    }
}

export default withRouter(VerifyEmail)