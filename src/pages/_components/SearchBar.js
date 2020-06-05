import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import './searchbar.css'

class SearchBar extends React.Component {

    constructor() {
        super()
        this.searchValue = " "
        this.state = { searchValue: " " }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleKeyPress (e) {
        console.log(e.target.value)
        
        this.searchValue = e.target.value
        if (e.key === 'Enter') {        
            this.props.history.push({
                pathname: "/results",
                search: `?search=${e.target.value}`,
                state: {searchValue: e.target.value}
            })
        }else{
            this.setState({ searchValue: e.target.value + e.key})
        }
    }

    handleSubmit (e)  {
        
        this.props.history.push({
            pathname: "/results",
            search: `?search=${this.state.searchValue}`,
            state: {searchValue: this.state.searchValue}
        })
        e.preventDefault()    
    }

    render() {
        return (
            <form className="form-inline form-search" onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="d-flex justify-content-center searchbar-wrapper">
                        <div className="searchbar">
                            <input
                                className="search-input"
                                type="text"
                                id="search-input1234"
                                onKeyPress={this.handleKeyPress}
                                placeholder="Search for courses or professors" />

                            <button type ="submit" className="search-icon">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

}

export default withRouter(SearchBar)