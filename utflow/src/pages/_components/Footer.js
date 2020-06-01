import React, { Component } from 'react'
import {Link, Route, Switch} from 'react-router-dom';

class Footer extends Component {

    render() {

        return (

            <footer>
                <ul className="nav justify-content-end">
                    <li className="nav-item" className="nav-link">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item" className="nav-link">
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                    <li className="nav-item" className="nav-link">
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