
import React from 'react'

function GoogleButton(props) {
    return (
        <button className="btn btn-lg btn-dark btn-block" type="submit">
            <span className="fab fa-google px-3"></span>
            <span>{props.text}</span>
        </button>
    )
}

export default GoogleButton