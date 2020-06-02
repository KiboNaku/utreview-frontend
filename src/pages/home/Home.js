import React, { Component } from 'react'
import NavBar from './../_components/NavBar'
import SearchBar from './../_components/SearchBar'
import Footer from './../_components/Footer'
import './home.css'

class Home extends Component {
    render() {
        return (
            <div>
                <main>
                    <div className="container text-center">
                        
                        <div>
                            <h1>What starts here ...</h1>
                            <h1>changes your course schedule</h1>
                        </div>
                        
                        <br/>
                        
                        <SearchBar />
                    </div>
                </main>
            </div>
        )
    }
}

export default Home