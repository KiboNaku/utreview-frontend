import React from 'react'
import Select from 'react-select'
import ReviewCourse from './../_utils/ReviewCourse'
import ReviewProfessor from './../_utils/ReviewProfessor'
import './../ReviewForm.css'

function ReviewFormComponent(props) {
    let gradeList = [
        { value: "A", label: "A" },
        { value: "A-", label: "A-" },
        { value: "B+", label: "B+" },
        { value: "B", label: "B" },
        { value: "B-", label: "B-" },
        { value: "C+", label: "C+" },
        { value: "C", label: "C" },
        { value: "C-", label: "C-" },
        { value: "D+", label: "D+" },
        { value: "D", label: "D" },
        { value: "D-", label: "D-" },
        { value: "F", label: "F" },
        { value: "P", label: "P" },
    ]

    let anonymousStatus = [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
    ]

    let disableStyle = (props.data.formDisabled ? {
        pointerEvents: "none",
        opacity: "0.4"
    } : {})
    let topicSelect = (
        <li className="py-2">

            <span >
                Select a topic
            </span>

            <Select
                className="col review-form-dropdown"
                classNamePrefix="select"
                name="topicName"
                options={props.data.topicList}
                onChange={props.handleTopicChange}
                placeholder="Topic"
                isClearable={true}
                isSearchable={true}
                isLoading={!props.data.topic.loaded}
                isDisabled={!props.data.topic.loaded || props.data.oldReview || props.data.order === 0 ? true : false}
                value={props.data.topic.id !== null ?
                    props.data.topicList.filter(topic => topic.id === props.data.topic.id) : null}
            />
        </li>
    )

    let courseSelect = (

        <div className="review-form-selector">

            <li className="py-3">

                <span>
                    Select a course<small className='text-danger'> *</small>
                </span>

                <Select
                    className="col review-form-dropdown"
                    classNamePrefix="select"
                    name="courseName"
                    options={props.data.courseList}
                    onChange={props.handleCourseChange}
                    placeholder="Course"
                    isClearable={true}
                    isSearchable={true}
                    isLoading={!props.data.course.loaded}
                    isDisabled={!props.data.course.loaded || props.data.oldReview || props.data.order === 0 ? true : false}
                    value={props.data.course.id !== null ?
                        props.data.courseList.filter(course => course.id === props.data.course.id) : null}
                />

            </li>
            {props.data.topic.selected ? topicSelect : null}
        </div>

    )

    let profSelect = (
        <li className="py-3 review-form-selector">

            <span>
                Select a professor<small className='text-danger'> *</small>
            </span>

            <Select
                className="col review-form-dropdown"
                classNamePrefix="select"
                name="ProfessorName"
                options={props.data.profList}
                onChange={props.handleProfessorChange}
                placeholder="Professor"
                isClearable={true}
                isSearchable={true}
                isLoading={!props.data.prof.loaded}
                isDisabled={!props.data.prof.loaded || props.data.oldReview || props.data.order === 1 ? true : false}
                value={props.data.prof.id !== null ?
                    props.data.profList.filter(prof => prof.id === props.data.prof.id) : null}
            />
        </li>
    )

    let courseReview = (
        <li className="py-3 col-md-6" style={disableStyle}>
            <span>
                Give us your review for {props.data.course.id !== null ? props.data.course.dept + " " + props.data.course.num : '...'}<small className='text-danger'> *</small>
            </span>
            <ReviewCourse {...props} />
        </li>
    )

    let profReview = (
        <li className="py-3 col-md-6" style={disableStyle} >
            <span>
                Give us your review for {props.data.prof.id !== null ? props.data.prof.firstName + " " + props.data.prof.lastName : '...'}<small className='text-danger'> *</small>
            </span>
            <ReviewProfessor {...props} />
        </li >
    )

    return (

        <div className="review-page-wrapper">
            <div className="review-form-wrapper">
                <div className="review-form-card container-fluid col-12 col-sm-10 col-md-80 col-lg-60">

                    <form className="px-4 py-5" onSubmit={props.handleSubmit}>

                        <div className="review-form-opening">
                            <h4 className="review-title">Let us know about your experience.</h4>
                        </div>

                        <ol className="review-questions-wrapper">
                            <div className="course-and-prof">
                                {props.data.order === 0 ? courseSelect : profSelect}
                                {props.data.order === 0 ? profSelect : courseSelect}
                            </div>

                            <li className="py-3">

                                <span >
                                    Select a semester<small className='text-danger'> *</small>
                                </span>
                                <br />

                                <div className="semester-select">
                                    <Select
                                        className="col review-form-dropdown semester-form-shortener"
                                        classNamePrefix="select"
                                        name="semester"
                                        options={props.data.semesterList}
                                        onChange={props.handleSemesterChange}
                                        placeholder="Semester"
                                        isClearable={true}
                                        isSearchable={true}
                                        isDisabled={props.data.oldReview !== null ? true : false}
                                        value={props.data.semester.semester !== "" ?
                                            props.data.semesterList.filter(sem => sem.value === props.data.semester.semester) : null}
                                    />
                                    <Select
                                        className="col review-form-dropdown semester-year-shortener"
                                        classNamePrefix="select"
                                        name="year"
                                        options={props.data.yearList}
                                        onChange={props.handleYearChange}
                                        placeholder="Year"
                                        isClearable={true}
                                        isSearchable={true}
                                        isDisabled={props.data.oldReview !== null ? true : false}
                                        value={props.data.semester.year !== null ?
                                            props.data.yearList.filter(year => year.value === props.data.semester.year) : null}
                                    />
                                </div>

                            </li>

                            <div class="row mt-2">
                                {props.data.order === 0 ? courseReview : profReview}
                                {props.data.order === 0 ? profReview : courseReview}
                            </div>
                            <li className="py-3" style={disableStyle}>
                                <div className="row">
                                    <div style={{marginRight: "1vw"}}>
                                        <span className="review-form-bottom-questions">
                                            Give us the grade you obtained in {props.data.course.id !== null ? props.data.course.dept + " " + props.data.course.num : '...'}
                                        </span>
                                            <div>
                                                <Select
                                                    className="col review-form-dropdown-2"
                                                    classNamePrefix="select"
                                                    name="grade"
                                                    options={gradeList}
                                                    onChange={props.handleGradeChange}
                                                    placeholder="Letter Grade"
                                                    isClearable={true}
                                                    isDisabled={props.data.formDisabled ? true : false}
                                                    value={props.data.grade !== null ?
                                                        gradeList.filter(grade => grade.value === props.data.grade) : null}
                                                />
                                        </div>
                                    </div>  
                                    <div>
                                        <span className="review-form-bottom-questions"> 
                                            Would you like your review to be anonymous?
                                        </span>
                                            <Select
                                                className="col review-form-dropdown-2"
                                                classNamePrefix="select"
                                                name="anonymous"
                                                options={anonymousStatus}
                                                onChange={props.handleAnonymousChange}
                                                placeholder="Anonymous Status"
                                                isClearable={false}
                                                isDisabled={props.data.formDisabled ? true : false}
                                                value={
                                                    anonymousStatus.filter(anonymous => anonymous.value === props.data.anonymous)
                                                }
                                            />
                                    </div>
                                </div>

                            </li>
                        </ol>

                        <div className="text-center pt-4" style={disableStyle}>

                            <button className="btn btn-lg btn-utcolor font-weight-bold" disabled={props.data.submitPressed} type="submit">
                                {props.data.oldReview ? "Update" : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ReviewFormComponent