
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
            <button type="button" className="btn btn-dark font-weight-bold" data-toggle="modal" data-target="#login-modal">Log in</button>
        )

        const logout = (
            <button type="button" className="btn btn-dark font-weight-bold" onClick={this.logOut.bind(this)}>Log out</button>
        )

        const signup = (
            <button type="button" className="btn btn-dark font-weight-bold" data-toggle="modal" data-target="#signup-modal">Sign up</button>
        )

        const profile = (
            <button type="button" className="btn btn-dark font-weight-bold">Profile</button>
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

                <nav className="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar transparent py-3 justify-content-between">

                    <div className="navbar-brand" className={"font-weight-bold float-left align-self-center" + (showSearch && " d-none d-md-block")}>
                        <Link id="nav-brand" className="utdark px-2" to="/">
                            UT Review
                        </Link>
                    </div>

                    <div className={showSearch ? "search-wrapper mr-auto" : "d-none"} >
                        <SearchBar />
                    </div>

                    <div classname="ml-auto">
                        <span className="align-self-center mr-2 d-none d-md-inline">
                            {localStorage.usertoken ? profile : signup}
                        </span>

                        <span className="align-self-center mr-2">
                            {localStorage.usertoken ? logout : login}
                        </span>
                    </div>

                </nav>
                
                <Login />
                <Signup />

            </div>
        )
    }
}


export default withRouter(NavBar)