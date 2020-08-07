import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ReportCommentComponent from './ReportCommentComponent'
import $ from './../../../node_modules/jquery'
import axios from 'axios'

class ReportComment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
        
        this.onSubmit = this.onSubmit.bind(this)
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
            $(`#report-comment-modal-${this.props.reviewId}`).modal('hide')
        })

    }

    render() {

        return (
            <ReportCommentComponent reviewId={this.props.reviewId} onSubmit={this.onSubmit} data={this.state} />
        )
    }
}

export default withRouter(ReportComment)