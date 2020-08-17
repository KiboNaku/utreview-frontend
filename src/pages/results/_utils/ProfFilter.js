import React from 'react'

import './Filter.css'

function ProfFilter(props) {

    let numRatingOptions = props.minNumRatings.length

    return (

        <div className='card'>

            <div className='card-header text-left font-weight-bold'>
                Professor Filters
            </div>

            <div className='card-body'>

                {/* min num of ratings filter */}
                <div className="form-group my-3 clear-both">
                    <label className="float-left text-left font-weight-bold">Min # of ratings:</label>
                    <label className="float-right">{props.filter.mNum}</label>

                    <input type="range" min="0" max={numRatingOptions.toString()} className="c-range form-control-range" step="1"
                        value={props.filter.mNum}
                        onChange={(event) => { props.handleFilterChange(null, props.minNumRatings[event.target.value]) }} />
                </div>

                {/* semester filter */}
                <div className='form-group my-3 clear-both' style={{ overflow: "auto" }}>

                    <label className="font-weight-bold text-left float-left">Semester</label>
                    <br />
                    <div className="form-check sem-radio" onClick={() => { props.handleFilterChange(null, -1, "all") }} >
                        <input className="form-check-input mb-0 utcolor" type="radio" name="semester" value="all"
                            checked={props.filter.sem === "all"} />
                        <label className="form-check-labe text-left mb-0 ">All</label>
                    </div>
                    <br />
                    <div className="form-check sem-radio" onClick={() => { props.handleFilterChange(null, -1, "current") }}>
                        <input className="form-check-input utcolor" type="radio" name="semester" value="current"
                            checked={props.filter.sem === "current"} />
                        <label className="form-check-label text-left ">Current {props.semesters && ('(' + props.semesters.current + ')')}</label>
                    </div>
                    <br />
                    <div className="form-check sem-radio" onClick={() => { props.handleFilterChange(null, -1, "next") }} >
                        <input className="form-check-input utcolor" type="radio" name="semester" value="next"
                            checked={props.filter.sem === "next"} />
                        <label className="form-check-label text-left ">Next {props.semesters && ('(' + props.semesters.next + ')')}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfFilter