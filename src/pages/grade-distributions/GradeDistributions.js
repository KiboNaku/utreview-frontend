import React, { Component } from 'react'
import Highcharts from 'highcharts'
import Exporting from 'highcharts/modules/exporting'
import ModalHeader from "./../popups/_utils/ModalHeader"
import Loading from './../_utils/Loading'

import jwt_decode from 'jwt-decode'
import { Link, withRouter } from 'react-router-dom'
import $ from './../../../node_modules/jquery'
import axios from 'axios'

class GradeDistributions extends Component {

    constructor(props) {
        super(props)
        let idString = props.courseId + "-" + props.profId + "-course"
        if(!props.isCourse){
            idString = props.profId + "-" + props.courseId + "-prof"
        }
        this.state = {
            loading: true,
            noResults: false,
            id: idString
        }

        Exporting(Highcharts)

    }

    componentDidMount() {

        axios
            .post('/api/grade_distributions', {
                course_dept: this.props.course.courseDept,
                course_num: this.props.course.courseNum,
                prof_first: this.props.prof.firstName,
                prof_last: this.props.prof.lastName
            })
            .then(response => {
                this.setState({loading: false})
                console.log(response.data)
                if (response.data === null) {
                    this.setState({ noResults: true, loading: false })
                } else {
                    let grades = response.data
                    this.graph = this.chart(grades)
                }
            })

    }

    formatResult(result) {
        var classNum = result[2] + " " + result[3];
        var className = result[4];
        var prof = result[1];
        var sem = result[0];

        return classNum + ": " + className + ", " + prof + ", " + sem;
    }

    getQuery() {
        let sem = "Aggregate"
        let courseDept = this.props.courseDept
        let courseNum = this.props.course.num
        let profLast = this.props.prof.lastName.split()
        let prof = profLast[profLast.length - 1] + ", " + this.props.prof.firstName
        let query = "SELECT * from agg";

        query += " where sem like '%" + sem + "%'";
        query += " and dept like '%" + courseDept + "%'";
        query += " and prof like '%" + prof + "%'";
        query += " and course_nbr like '%" + courseNum + "%'";
        query += " order by dept, course_nbr, course_name"

        return query;
    }

    chart(grades) {
        return (
            Highcharts.chart(`grades-chart-${this.state.id}`, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: this.props.course.courseDept + " " + this.props.course.courseNum
                },
                subtitle: {
                    text: "Aggregate" + " - " + this.props.prof.firstName + " " + this.props.prof.lastName
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    title: {
                        text: 'Grades'
                    },
                    categories: [
                        'A',
                        'A-',
                        'B+',
                        'B',
                        'B-',
                        'C+',
                        'C',
                        'C-',
                        'D+',
                        'D',
                        'D-',
                        'F'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Students'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} Students</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Grades',
                    data: [{ y: grades['A'], color: '#99ff99' }, { y: grades['A-'], color: '#ccff99' }, { y: grades['B+'], color: '#ffe14d' }, { y: grades['B'], color: '#ffad33' }, { y: grades['B-'], color: '#ff704d' }, { y: grades['C+'], color: '#ff704d' }, { y: grades['C'], color: '#ff704d' }, { y: grades['C-'], color: '#ff704d' }, { y: grades['D+'], color: '#ff704d' }, { y: grades['D'], color: '#ff704d' }, { y: grades['D-'], color: '#ff704d' }, { y: grades['F'], color: '#ff704d' }]

                }]
            })

        )

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
            <div className="modal fade" id={`grade-distributions-modal-${this.state.id}`} role="dialog">

                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">

                        <ModalHeader text="Grade Distribution" />

                        <div className="modal-body">
                            <div id={`grades-chart-${this.state.id}`}>
                                {this.state.loading ? loading: (this.state.noResults ? noResults :null)}
                                
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default withRouter(GradeDistributions)