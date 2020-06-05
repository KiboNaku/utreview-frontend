import React from 'react';
import NavBar from './pages/_components/NavBar'
import Footer from './pages/_components/Footer'
import Home from './pages/home/Home'
import About from './pages/about/About'
import CourseResults from './pages/results/CourseResults'
import CourseDetails from './pages/details/course/CourseDetails'
import ReviewForm from './pages/review/ReviewForm'
import Profile from './pages/profile/Profile'
import Results from './pages/results/Results'
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {

	return (
		<Router>
			<div className="App">

				<Switch>
					<Route exact path="/" component={() => <NavBar showSearch="false" transparent="true"/>} />
					<Route path="/" component={() => <NavBar showSearch="true" transparent="false" />} />
				</Switch>

				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/profile" component={Profile} />
					<Route path="/about" component={About} />
					<Route exact path="/results" component={Results} />
					<Route path="/add-review" component={ReviewForm} /> 
					<Route path={"/results/:courseId"} render={(props) => <CourseDetails />} />
				</Switch>
				<Footer />
			</div>
		</Router>

	);
}

export default App;
