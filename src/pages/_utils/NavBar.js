
import React, { Component } from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom';

import SearchBar from './SearchBar'
import "./NavBar.css"

class NavBar extends Component {

    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }

    render() {

        const login = (
            <button type="button" className="btn font-weight-bold btn-nav" data-toggle="modal" data-target="#login-modal">Log in</button>
        )

        const logout = (
            // <div class="dropdown-menu-left">
            //     <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            //         <img class="rounded-circle nav-bar-profile" alt="100x100" src={require("./../../res/img/default.jpg")}
            //             data-holder-rendered="true" />
            //     </a>
            //     <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            //         <a class="dropdown-item" href="#">Action</a>
            //         <a class="dropdown-item" href="#">Another action</a>
            //         <div class="dropdown-divider"></div>
            //         <a class="dropdown-item" href="#">Something else here</a>
            //     </div>
            // </div>
            <li class="nav-item dropdown d-inline-block">
                <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link dropdown-toggle">
                    <img class="rounded-circle nav-bar-profile" alt="100x100" src={require("./../../res/img/default.jpg")}
                        data-holder-rendered="true" />
                </a>
                <div aria-labelledby="navbarDropdownMenuLink" className="dropdown-menu dropdown-menu-right">
                    <Link className="dropdown-item" to="/profile">
                        Profile
                    </Link>
                    <div class="dropdown-divider"></div>
                    <span className="dropdown-item clickable" onClick={this.logOut.bind(this)}>Log Out</span>
                </div>
            </li>
        )

        const signup = (
            <button type="button" className="btn font-weight-bold btn-nav" data-toggle="modal" data-target="#signup-modal">Sign up</button>
        )

        const profile = (
            <Link to="/profile">
                <button type="button" className="btn font-weight-bold btn-nav">Profile</button>
            </Link>

        )

        /**
         * Properties:
         * 1. showSearch: show search bar on the navbar
         *    values = "true", "false" (all other values default to "false")
         *    default value = "false"
         * 2. transparent: show background of navbar
         *    values = "true", "false" (all other values default to "false")
         *    Note: if false, will take up space on page
         */

        let showSearch = this.props.showSearch == "true"
        let transparent = this.props.transparent == "true"

        return (
            <div>

                {!transparent &&
                    <nav className="navbar navbar-expand-lg navbar-dark transparent py-3 justify-content-between invisible">

                        <div className="navbar-brand" className={"font-weight-bold float-left align-self-center" + (showSearch && " d-none d-md-block")}>
                            <Link className={(!showSearch && "big-brand-txt ") + "px-2"} to="/">
                                UT Review
                            </Link>
                        </div>

                        <div className={showSearch ? "search-wrapper mr-auto" : "d-none"} >
                            <SearchBar />
                        </div>
                        <div className="ml-auto">


                            {!localStorage.usertoken &&
                                <span className="align-self-center mr-2 d-none d-md-inline">
                                    {signup}
                                </span>
                            }

                            <span className="align-self-center mr-2">
                                {localStorage.usertoken ? logout : login}
                            </span>
                        </div>

                    </nav>
                }

                <nav className={"navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar py-3 justify-content-between "
                    + (transparent ? "transparent" : "bg-dark")}>

                    <div className="navbar-brand" className={"font-weight-bold float-left align-self-center" + (showSearch && " d-none d-md-block")}>
                        <Link className={(!showSearch && "big-brand-txt ") + "px-2"} to="/">
                            UT Review
                        </Link>
                    </div>

                    <div className={showSearch ? "search-wrapper mr-auto" : "d-none"} >
                        <SearchBar />
                    </div>
                    <div className="ml-auto">


                        {!localStorage.usertoken &&
                            <span className="align-self-center mr-2 d-none d-md-inline">
                                {signup}
                            </span>
                        }

                        <span className="align-self-center mr-2">
                            {localStorage.usertoken ? logout : login}
                        </span>
                    </div>

                </nav>
            </div>
        )
    }
}


export default withRouter(NavBar)