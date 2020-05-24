import React, { Component } from 'react'
import Login from './login/Login'

class Popup extends Component {

    render() {
        return (

            <div className="border rounded col-9 col-sm-7 col-md-5 col-lg-4 col-xl-3 pt-5">
                <Login/>
            </div>
        )
    }
}

export default Popup