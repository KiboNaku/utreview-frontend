import React, { Component } from 'react'
import Login from './login/Login'

class Popup extends Component {

    render() {
        return (
            <div className="col-9 col-sm-7 col-md-6 col-lg-4">
                <Login/>
            </div>
        )
    }
}

export default Popup