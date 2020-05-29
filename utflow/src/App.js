import React from 'react';
import NavBar from './pages/_components/NavBar'
import Footer from './pages/_components/Footer'
import Home from './pages/home/Home'
import Popup from './pages/popups/Popup'
import About from './pages/about/About'
import CourseResults from './pages/results/CourseResults'
import CourseDetails from './pages/details/course/CourseDetails'
import ReviewForm from './pages/review/ReviewForm'
import {Link, Route, Switch} from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<NavBar showSearch="false"/>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component ={Popup} />
				<Route path="/about" component ={About} />
				<Route exact path="/course-results" component ={CourseResults}/>
				<Route path={"/course-results/:courseId"}
					render={(props) => <CourseDetails />} />
				<Route path="/add-review" component = {ReviewForm} />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
