import React, { Component } from 'react'
import Highcharts from 'highcharts'
import Exporting from 'highcharts/modules/exporting'
import ModalHeader from "./../../popups/_utils/ModalHeader"
import Loading from './../../_utils/Loading'

import jwt_decode from 'jwt-decode'
import { Link, withRouter } from 'react-router-dom'
import $ from './../../../../node_modules/jquery'
import axios from 'axios'

class UploadCourses extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            selectedFile: null,
        }

        this.onFileChange = this.onFileChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {



    }

    onFileChange(event){
        this.setState({selectedFile: event.target.files[0] })
    }

    onSubmit(){
        const formData = new FormData()
        formData.append("image", this.state.selectedFile);
        axios.post("/api/parse_academic_summary", formData);
        $("#upload-courses").modal("hide") 
    }

    render() {

        let loading =
            <div>
                <Loading />
            </div>

        let noResults = (
            <h6>
                Could not find data for this course/professor combination
            </h6>
        )

        return (
            <div className="modal fade" id={`upload-courses`} role="dialog">

                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">

                        <ModalHeader text="Upload Courses" />

                        <div className="modal-body upload-courses-body">
                            <div>
                                <img alt="" src={require('./../../../res/img/other/MyUTAcademicSummary.PNG')} height={300} width={500}></img>
                            </div>
                            <div>
                                <h6> Upload your academic summary here </h6>

                                    <input type="file" name="academic-summary" accept=".pdf" onChange={this.onFileChange}/>
                                    <button type="button" onClick={this.onSubmit}>
                                        Upload!
                                    </button>

                                
                            </div>

                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default withRouter(UploadCourses)