import React from 'react'

function SearchBar() {
    return (
        <form className="form-inline">

            <div className="input-group">

                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                        <i class="fas fa-search"></i>
                    </span>
                </div>

                <input type="text" className="form-control " placeholder="Search for courses or professors" />
            </div>

        </form>
    )
}

export default SearchBar