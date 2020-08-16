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
    let disableStyle = (props.data.formDisabled ? {
        pointerEvents: "none",
        opacity: "0.4"
    } : {})
    let topicSelect = (
        <li className="py-2">

            <span >
                Select a topic:
                            </span>

            <Select
                className="basic-single col-12 col-sm-10 col-md-8 mt-2"
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

        <div>

            <li className="py-2">

                <span >
                    Select a course<small className='warning'> *</small>
                </span>

                <Select
                    className="basic-single col-12 col-sm-10 col-md-8 mt-2"
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
        <li className="py-3" >

            <span>
                Select a professor<small className='warning'> *</small>
            </span>

            <Select
                className="basic-single col-12 col-sm-10 col-md-8 mt-2"
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

    return (
        <div style={{ width: "100%", backgroundColor: "#9cadb7" }}>
            <div className="container-fluid col-12 col-sm-10 col-md-8 col-lg-6 border rounded" style={{ backgroundColor: "white" }}>

                <form className="px-4 py-5" onSubmit={props.handleSubmit}>

                    <h4 className="pb-4">Let us know about your experience.</h4>

                    <ol className="px-5">

                        {props.data.order === 0 ? courseSelect : profSelect}
                        {props.data.order === 0 ? profSelect : courseSelect}

                        <li className="py-3">

                            <span >
                                Select a semester<small className='warning'> *</small>
                            </span>
                            <br />

                            <div className="semester-select">
                                <Select
                                    className="basic-single col-12 col-sm-10 col-md-8 mt-2"
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
                                    className="basic-single col-12 col-sm-10 col-md-8 mt-2"
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

                        <li className="py-3" style={disableStyle}>
                            <span>
                                Give us your review for {props.data.course.id !== null ? props.data.course.dept + " " + props.data.course.num : '...'}<small className='warning'> *</small>
                            </span>
                            <ReviewCourse {...props} />
                        </li>

                        <li className="py-3" style={disableStyle}>
                            <span>
                                Give us your review for {props.data.prof.id !== null ? props.data.prof.firstName + " " + props.data.prof.lastName : '...'}<small className='warning'> *</small>
                            </span>
                            <ReviewProfessor {...props} />
                        </li>
                        <li className="py-3" style={disableStyle}>
                            <span>
                                (Optional) Give us the grade you obtained in {props.data.course.id !== null ? props.data.course.dept + " " + props.data.course.num : '...'}
                            </span>
                            <div className="review-form-grade">
                                <Select
                                    className="basic-single col-12 col-sm-10 col-md-8 mt-2"
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

                        </li>
                    </ol>

                    <div className="text-center pt-4" style={disableStyle}>

                        <button className="btn btn-lg btn-utcolor font-weight-bold" disabled={props.data.submitPressed} type="submit">
                            {props.data.oldReview ? "Update" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ReviewFormComponent