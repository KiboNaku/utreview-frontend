import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import "./Footer.css"

class Footer extends Component {

    render() {

        return (

            <footer className="footer-main py-2">
                <ul className="nav justify-content-end">
                    <li className="nav-item" className="nav-link">
                        <Link className="footer-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item" className="nav-link">
                        <Link className="footer-link" to="/about">
                            About
                        </Link>
                    </li>
                    <li className="nav-item" className="nav-link">
                        <Link className="footer-link" to="/privacy-policy">
                            Privacy Policy
                        </Link>
                    </li>
                </ul>
            </footer>
        )
    }
}

export default Footer