import React from 'react'

function Filter(props) {
    return (
        <div className="col-md-3">
            <div className='card'>

                <div className='card-header text-left font-weight-bold'>
                    { props.title }
				</div>

                <div className='card-body'>
                    { props.filters }
                </div>
            </div>
        </div>
    )
}

export default Filter