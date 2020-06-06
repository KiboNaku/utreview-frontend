import React from 'react'
import Select from 'react-select'
import ReviewCourse from './ReviewCourse'
import ReviewProfessor from './ReviewProfessor'
import './../ReviewForm.css'

function ReviewFormComponent(props) {
    let disableStyle = (props.data.Disable? {
        pointerEvents: "none", 
        opacity: "0.4"
    } : {})

    return (
        <div style={{ width: "100%", backgroundColor: "#9cadb7" }}>
            <div className="container-fluid col-12 col-sm-10 col-md-8 col-lg-6 border rounded" style={{ backgroundColor: "white" }}>

                <form className="px-4 py-5" onSubmit={props.handleSubmit}>

                    <h4 className="pb-4">Let us know about your experience.</h4>

                    <ol className="px-5">

                        <li className="py-2">

                            <span >
                                Choose your course:
                            </span>

                            <Select
                                className="basic-single col-12 col-sm-10 col-md-8 mt-2"
                                classNamePrefix="select"
                                name="courseNumber"
                                options={props.data.courseNumList}
                                onChange={props.handleCourseNumberChange}
                                placeholder="Course"
                                isClearable={true}
                                isSearchable={true}
                            />
                        </li>

                        <li className="py-3" >

                            <span>
                                Choose your professor:
                            </span>

                            <Select
                                className="basic-single col-12 col-sm-10 col-md-8 mt-2"
                                classNamePrefix="select"
                                name="ProfessorName"
                                options={props.data.professorNameList}
                                onChange={props.handleProfessorNameChange}
                                placeholder="Professor"
                                isClearable={true}
                                isSearchable={true}
                            />
                        </li>

                        <li className="py-3" style={disableStyle}>
                            <span>
                                Give us your review for {props.data.CourseNumber !== '' ? props.data.CourseNumber+':' : '...'}
                            </span>
                            <ReviewCourse {...props} />
                        </li>

                        <li className="py-3" style={disableStyle}>
                            <span>
                                Give us your review for {props.data.ProfessorName !== '' ? props.data.ProfessorName+':' : '...'}
                            </span>
                            <ReviewProfessor {...props} />
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