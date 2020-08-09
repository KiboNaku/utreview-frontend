import React from 'react'

function GoogleButton(props) {
    return (
        // <button className="btn btn-lg btn-dark btn-block font-weight-bold" type="submit">
        //     <span className="fab fa-google px-3"></span>
        //     <span>{props.text}</span>
        // </button>
        
        <div className="g-signin2" data-theme="dark" data-width="250" data-height="50px" data-longtitle="true" data-onsuccess="onSignIn"></div>
    )
}

function onSignIn(user) {
    let profile = user.getBasicProfile()
    console.log(profile.getName())
}

export default GoogleButton