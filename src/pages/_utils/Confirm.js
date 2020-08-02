import React from 'react'

function Confirm(props) {
    let modalId = "confirmModal" + props.id.toString()
    return (
        <div className="modal fade" id={modalId} role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> {props.title} </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.message}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={props.handleOk} data-dismiss="modal">OK</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirm