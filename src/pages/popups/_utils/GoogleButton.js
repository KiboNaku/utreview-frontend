import React from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'


const CLIENT_ID = '879307292662-75ogu33tfvgqedodsagga1jni88ueub4.apps.googleusercontent.com'

class GoogleButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {this.props.data.isLogined ?
                    <GoogleLogout
                        clientId={CLIENT_ID}
                        buttonText='Logout'
                        onLogoutSuccess={this.props.logoutGoogle}
                        onFailure={this.props.handleLogoutFailureGoogle}
                    /> : <GoogleLogin
                        clientId={CLIENT_ID}
                        buttonText={this.props.text}
                        onSuccess={this.props.loginGoogle}
                        onFailure={this.props.handleLoginFailureGoogle}
                    />
                }
            </div>
        )
    }
}


export default GoogleButton