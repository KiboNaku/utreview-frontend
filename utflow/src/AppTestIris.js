import React from 'react';
import CourseDetails from './pages/details/course/CourseDetails'
import NavBar from './pages/_components/NavBar'
import './App.css';

class AppTestIris extends React.Component {

    render(){
        return (
            <div>
                <NavBar showSearch="true"/>
                <CourseDetails />
            </div>
        );
    }
  
}

export default AppTestIris;