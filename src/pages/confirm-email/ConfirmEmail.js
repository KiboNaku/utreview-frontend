import React, { Component } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import Loading from './../_utils/Loading'   
import axios from 'axios'
import qs from 'qs'

class ConfirmEmail extends Component {

    constructor() {

        super()
        this.state = {
            redirect: false,
            success: 0,
            error: null,
        }
    }

    componentDidMount() {

        axios
            .post('/api/confirm_email', {
                token: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).token
            })
            .then(response => {
                this.setState({ success: response.data.success, error: response.data.error })
                this.id = setTimeout(() => this.setState({ redirect: true }), 5000)
            })
    }

    componentWillUnmount() {
        if (this.state.success != 0) clearTimeout(this.id)
    }

    render() {

        let message = "Attempting to confirm email"

        if (this.state.success < 0) {
            message = "An error has occured: " + this.state.error
        } else if (this.state.success > 0) {
            message = "The email has been confirmed."
        }

        let loading = <Loading />

        let redirect =
            <div>
                <Redirect to="/" />
            </div>

        return (
            <main className="bg-grey">
                <div className="main-sub container py-5">
                    <div className="container justify-content-center px-5 py-5 col-12 col-sm-11 col-md-9 col-lg-7 bg-light">
                        <h3 className='py-5 text-center'>
                            {message}

                            <h3>You will be automatically redirected soon. Otherwise, please <Link className="utcolor" to="/">click here</Link>.</h3>
                            {this.state.redirect ? redirect : this.state.success == 0 && loading}
                        </h3>
                    </div>
                </div>
            </main>
        )
    }
}

export default withRouter(ConfirmEmail)