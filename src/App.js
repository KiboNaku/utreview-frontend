import React, {Component} from 'react';
import jwt_decode from 'jwt-decode'
import NavBar from './pages/_utils/NavBar'
import Footer from './pages/_utils/Footer'
import Home from './pages/home/Home'
import About from './pages/about/About'
import PrivacyPolicy from './pages/privacy-policy/PrivacyPolicy'
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
import ResetPassword from './pages/reset-password/ResetPassword';
import VerifyEmail from './pages/popups/VerifyEmail';
import ScrollTop from './pages/_utils/ScrollTop'
import ForgotPassword from './pages/popups/ForgotPassword';
import VerifyPassword from './pages/popups/VerifyPassword';
import NotFound from './pages/not-found/NotFound'
import ContactUs from './pages/contact-us/ContactUs';
import ReportBug from './pages/popups/ReportBug';

class App extends Component{

	constructor(){
		super()
		const token = localStorage.usertoken
        
		let profilePic = 'default.jpg'
		if(token !== undefined && token !== null){
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
					<ScrollTop/>
	
					<Switch>
						<Route exact path="/" component={() => <NavBar profilePic={this.state.profilePic} showSearch="false" transparent="true"/>} />
						<Route path="/" component={() => <NavBar profilePic={this.state.profilePic} showSearch="true" transparent="false" />} />
					</Switch>
	
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/profile" render={(props) => <Profile handleProfilePicChange={this.handleProfilePicChange} />} />
						<Route path="/about" component={About} />
						<Route path="/privacy-policy" component={PrivacyPolicy} />
						<Route exact path="/results" component={Results} />
						<Route path="/add-review" render={(props) => <ReviewForm /> } />
						<Route path="/edit-review" component={ReviewForm} />
						<Route path="/confirm_email" component={ConfirmEmail}/>
						<Route path="/reset_password" component={ResetPassword} />
						<Route path={"/course-results/:courseId"} component={CourseDetails} />
						<Route path={"/prof-results/:profId"} component={ProfDetails} />
						<Route path="/contact-us" render={ContactUs} />
						<Route component={NotFound} />
					</Switch>
					<Footer />
	
					<Login handleProfilePicChange={this.handleProfilePicChange}/>
					<Signup />
					<VerifyEmail />
					<ForgotPassword />
					<VerifyPassword />
					<ReportBug />
				</div>
			</Router>
		);
	}
	
}

export default App;
