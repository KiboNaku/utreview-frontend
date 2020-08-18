import React from 'react'

function Toast(props) {
    let toastId = "toast-" + props.id.toString()
    return (
        <div id={toastId} 
            className="toast" 
            style={{width: "200px", position: 'absolute', top: '100px', right: '10px'}} 
            role="alert" 
            aria-live="assertive" 
            aria-atomic="true" 
            data-delay="5000"
        >
            <div className="toast-body feedback-notif">
                {/* <button type="button" className="close" data-dismiss="toast" aria-label="close">
                    &times;
                </button> */}
                <div className="feedback-notif-text">
                    {props.message}
				</div>
            </div>
        </div>
    )
}

export default Toast