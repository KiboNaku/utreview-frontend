import React, {Component} from 'react'
import NavBar from './../_components/NavBar'
import SearchBar from './../_components/SearchBar'
import './home.css'

class Home extends Component {
    render(){
        return (
            <div>
                <main>
                    <div className="col-sm-12 col-md-8 col-lg-6 col-xl-6">
                        <SearchBar/>
                    </div>
                </main>
            </div>
        )
    }
}

export default Home