import React from 'react'
import Select from 'react-select'

import './Filter.css'

function CourseFilter(props) {

    let numRatingOptions = props.minNumRatings.length - 1

    return (

        <div className='card'>

            <div className='card-header text-left font-weight-bold'>
                Course Filters
            </div>

            <div className='card-body'>

                {/* department filter */}
                <div>

                    <label className="float-left text-left font-weight-bold">Department: </label>
                    <Select
                        className="basic-multi-select my-3 clear-both"
                        classNamePrefix="select"
                        name="dept"
                        options={props.depts}
                        onChange={(objs) => {
                            let values = [];

                            if (objs != null) {
                                for (let i = 0; i < objs.length; i++) {
                                    values[i] = objs[i].value
                                }
                            }

                            props.handleFilterChange(values)
                        }}
                        value={props.depts.filter(val => {
                            for (let i = 0; i < props.filter.depts.length; i++) {
                                if (val.value === props.filter.depts[i]) return true;
                            }

                            return false;
                        })}
                        isLoading={!props.deptsLoaded}
                        isDisabled={!props.deptsLoaded}
                        placeholder="Select"
                        isClearable={true}
                        isSearchable={true}
                        isMulti
                    />
                </div>

                <div>
                    <label className="text-left font-weight-bold">Hours: </label>
                    <br />
                    <div className="custom-checkbox" onClick={() => { props.handleFilterChange(null, -1, null, { 0: true }) }}>
                        <input type="checkbox" className="d-none" checked={props.filter.hours[0]} />
                        <div className="checkbox-container">
                            0XX
                        </div>
                    </div>
                    <div className="custom-checkbox" onClick={() => { props.handleFilterChange(null, -1, null, { 1: true }) }}>
                        <input type="checkbox" className="d-none" checked={props.filter.hours[1]} />
                        <div className="checkbox-container">
                            1XX
                        </div>
                    </div>
                    <div className="custom-checkbox" onClick={() => { props.handleFilterChange(null, -1, null, { 2: true }) }}>
                        <input type="checkbox" className="d-none" checked={props.filter.hours[2]} />
                        <div className="checkbox-container">
                            2XX
                        </div>
                    </div>
                    <div className="custom-checkbox" onClick={() => { props.handleFilterChange(null, -1, null, { 3: true }) }}>
                        <input type="checkbox" className="d-none" checked={props.filter.hours[3]} />
                        <div className="checkbox-container">
                            3XX
                        </div>
                    </div>
                    <div className="custom-checkbox" onClick={() => { props.handleFilterChange(null, -1, null, { 4: true }) }}>
                        <input type="checkbox" className="d-none" checked={props.filter.hours[4]} />
                        <div className="checkbox-container">
                            4XX
                        </div>
                    </div>
                    <div className="custom-checkbox" onClick={() => { props.handleFilterChange(null, -1, null, { 5: true }) }}>
                        <input type="checkbox" className="d-none" checked={props.filter.hours[5]} />
                        <div className="checkbox-container">
                            5XX
                        </div>
                    </div>
                    <div className="custom-checkbox" onClick={() => { props.handleFilterChange(null, -1, null, { 6: true }) }}>
                        <input type="checkbox" className="d-none" checked={props.filter.hours[6]} />
                        <div className="checkbox-container">
                            6XX+
                        </div>
                    </div>
                </div>

                <div>
                    <label className="text-left font-weight-bold">Divisions: </label>
                    <br />
                    <div className="custom-checkbox" onClick={() => { props.handleFilterChange(null, -1, null, null, { lower: true }) }}>
                        <input type="checkbox" className="d-none" checked={props.filter.divisions.lower} />
                        <div className="checkbox-container">
                            Lower
                        </div>
                    </div>
                    <div className="custom-checkbox" onClick={() => { props.handleFilterChange(null, -1, null, null, { upper: true }) }}>
                        <input type="checkbox" className="d-none" checked={props.filter.divisions.upper} />
                        <div className="checkbox-container">
                            Upper
                        </div>
                    </div>
                    <div className="custom-checkbox" onClick={() => { props.handleFilterChange(null, -1, null, null, { graduate: true }) }}>
                        <input type="checkbox" className="d-none" checked={props.filter.divisions.graduate} />
                        <div className="checkbox-container">
                            Grad
                        </div>
                    </div>
                </div>

                {/* min num of ratings filter */}
                <div className="form-group my-3 clear-both">
                    <label className="float-left text-left font-weight-bold">Min # of ratings:</label>
                    <label className="float-right">{props.filter.mNum}</label>

                    <input type="range" min="0" max={numRatingOptions.toString()} className="c-range form-control-range" step="1"
                        value={props.minNumRatings.indexOf(props.filter.mNum)}
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
                        <label className="form-check-label text-left ">Current (insert semester)</label>
                    </div>
                    <br />
                    <div className="form-check sem-radio" onClick={() => { props.handleFilterChange(null, -1, "next") }} >
                        <input className="form-check-input utcolor" type="radio" name="semester" value="next"
                            checked={props.filter.sem === "next"} />
                        <label className="form-check-label text-left ">Next (insert semester)</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseFilter