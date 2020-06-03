import React, { Component } from 'react'
import HashLoader from "react-spinners/HashLoader";

class Loading extends Component {

    render() {

        return (
            <HashLoader size={100} color="#bf5700"/>
        )
    }
}

export default Loading