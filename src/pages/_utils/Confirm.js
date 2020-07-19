import React from 'react'

function Confirm(props) {
    return (
        <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 className="modal-title"> {props.title} </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {props.message}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onClick={props.handleOk} data-dismiss="modal">OK</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirm