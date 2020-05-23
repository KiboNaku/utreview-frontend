import React, {Component} from 'react'
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

                <form className="form-inline">

                    <div className="input-group">
                        
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                            <i class="fas fa-search"></i>
                            </span>
                        </div>

                        <input type="text" className="form-control " placeholder="Search for courses or professors"/>
                    </div>

                </form>

                <div>
                    <button type="button" class="btn">Log in</button>
                </div>
                        
            </nav>
        )
    }
}

export default NavBar