import React from 'react';
import Select from 'react-select'
import ReviewSummary from './ReviewSummary'

import jwt_decode from 'jwt-decode'
import $ from './../../../../node_modules/jquery'

class ReviewList extends React.Component {
	constructor(props) {
        super(props)
        
        let userReviews = props.reviewList.map(review => {
            return {
                ...review,
                date: new Date(review.date)
            }
        })

        const updatedReviews = userReviews.slice().sort((a, b) => b.date - a.date)
		this.state = {
			reviewList: userReviews,
			reviewsFiltered: updatedReviews,
			sortBy: "most-recent",
            profValues: [],
            courseValues: [],
            semesterValues: []
        }

        this.handleSortChange = this.handleSortChange.bind(this)
        this.handleProfChange = this.handleProfChange.bind(this)
        this.handleCourseChange = this.handleCourseChange.bind(this)
        this.handleSemesterChange = this.handleSemesterChange.bind(this)

	}	

	handleSortChange(value){
		if(value.value === "most-recent"){
			const updatedReviews = this.state.reviewsFiltered.slice().sort((a, b) => b.date - a.date)
			this.setState({reviewsFiltered: updatedReviews, sortBy: value.value})
		}else if(value.value === "semester"){
			const updatedReviews = this.state.reviewsFiltered.slice().sort((a, b) => b.semester.num - a.semester.num)
			this.setState({reviewsFiltered: updatedReviews, sortBy: value.value})
		}
	}

	handleProfChange(values){
		
        let updatedReviews = []
        let profs = []
		if(values.length === 0){
			updatedReviews = this.state.reviewList
		}else{
			for(let i = 0; i < values.length; i++){
				profs.push(values[i])
			}
			updatedReviews = this.state.reviewList.filter(review => 
                profs.includes(review.prof.firstName + " " + review.prof.lastName)
			)
        }

        console.log(profs)
        console.log(updatedReviews)

        if(this.state.courseValues.length > 0){
            updatedReviews = updatedReviews.filter(review => 
                this.state.courseValues.includes(review.course.dept.abr + " " + review.course.num)
            )
        }

        if(this.state.semesterValues.length > 0){
            updatedReviews = updatedReviews.filter(review => 
                 this.state.semesterValues.includes(review.semester.semester + " " + review.semester.year.toString())
            )
        }
        
		if(this.state.sortBy === "most-recent"){
			updatedReviews = updatedReviews.slice().sort((a, b) => b.date - a.date)
			this.setState({reviewsFiltered: updatedReviews, sortBy: "most-recent", profValues: profs})
		}else if(this.state.sortBy === "semester"){
			updatedReviews = updatedReviews.slice().sort((a, b) => b.semester.num - a.semester.num)
			this.setState({reviewsFiltered: updatedReviews, sortBy: "semester", profValues: profs})
		}
    }
    
    handleCourseChange(values){
		
        let updatedReviews = []
        let courses = []
		if(values.length === 0){
			updatedReviews = this.state.reviewList
		}else{
			for(let i = 0; i < values.length; i++){
				courses.push(values[i])
			}
			updatedReviews = this.state.reviewList.filter(review => 
                courses.includes(review.course.dept.abr + " " + review.course.num)
			)
        }

        if(this.state.profValues.length > 0){
            updatedReviews = updatedReviews.filter(review => 
                this.state.profValues.includes(review.prof.firstName + " " + review.prof.lastName)
            )
        }

        if(this.state.semesterValues.length > 0){
            updatedReviews = updatedReviews.filter(review => 
                 this.state.semesterValues.includes(review.semester.semester + " " + review.semester.year.toString())
            )
        }
        
		if(this.state.sortBy === "most-recent"){
			updatedReviews = updatedReviews.slice().sort((a, b) => b.date - a.date)
			this.setState({reviewsFiltered: updatedReviews, sortBy: "most-recent", courseValues: courses})
		}else if(this.state.sortBy === "semester"){
			updatedReviews = updatedReviews.slice().sort((a, b) => b.semester.num - a.semester.num)
			this.setState({reviewsFiltered: updatedReviews, sortBy: "semester", courseValues: courses})
		}
    }
    
    handleSemesterChange(values){
		
        let updatedReviews = []
        let semesters = []
		if(values.length === 0){
			updatedReviews = this.state.reviewList
		}else{
			for(let i = 0; i < values.length; i++){
				semesters.push(values[i])
			}
			updatedReviews = this.state.reviewList.filter(review => 
                semesters.includes(review.semester.semester + " " + review.semester.year.toString())
			)
        }

        if(this.state.courseValues.length > 0){
            updatedReviews = updatedReviews.filter(review => 
                this.state.courseValues.includes(review.course.dept.abr + " " + review.course.num)
            )
        }

        if(this.state.profValues.length > 0){
            updatedReviews = updatedReviews.filter(review => 
                 this.state.profValues.includes(review.prof.firstName + " " + review.prof.lastName)
            )
        }
        
		if(this.state.sortBy === "most-recent"){
			updatedReviews = updatedReviews.slice().sort((a, b) => b.date - a.date)
			this.setState({reviewsFiltered: updatedReviews, sortBy: "most-recent", semesterValues: semesters})
		}else if(this.state.sortBy === "semester"){
			updatedReviews = updatedReviews.slice().sort((a, b) => b.semester.num - a.semester.num)
			this.setState({reviewsFiltered: updatedReviews, sortBy: "semester", semesterValues: semesters})
		}
    }

	render() {
		console.log(this.state)
		const userReviewList = this.state.reviewsFiltered.map(review => {

				return (<ReviewSummary
                data={review}
                editReview={this.props.editReview}
                deleteReview={this.props.deleteReview}
            />
				
			)
		})

        const profs = []
		const profOptions = []
		for (let i = 0; i < this.state.reviewList.length; i++){
			let profString = this.state.reviewList[i].prof.firstName + " " + this.state.reviewList[i].prof.lastName
			if(profs.includes(profString)){
				continue
			}
			profs.push(profString)
			
			let obj = {
				value: profString,
				label: profString
			}
			profOptions.push(obj)
		}

        const courses = []
		const courseOptions = []
		for (let i = 0; i < this.state.reviewList.length; i++){
			let courseString = this.state.reviewList[i].course.dept.abr + " " + this.state.reviewList[i].course.num
			if(courses.includes(courseString)){
				continue
			}
			courses.push(courseString)
			
			let obj = {
				value: courseString,
				label: courseString
			}
			courseOptions.push(obj)
		}
        
        const semesters = []
		const semesterOptions = []
		for (let i = 0; i < this.state.reviewList.length; i++){
			let semesterString = this.state.reviewList[i].semester.semester + " " + this.state.reviewList[i].semester.year.toString()
			if(semesters.includes(semesterString)){
				continue
			}
			semesters.push(semesterString)
			
			let obj = {
				value: semesterString,
				label: semesterString
			}
			semesterOptions.push(obj)
		}

		let noReviews = (
			<h5> No reviews </h5>
		)

		let reviews = (
			<div>
				{userReviewList}
			</div>
		)

		let sortOptions = [
			{
				value: "most-recent",
				label: "Most Recent"
			},
			{
				value: "semester",
				label: "Semester"
			}
		]

		let sort = (
			<div className="review-sort">
				<label className="float-left font-weight-bold">Sort by: </label>
				<Select
					// add deptList, handleDeptChange
					className="basic-multi-select my-3 clear-both"
					classNamePrefix="select"
					name="review-sort"
					options={sortOptions}
					onChange={this.handleSortChange}
					value={sortOptions.filter(val => {
						for(let i=0; i<sortOptions.length; i++){
							if(val.value === this.state.sortBy) return true;
						}
						return false
					})}
					autosize={true}
				/>
			</div>

		)

		let profFilter = (
			<div className="review-sort">
				<label className="float-left font-weight-bold">Filter by professor: </label>
				<Select
					// add deptList, handleDeptChange
					className="basic-multi-select my-3 clear-both"
					classNamePrefix="select"
					name="review-sort"
					placeholder="All Professors"
					options={profOptions}
					onChange={(objs) => {
						let values = [];

						if (objs != null) {
							for (let i = 0; i < objs.length; i++) {
								values[i] = objs[i].value
							}
						}

						this.handleProfChange(values)
					}}
					isClearable={true}
					isSearchable={true}
					isMulti
				/>
			</div>
        )
        
        let courseFilter = (
			<div className="review-sort">
				<label className="float-left font-weight-bold">Filter by course: </label>
				<Select
					// add deptList, handleDeptChange
					className="basic-multi-select my-3 clear-both"
					classNamePrefix="select"
					name="review-sort"
					placeholder="All Courses"
					options={courseOptions}
					onChange={(objs) => {
						let values = [];

						if (objs != null) {
							for (let i = 0; i < objs.length; i++) {
								values[i] = objs[i].value
							}
						}

						this.handleCourseChange(values)
					}}
					isClearable={true}
					isSearchable={true}
					isMulti
				/>
			</div>
        )
        
        let semesterFilter = (
			<div className="review-sort">
				<label className="float-left font-weight-bold">Filter by semester: </label>
				<Select
					// add deptList, handleDeptChange
					className="basic-multi-select my-3 clear-both"
					classNamePrefix="select"
					name="review-sort"
					placeholder="All Semesters"
					options={semesterOptions}
					onChange={(objs) => {
						let values = [];

						if (objs != null) {
							for (let i = 0; i < objs.length; i++) {
								values[i] = objs[i].value
							}
						}

						this.handleSemesterChange(values)
					}}
					isClearable={true}
					isSearchable={true}
					isMulti
				/>
			</div>
		)

		return (
			<div>

                    <div className="reviews-title">
						Your Reviews ({this.state.reviewsFiltered.length})
					</div>
					<hr className='profile-divider' />

                    <div className="review-filters">
                        {sort}
                        {semesterFilter}
                    </div>
                    <div className="review-filters">
                        {courseFilter}
                        {profFilter}
                    </div>
                    <div className="profile-review-list">
                        {this.state.reviewsFiltered.length > 0 ? reviews : noReviews}
                    </div>
						
			</div>

		)
	}

}

export default ReviewList;