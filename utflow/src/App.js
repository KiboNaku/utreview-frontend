import React from 'react';
import NavBar from './pages/_components/NavBar'
import Footer from './pages/_components/Footer'
import Home from './pages/home/Home'
import Popup from './pages/popups/Popup'
import About from './pages/about/About'
import CourseResults from './pages/results/CourseResults'
import CourseDetails from './pages/details/course/CourseDetails'
import ReviewForm from './pages/review/ReviewForm'
import Login from './pages/popups/admission/Login'
import Signup from './pages/popups/admission/Signup'
import Profile from './pages/profile/Profile'
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="App">
				<NavBar showSearch="true" />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/profile" component={Profile} />
					<Route path="/about" component={About} />
					<Route exact path="/course-results" component={CourseResults} />
					<Route path={"/course-results/:courseNum"}
						render={(props) => <CourseDetails />} />
					<Route path="/add-review" component={ReviewForm} />
				</Switch>
				<Footer />
			</div>
		</Router>

	);
}

export default App;
