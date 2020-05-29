import React, { Component } from 'react'
import SearchBar from './SearchBar'
import {Link, Route, Switch} from 'react-router-dom';

class NavBar extends Component {

    render() {

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

                    <span className="col-3 col-md-2 float-right">
                        <Link to="/login">
                            <button type="button" className="btn">Log in</button>
                        </Link>
                    </span>

                </nav>
            </div>

        )
    }
}

export default NavBar