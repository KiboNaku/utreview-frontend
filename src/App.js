import React from 'react';
import NavBar from './pages/_utils/NavBar'
import Footer from './pages/_utils/Footer'
import Home from './pages/home/Home'
import About from './pages/about/About'
import CourseDetails from './pages/details/CourseDetails'
import ProfDetails from './pages/details/ProfDetails'
import ReviewForm from './pages/review/ReviewForm'
import Profile from './pages/profile/Profile'
import Results from './pages/results/Results'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/popups/Login'
import Signup from './pages/popups/Signup'
import "./App.css"
import ConfirmEmail from './pages/confirm-email/ConfirmEmail';
import VerifyEmail from './pages/popups/VerifyEmail';
import ScrollTop from './pages/_utils/ScrollTop'

function App() {

	return (
		<Router>
			<div className="App">
				<ScrollTop/>
				<Switch>
					<Route exact path="/" component={() => <NavBar showSearch="false" transparent="true" />} />
					<Route path="/" component={() => <NavBar showSearch="true" transparent="false" />} />
				</Switch>

				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/profile" component={Profile} />
					<Route path="/about" component={About} />
					<Route exact path="/results" component={Results} />
					<Route path="/add-review" render={(props) => <ReviewForm />} />
					<Route path="/edit-review" component={ReviewForm} />
					<Route path="/confirm_email" component={ConfirmEmail} />
					<Route path={"/course-results/:courseId"} render={(props) => <CourseDetails />} />
					<Route path={"/prof-results/:profId"} render={(props) => <ProfDetails />} />
				</Switch>
				<Footer />

				<Login />
				<Signup />
				<VerifyEmail />
			</div>
		</Router>
	);
}

export default App;
