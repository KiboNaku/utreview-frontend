import axios from 'axios'

export const getCourses = (info) => {
    return axios
        .post('/api/get_courses', {
            semesterId: info.semesterId,
            all: info.all
        })
        .then(response => {
            return response.data
        })
}

export const getTopics = (info) => {
    return axios
        .post('/api/get_topics', {
            topicId: info.topicId
        })
        .then(response => {
            return response.data
        })
}

export const getProfs = (info) => {
    return axios
        .post('/api/get_profs', {
            semesterId: info.semesterId,
            courseId: info.courseId,
            all: info.all
        })
        .then((response) => {
            return response.data
        });
}

export const getSemesters = () => {
    return axios
        .get('/api/get_semesters')
        .then((response) => {
            return response.data
        });
}

export const getCourseId = (course) => {
    return axios
        .post('/api/course_id', {
            courseString: course.courseString
        })
        .then(response => {
            return response.data
        })
}

export const getProfId = (prof) => {
    return axios
        .post('/api/prof_id', {
            profString: prof.profString
        })
        .then(response => {
            return response.data
        })
}