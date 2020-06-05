import React, { Component } from 'react'
import {Link} from 'react-router-dom';

class Footer extends Component {

    render() {

        return (

            <footer style={{backgroundColor:"rgba(51, 63, 72"}}>
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