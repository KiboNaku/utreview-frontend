import React, { Component } from 'react'
import HashLoader from "react-spinners/HashLoader";

class Loading extends Component {

    render() {

        return (
            <div className="row d-flex justify-content-center">
                <div className="d-inline-block mx-5 my-5 px-5 py-5">
                    <HashLoader size={100} color="#bf5700" />
                </div>
            </div>
        )
    }
}

export default Loading