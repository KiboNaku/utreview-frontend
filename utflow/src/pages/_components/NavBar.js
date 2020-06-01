
import React, { Component } from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom';

import SearchBar from './SearchBar'
import Login from './../popups/Login'
import Signup from './../popups/Signup'

class NavBar extends Component {

    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }

    render() {

        const login = (
            <span className="col-3 col-md-2 float-right" >
                <button type="button" className="btn" data-toggle="modal" data-target="#login-modal">Log In</button>
            </span >
        )

        const logout = (

            <span className="col-3 col-md-2 float-right" >
                <button type="button" className="btn" onClick={this.logOut.bind(this)}>Log out</button>
                {/* <Link to="/profile">
                    <button type="button" className="btn">Profile</button>
                </Link> */}
            </span >

        )

        /**
         * Properties:
         * 1. showSearch: show search bar on the navbar
         *    values = "true", "false"
         *    default value = "false"
         */

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light py-4">

                    <span className="nav-padding d-none d-md-inline col-lg-1"></span>
                    <div className="navbar-brand" className="d-none d-md-inline col-md-2 col-lg-1 font-weight-bold">
                        <Link to="/">
                            UT Flow
                        </Link>
                    </div>

                    <span className={(this.props.showSearch && "d-none ") + "col-9 col-md-8"}></span>

                    <span className={(!this.props.showSearch && "d-none ") + "col-9 col-md-8"}>
                        <SearchBar />
                    </span>

                    {localStorage.usertoken ? logout : login}

                    <Login/>
                    <Signup/>
                </nav>
            </div >

        )
    }
}

export default withRouter(NavBar)