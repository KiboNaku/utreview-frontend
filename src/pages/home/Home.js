import React, { Component } from 'react'
import SearchBar from './../_components/SearchBar'
import './Home.css'

class Home extends Component {
    render() {
        return (
            <div>
                <main>
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
                </main>
            </div >
        )
    }
}

export default Home