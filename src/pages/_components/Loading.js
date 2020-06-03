import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom';

class Loading extends Component {

    render() {

        return (

            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        )
    }
}

export default Loading