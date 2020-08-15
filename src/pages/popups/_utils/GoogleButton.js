import React from 'react'
import { GoogleLogin } from 'react-google-login'
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
                    render={renderProps => (
                        <button className='btn btn-lg btn-dark btn-block mt-2 font-weight-bold'
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}>{this.props.text}
                        </button>
                    )}
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