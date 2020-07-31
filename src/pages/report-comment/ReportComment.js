import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { Link, withRouter } from 'react-router-dom'
import ReportCommentComponent from './ReportCommentComponent'
import $ from './../../../node_modules/jquery'
import axios from 'axios'

class ReportComment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }

        console.log(props.reviewId)

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    signup(){
        $("#signup-modal").modal("show");
        $("#login-modal").modal("hide");
    }

    onSubmit(values) {

        this.setState({ loading: true })

        axios
        .post('/api/report_comment', {
            review_id: this.props.reviewId,
            is_course: this.props.isCourse,
            selected_options: values.selected,
            other_selected: values.otherSelected,
            other_option: values.other
        })
        .then(response => {
            this.setState({loading: false})
        })

    }

    render() {

        return (
            <ReportCommentComponent signup={this.signup} onSubmit={this.onSubmit} onChange={this.onChange} data={this.state} />
        )
    }
}

export default withRouter(ReportComment)