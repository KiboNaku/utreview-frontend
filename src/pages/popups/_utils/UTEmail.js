
import React from 'react'

function UTEmail(props) {
    return (
    <div className="form-label-group">
        <span className="d-flex">
            <input
                type="text"
                name="email"
                className="form-control d-inline"
                value={props.email}
                onChange={props.onChange}
                placeholder="email"
                required autoFocus />
            <label className="px-2 float-right" style={{ marginTop: 6 }}>@utexas.edu</label>
        </span>
    </div>
    )
}

export default UTEmail