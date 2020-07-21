import React, {Component} from 'react';
import jwt_decode from 'jwt-decode'
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

class App extends Component{

	constructor(){
		super()
		const token = localStorage.usertoken
        
		let profilePic = 'default.jpg'
		if(token !== undefined || token !== null){
			const decoded = jwt_decode(token)
			profilePic = decoded.identity.profile_pic
		}
		
		this.state = {
			profilePic : profilePic
		}
		this.handleProfilePicChange = this.handleProfilePicChange.bind(this)
	}

	handleProfilePicChange(profilePic){
		this.setState({profilePic: profilePic})
	}

	render() {
		return (
			<Router>
				<div className="App">
	
					<Switch>
						<Route exact path="/" component={() => <NavBar profilePic={this.state.profilePic} showSearch="false" transparent="true"/>} />
						<Route path="/" component={() => <NavBar profilePic={this.state.profilePic} showSearch="true" transparent="false" />} />
					</Switch>
	
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/profile" render={(props) => <Profile handleProfilePicChange={this.handleProfilePicChange} />} />
						<Route path="/about" component={About} />
						<Route exact path="/results" component={Results} />
						<Route path="/add-review" render={(props) => <ReviewForm /> } />
						<Route path="/edit-review" component={ReviewForm} />
						<Route path="/confirm_email" component={ConfirmEmail}/>
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
	
}

export default App;
