import React from 'react'

function SearchBar(props) {

    return (
        <form className="form-inline">
            <div className="input-group col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
                <input type="text" className="form-control" placeholder="Search for courses or professors" />
            </div>
        </form>
    )
}

export default SearchBar