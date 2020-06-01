import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import './components.css'

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
            <form className="form-inline">
                <div className="input-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <Link to="/course-results">
                        <div className="input-group-prepend">
                            <span className="input-group-text">

                                <button type="button" className="searchButton">
                                    <i className="fas fa-search"></i>
                                </button>

                            </span>
                        </div>
                    </Link>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for courses or professors"
                        onKeyPress={this.handleKeyPress}
                    />
                </div>
            </form>
        )
    }

}

export default withRouter(SearchBar)