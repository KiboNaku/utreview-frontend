import React from 'react'
import Select from 'react-select'
import ReviewCourse from './../_utils/ReviewCourse'
import ReviewProfessor from './../_utils/ReviewProfessor'
import './../ReviewForm.css'

function ReviewFormComponent(props) {
    let gradeList = [
        { value: "A", label: "A"},
        { value: "A-", label: "A-"},
        { value: "B+", label: "B+"},
        { value: "B", label: "B"},
        { value: "B-", label: "B-"},
        { value: "C+", label: "C+"},
        { value: "C", label: "C"},
        { value: "C-", label: "C-"},
        { value: "D+", label: "D+"},
        { value: "D", label: "D"},
        { value: "D-", label: "D-"},
        { value: "F", label: "F"},
        { value: "P", label: "P"},
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
                options={props.data.TopicList}
                onChange={props.handleTopicChange}
                placeholder="Topic"
                isClearable={true}
                isSearchable={true}
                isDisabled={props.data.OldReview || props.data.CourseDisabled ? true : false}
                value={props.data.TopicId !== null ?
                    props.data.TopicList.filter(topic => topic.id === props.data.TopicId) : null}
            />
        </li>
    )

    return (
        <div style={{ width: "100%", backgroundColor: "#9cadb7" }}>
            <div className="container-fluid col-12 col-sm-10 col-md-8 col-lg-6 border rounded" style={{ backgroundColor: "white" }}>

                <form className="px-4 py-5" onSubmit={props.handleSubmit}>

                    <h4 className="pb-4">Let us know about your experience.</h4>

                    <ol className="px-5">
                        <li className="py-3">

                            <span >
                                Select a semester:
                            </span>

                            <Select
                                className="basic-single col-12 col-sm-10 col-md-8 mt-2"
                                classNamePrefix="select"
                                name="semester"
                                options={props.data.SemesterList}
                                onChange={props.handleSemesterChange}
                                placeholder="Semester"
                                isClearable={true}
                                isSearchable={true}
                                isDisabled={props.data.OldReview ? true : false}
                            />
                        </li>
                        <li className="py-2">

                            <span >
                                Select a course:
                            </span>

                            <Select
                                className="basic-single col-12 col-sm-10 col-md-8 mt-2"
                                classNamePrefix="select"
                                name="courseName"
                                options={props.data.CourseList}
                                onChange={props.handleCourseChange}
                                placeholder="Course"
                                isClearable={true}
                                isSearchable={true}
                                isDisabled={props.data.OldReview || props.data.CourseDisabled ? true : false}
                                value={props.data.CourseId !== null ?
                                    props.data.CourseList.filter(course => course.id === props.data.CourseId) : null}
                            />
                        </li>

                        {props.data.topicSelected ? topicSelect : null}

                        <li className="py-3" >

                            <span>
                                Select a professor:
                            </span>

                            <Select
                                className="basic-single col-12 col-sm-10 col-md-8 mt-2"
                                classNamePrefix="select"
                                name="ProfessorName"
                                options={props.data.ProfessorList}
                                onChange={props.handleProfessorChange}
                                placeholder="Professor"
                                isClearable={true}
                                isSearchable={true}
                                isDisabled={props.data.OldReview || props.data.ProfessorDisabled ? true : false}
                                value={props.data.ProfessorId !== null ?
                                    props.data.ProfessorList.filter(prof => prof.id === props.data.ProfessorId) : null}
                            />
                        </li>

                        <li className="py-3" style={disableStyle}>
                            <span>
                                Give us your review for {props.data.CourseId !== null ? props.data.CourseDept + " " + props.data.CourseNum + ':' : '...'}
                            </span>
                            <ReviewCourse {...props} />
                        </li>

                        <li className="py-3" style={disableStyle}>
                            <span>
                                Give us your review for {props.data.ProfessorId !== null ? props.data.ProfessorFirst + " " + props.data.ProfessorLast + ':' : '...'}
                            </span>
                            <ReviewProfessor {...props} />
                        </li>
                        <li className="py-3" style={disableStyle}>
                            <span>
                                (Optional) Give us the grade you obtained in {props.data.course.id !== null ? props.data.course.dept + " " + props.data.course.num + ':' : '...'}
                            </span>
                            <div className="review-grade">
                                <Select
                                    className="basic-single col-sm-10"
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
                        <input type="submit" className="btn btn-lg btn-outline-primary" value="Submit" onSubmit={props.handleSubmit} />
                    </div>
                </form>
            </div>
        </div >
    )
}

export default ReviewFormComponent