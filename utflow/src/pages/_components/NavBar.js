import React, {Component} from 'react'
import SearchBar from './SearchBar'
import "./NavBar.css"

class NavBar extends Component {
    
    render(){


        console.log(this.props)
        console.log(this.props.showSearch + " " + this.props.showSearch ? "hello": "bye")

        return (
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-4">

                <span className="nav-padding d-none d-md-inline col-lg-1"></span>
                <a className="navbar-brand" href="#" className="d-none d-md-inline col-md-2 col-lg-1 font-weight-bold">UT Flow</a>

                <span className={(this.props.showSearch && "d-none ") + "col-9 col-md-8"}></span>

                <span className={(!this.props.showSearch && "d-none ") + "col-9 col-md-8"}>
                    <SearchBar/>
                </span>

                <span className="col-3 col-md-2 float-right">
                    <button type="button" className="btn">Log in</button>
                </span>
                        
            </nav>
        )
    }
}

export default NavBar