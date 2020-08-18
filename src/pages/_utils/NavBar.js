
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';

import SearchBar from './SearchBar'
import "./NavBar.css"
import "./NavBar.scss"

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profilePic: props.profilePic
        }
    }

    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }

    render() {

        /**
         * Properties:
         * 1. showSearch: show search bar on the navbar
         *    values = "true", "false" (all other values default to "false")
         *    default value = "false"
         * 2. transparent: show background of navbar
         *    values = "true", "false" (all other values default to "false")
         *    Note: if false, will take up space on page
         */
        let showSearch = this.props.showSearch === "true"
        let transparent = this.props.transparent === "true"

        const btnDuo = (

            <span>
                <span className="align-self-center mr-2 d-none d-md-inline btn-nav-wrapper">
                    <button style={transparent ? { color: "black", border: "1.4px black solid", backgroundColor: "rgba(232, 232, 232, .5)"} : { color: "white", border: "0.4px white solid" }}
                        type="button" className="btn-nav" data-toggle="modal" data-target="#signup-modal">
                            <div className="btn-nav-text-wrapper">
                                <div className="btn-nav-background"></div>
                                <div className={"btn-nav-text " + (transparent && "font-weight-bold")}>
                                    Sign up
                                </div>
                            </div>
                    </button>
                </span>
                <span className="align-self-center mr-2 d-md-inline btn-nav-wrapper">
                    <button style={transparent ? { color: "black", border: "1.4px black solid", backgroundColor: "rgba(232, 232, 232, .5)"} : { color: "white", border: "0.4px white solid" }}
                        type="button" className="btn-nav" data-toggle="modal" data-target="#login-modal">
                            <div className="btn-nav-text-wrapper">
                                <div className="btn-nav-background"></div>
                                <div className={"btn-nav-text " + (transparent && "font-weight-bold")}>
                                    Login
                                </div>
                            </div>
                    </button>
                </span>
            </span>
        )

        // TODO: make photo dynamic
        const dropdownMenu = (
            <div className="d-inline-block menu-dropdown d-flex align-items-center">

                <div className="float-right ">
                    <Link to="/profile">
                        <img className="rounded-circle nav-bar-profile" alt="profile icon" src={require("./../../res/img/profile-pictures/" + this.props.profilePic)}
                            data-holder-rendered="true" />
                    </Link>
                </div>

                <li className="nav-item dropdown float-right d-flex align-items-center">

                    <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle"></a>

                    <div aria-labelledby="navbarDropdownMenuLink" className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to="/profile">
                            Profile
                        </Link>
                        <div className="dropdown-divider"></div>
                        <span className="dropdown-item clickable" onClick={this.logOut.bind(this)}>Log out</span>
                    </div>
                </li>
            </div>

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
                            <SearchBar searchValue={this.props.searchValue} />
                        </div>
                        <div className="ml-auto">

                            {localStorage.usertoken ? dropdownMenu : btnDuo}
                            {/* 
                            <div className="align-self-center mr-2">
                                {localStorage.usertoken ? logout : login}
                            </div> */}
                        </div>
                    </nav>
                }

                <nav className={"navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar py-3 justify-content-between "
                    + (transparent ? "transparent" : "bg-dark")}>

                    <div className="d-none d-md-block px-3 mx-3"></div>

                    <div className={"navbar-brand font-weight-bold float-left align-self-center " + (showSearch && "d-none d-sm-block")}>
                        <Link className={(showSearch ? "brand-txt" : "big-brand-txt") + " px-2"} to="/">
                            UT Review
                            
                        </Link>
                    </div>

                    <div className="d-none d-md-block px-3 mx-3"></div>

                    <div className={showSearch ? "search-wrapper mr-auto" : "d-none"} >
                        <SearchBar searchValue={this.props.searchValue}/>
                    </div>

                    <div className="ml-auto" >

                        {localStorage.usertoken ? dropdownMenu : btnDuo}
                        {/* 
                            <div className="align-self-center mr-2">
                                {localStorage.usertoken ? logout : login}
                            </div> */}
                    </div>
                </nav>
            </div>
        )
    }
}


export default withRouter(NavBar)