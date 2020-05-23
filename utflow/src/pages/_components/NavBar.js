import React, {Component} from 'react'
import SearchBar from './SearchBar'
import "./NavBar.css"

class NavBar extends Component {

    render(){
        return (
            
            <nav style={{padding: 20}} className="navbar navbar-expand-lg navbar-light bg-light">

                <a sclassName="navbar-brand" href="#">UT Flow</a>
                
                <button 
                    className="navbar-toggler" 
                    type="button">

                    <span className="navbar-toggler-icon"></span>

                </button>

                <SearchBar/>

                <div>
                    <button type="button" class="btn">Log in</button>
                </div>
                        
            </nav>
        )
    }
}

export default NavBar