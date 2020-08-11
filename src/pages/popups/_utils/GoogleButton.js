import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import './GoogleButton.css'

const CLIENT_ID = '879307292662-75ogu33tfvgqedodsagga1jni88ueub4.apps.googleusercontent.com'


class GoogleButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="google-button-wrapper">
                <GoogleLogin
                    clientId={CLIENT_ID}
                    onSuccess={this.props.loginGoogle}
                    onFailure={this.props.handleLoginFailureGoogle}
                    className="google-button"
                    theme="dark"
                >
                <span className="google-button-text">Sign In with Google</span>
                </GoogleLogin>
            </div>
        )
    }
}


export default GoogleButton