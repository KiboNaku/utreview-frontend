import React, { Component } from 'react'
import {Link, Route, Switch} from 'react-router-dom';

class Footer extends Component {

    render() {

        return (

            <footer>
                <ul class="nav justify-content-end">
                    <li class="nav-item" class="nav-link">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li class="nav-item" class="nav-link">
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                    <li class="nav-item" class="nav-link">
                        <Link to="/">
                            Privacy Policy
                        </Link>
                    </li>
                </ul>
            </footer>
        )
    }
}

export default Footer