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

        this.onSubmit = this.onSubmit.bind(this)
    }
    

    onSubmit(values) {

        this.setState({ loading: true })
        $('#report-comment').toast('show')

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
            <ReportCommentComponent reviewId={this.props.reviewId} onSubmit={this.onSubmit} data={this.state} />
        )
    }
}

export default withRouter(ReportComment)