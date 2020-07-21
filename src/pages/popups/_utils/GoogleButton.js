
import React from 'react'

function GoogleButton(props) {
    return (
        // <button className="btn btn-lg btn-dark btn-block font-weight-bold" type="submit">
        //     <span className="fab fa-google px-3"></span>
        //     <span>{props.text}</span>
        // </button>
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
    )
}

export default GoogleButton