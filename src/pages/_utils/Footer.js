import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "./Footer.css"

class Footer extends Component {

    render() {
        return (
            <footer className="footer-main pt-4 pb-3 footer-txt">
                <ul className="px-3 footer-nav">
                    <li className="nav-item nav-link">
                        <Link className="footer-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item nav-link">
                        <Link className="footer-link" to="/about">
                            About
                        </Link>
                    </li>
                    <li className="nav-item nav-link">
                        <Link className="footer-link" to="/privacy-policy">
                            Privacy Policy
                        </Link>
                    </li>
                    <li className="nav-item nav-link">
                        <Link className="footer-link" to="/contact-us">
                            Contact Us
                        </Link>
                    </li>
                    <br className="small-screen-br"/>
                    <br className="small-screen-br"/>
                    <li className="nav-item nav-link right">
                        <a href="https://www.facebook.com/utreview" className="fab fa-facebook fa-lg"></a>
                    </li>
                    <li className="nav-item nav-link right">
                        <Link className="footer-link" data-toggle="modal" data-target="#report-bug">
                            <i className="fas fa-lg fa-exclamation-triangle"></i>
                        </Link>
                    </li>
                </ul>
            </footer>
        )
    }
}

export default Footer