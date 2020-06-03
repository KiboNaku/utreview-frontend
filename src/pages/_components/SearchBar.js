import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import './SearchBar.css'

class SearchBar extends React.Component {

    constructor() {
        super()
        this.state = { searchValue: " " }
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.setState({ searchValue: e.target.value })
            this.props.history.push("/course-results")
        }
    }

    render() {
        return (
            <form className="form-inline form-search">
                <div className="container">
                    <div className="d-flex justify-content-center searchbar-wrapper">
                        <div className="searchbar">
                            <input
                                className="search-input"
                                type="text"
                                onKeyPress={this.handleKeyPress}
                                placeholder="Search for courses or professors" />

                            <Link to="/course-results" className="search-icon">
                                <i className="fas fa-search"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

}

export default withRouter(SearchBar)