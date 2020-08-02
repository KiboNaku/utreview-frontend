import React from 'react'
import axios from 'axios'
import ModalHeader from "./../popups/_utils/ModalHeader"
import './../../utcolors.css'
import Loading from './../_utils/Loading'

function GradeDistributionsComponent(props) {

    let loading =
        <div className="on-top">
            <Loading />
        </div>

    return (
        <div className="modal fade" id={`grade-distributions-modal-${props.courseId}-${props.profId}`} role="dialog">

            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">

                    <ModalHeader text="Grade Distribution" />

                    <div className="modal-body">

                        {props.data.loading && loading}

                    </div>
                </div>
            </div >
        </div >
    )
}

export default GradeDistributionsComponent