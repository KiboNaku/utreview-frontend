import React, { Component } from 'react'
import Admission from './admission/Admission'

class Popup extends Component {

    constructor(){

        super()

        this.state = {
            mode: "login"
        }
    }

    handleClick = () => {
        if(this.state.mode === "login"){
            this.setState({mode:"signup"})
        } else {
            this.setState({mode:"login"})
        }
    }

    render() {

        let signup = this.state.mode === "signup"

        return (

            <div className="border rounded col-9 col-sm-7 col-md-5 col-lg-4 col-xl-3 pt-5">
                
                <Admission mode={this.state.mode}/>
                
                <hr/>
                
                <div align="center">
                    <label className="center-text pt-3 d-inline-block">
                        <h6>
                            {signup? "Already have an account":"New to UT Flow"}?&nbsp; 
                            <a href="#" onClick={this.handleClick}>
                                {signup? "Log in": "Sign up"}
                            </a>
                        </h6>
                    </label>
                </div>
            </div>
        )
    }
}

export default Popup