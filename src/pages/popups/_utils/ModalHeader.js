
import React from 'react'

function UTEmail(props) {
    return (
    <div className="modal-header">
        <h5 className="modal-title">{props.text}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    )
}

export default UTEmail