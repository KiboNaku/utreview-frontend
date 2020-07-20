import React from 'react'
import Select from 'react-select'

import './Filter.css'

function Filter(props) {

    return (

        <div className='card'>

            <div className='card-header text-left font-weight-bold'>
                {props.header}
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
                        placeholder="Select"
                        isClearable={true}
                        isSearchable={true}
                        isMulti
                    />
                </div>

                {/* min approval filter */}
                <div className="form-group my-3">
                    <label className="float-left text-left font-weight-bold">Min approval:</label>
                    <label className="float-right">{props.filter.mApp}%</label>

                    <input type="range" min="0" max="90" step="10" className="c-range form-control-range"
                        value={props.filter.mApp}
                        onChange={(event) => { props.handleFilterChange(null, event.target.value) }} />
                </div>

                {/* min num of approvals filter */}
                <div className="form-group my-3 clear-both">
                    <label className="float-left text-left font-weight-bold">Min # of approvals:</label>
                    <label className="float-right">{props.filter.mNum}</label>

                    <input type="range" min="0" max="1000" className="c-range form-control-range" step="100"
                        value={props.filter.mNum}
                        onChange={(event) => { props.handleFilterChange(null, -1, event.target.value) }} />
                </div>

                {/* semester filter */}
                <div className='form-group my-3 clear-both' style={{ overflow: "auto" }}>

                    <label className="font-weight-bold text-left float-left">Semester</label>
                    <br />
                    <div className="form-check sem-radio" onClick={() => { props.handleFilterChange(null, -1, -1, "all") }} >
                        <input className="form-check-input mb-0" type="radio" name="semester" value="all"
                            checked={props.filter.sem == "all"} />
                        <label className="form-check-label text-left mb-0 ">All</label>
                    </div>
                    <br />
                    <div className="form-check sem-radio" onClick={() => { props.handleFilterChange(null, -1, -1, "current") }}>
                        <input className="form-check-input" type="radio" name="semester" value="current"
                            checked={props.filter.sem == "current"} />
                        <label className="form-check-label text-left ">Current (insert semester)</label>
                    </div>
                    <br />
                    <div className="form-check sem-radio" onClick={() => { props.handleFilterChange(null, -1, -1, "next") }} >
                        <input className="form-check-input" type="radio" name="semester" value="next"
                            checked={props.filter.sem == "next"}/>
                        <label className="form-check-label text-left ">Next (insert semester)</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter