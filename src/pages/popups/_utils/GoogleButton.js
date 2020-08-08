import React from 'react'

const GOOGLE_BUTTON_ID = "google-sign-in-button";

class GoogleButton extends React.Component {
    componentDidMount() {
        window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
            width: 400,
            height: 50,
            onsuccess: this.onSuccess
        });
    }

    onSuccess(googleUser) {
        const profile = googleUser.getBasicProfile()
        console.log("Name: " + profile.getName())
    }

    render() {
        return <div id={GOOGLE_BUTTON_ID} />
    }
}

export default GoogleButton