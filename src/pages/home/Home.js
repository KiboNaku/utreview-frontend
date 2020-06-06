import React, { Component } from 'react'
import SearchBar from './../_utils/SearchBar'
import './home.css'

class Home extends Component {
    render() {
        return (
            <div>
                <main className="home-page">
                    <div className="container text-center">

                        <div>
                            <h1>What starts here</h1>
                            <h1>changes your course schedule</h1>
                        </div>

                        <br />

                        <div className="search-wrapper container">
                            <SearchBar />
                        </div>
                    </div>

                    <div>

                    </div>
                </main>
                
                <figcaption className="figure-caption text-right clear-top px-3">Photo by Joel Filipe on Unsplash</figcaption>
            </div >
        )
    }
}

export default Home