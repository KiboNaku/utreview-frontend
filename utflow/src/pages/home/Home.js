import React, {Component} from 'react'
import NavBar from './../_components/NavBar'
import SearchBar from './../_components/SearchBar'
import './home.css'

class Home extends Component {
    render(){
        return (
            <div>
                <NavBar/>
                <main>
                    <SearchBar />
                </main>
            </div>
        )
    }
}

export default Home