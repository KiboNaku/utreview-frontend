
import React, { Component } from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom';

import SearchBar from './SearchBar'
import Login from './../popups/Login'
import Signup from './../popups/Signup'
import "./NavBar.css"

class NavBar extends Component {

    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }

    render() {

        const login = (
            <button type="button" className="btn" data-toggle="modal" data-target="#login-modal">Log In</button>
        )

        const logout = (
            <button type="button" className="btn" onClick={this.logOut.bind(this)}>Log out</button>
        )

        {/* <Link to="/profile">
                    <button type="button" className="btn">Profile</button>
                </Link> */}

        /**
         * Properties:
         * 1. showSearch: show search bar on the navbar
         *    values = "true", "false" (all values other than "true" will default to "false")
         *    default value = "false"
         */

        let showSearch = this.props.showSearch == "true"
        return (
            <div>

                <nav className="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar transparent py-3 row d-flex">

                    <div className="navbar-brand" className="font-weight-bold align-self-center d-none d-md-block px-5">
                        <Link id="nav-brand" className="utdark" to="/">
                            UT Review
                        </Link>
                    </div>

                    <div className="search-wrapper">
                        
                        {/* // className={(!showSearch && "d-none ") */}
                        <SearchBar />
                    </div>

                    <div className="float-right">
                        {localStorage.usertoken ? logout : login}
                    </div>

                </nav>

                <Login />
                <Signup />
            </div>
        )
    }
}

export default withRouter(NavBar)