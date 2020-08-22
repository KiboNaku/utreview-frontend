import React, { Component } from 'react';
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
import $ from './../node_modules/jquery'
import ConfirmEmail from './pages/confirm-email/ConfirmEmail';
import ResetPassword from './pages/reset-password/ResetPassword';
import VerifyEmail from './pages/popups/VerifyEmail';
import ScrollTop from './pages/_utils/ScrollTop'
import Toast from './pages/_utils/Toast'
import ForgotPassword from './pages/popups/ForgotPassword';
import VerifyPassword from './pages/popups/VerifyPassword';
import VerifyNewPassword from './pages/popups/VerifyNewPassword';
import NotFound from './pages/not-found/NotFound'
import ContactUs from './pages/contact-us/ContactUs';
import ReportBug from './pages/popups/ReportBug';
import CompleteProfile from './pages/popups/CompleteProfile';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory'
import axios from 'axios'

const history = createHistory()
ReactGA.initialize('UA-175608532-1');
history.listen((location, action) => {
	ReactGA.pageview(location.pathname + location.search);
});


class App extends Component {

	constructor() {
		super()
		const token = localStorage.usertoken

		let profilePic = 'corgi1.jpg'
		if (token !== undefined && token !== null) {
			// get token 
			try {
				const decoded = jwt_decode(token)
				axios
					.post('/api/refresh_user_token', {
						email: decoded.identity.email
					})
					.then(response => {
						localStorage.removeItem("usertoken")
						localStorage.setItem('usertoken', response.data.token)
					})
				profilePic = decoded.identity.profile_pic
			} catch (err) {
				localStorage.removeItem("usertoken")
			}


		}

		window.onpopstate = e => {
			$('.modal').modal('hide')
		}

		this.state = {
			profilePic: profilePic,
			searchValue: '',
		}
		this.handleProfilePicChange = this.handleProfilePicChange.bind(this)
		this.handleSearchValueChange = this.handleSearchValueChange.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}

	handleLogin() {
		$("#toast-login-success").toast("show")
	}

	handleProfilePicChange(profilePic) {
		this.setState({ profilePic: profilePic })
	}

	handleSearchValueChange(searchValue) {
		this.setState({ searchValue: searchValue })
	}

	render() {
		let mainPageTitle = "UT Review"
		let profilePageTitle = "Profile"
		let aboutPageTitle = "About"
		let privacyPolicyPageTitle = "Privacy Policy"
		let resultsPageTitle = "Search Results"
		let addReviewPageTitle = "Add Review"
		let editReviewPageTitle = "Edit Review"
		let confirmEmailPageTitle = "Confirm Email"
		let resetPasswordPageTitle = "Reset Password"
		let createPasswordPageTitle = "Create Password"
		let defaultCourseDetailsPageTitle = "Course Details"
		let defaultProfDetailsPageTitle = "Professor Details"
		let contactUsPageTitle = "Contact Us"
		let notFoundPageTitle = "Not Found"

		return (
			<Router history={history}>
				<div className="App">
					<ScrollTop />

					<Switch>
						<Route exact path="/" component={() => <NavBar profilePic={this.state.profilePic} searchValue={this.state.searchValue} showSearch="false" transparent="true" />} />
						<Route path="/" component={() => <NavBar profilePic={this.state.profilePic} searchValue={this.state.searchValue} showSearch="true" transparent="false" />} />
					</Switch>

					<Switch>
						<Route
							exact path="/"
							component={() =>
								<Home title={mainPageTitle} />
							}
						/>
						<Route
							path="/profile"
							render={(props) =>
								<Profile title={profilePageTitle} mainTitle={mainPageTitle} handleProfilePicChange={this.handleProfilePicChange} />
							}
						/>
						<Route
							path="/about"
							component={() =>
								<About title={aboutPageTitle} mainTitle={mainPageTitle} />
							}
						/>
						<Route
							path="/privacy-policy"
							component={() =>
								<PrivacyPolicy title={privacyPolicyPageTitle} mainTitle={mainPageTitle} />
							}
						/>
						<Route
							exact path="/results"
							render={(props) =>
								<Results title={resultsPageTitle} mainTitle={mainPageTitle} handleSearchValueChange={this.handleSearchValueChange} />
							}
						/>
						<Route
							path="/add-review"
							render={(props) =>
								<ReviewForm title={addReviewPageTitle} mainTitle={mainPageTitle} />
							}
						/>
						<Route
							path="/edit-review"
							component={() =>
								<ReviewForm title={editReviewPageTitle} mainTitle={mainPageTitle} />
							}
						/>
						<Route
							path="/confirm-email"
							component={() =>
								<ConfirmEmail title={confirmEmailPageTitle} mainTitle={mainPageTitle} />
							}
						/>
						<Route
							path="/reset-password"
							component={() =>
								<ResetPassword title={resetPasswordPageTitle} mainTitle={mainPageTitle} />
							}
						/>
						<Route
							path="/create-password"
							component={() =>
								<ResetPassword title={createPasswordPageTitle} mainTitle={mainPageTitle} />
							}
						/>
						<Route
							path={"/course-results/:courseId"}
							component={() =>
								<CourseDetails title={defaultCourseDetailsPageTitle} mainTitle={mainPageTitle} />
							}
						/>
						<Route
							path={"/prof-results/:profId"}
							component={() =>
								<ProfDetails title={defaultProfDetailsPageTitle} mainTitle={mainPageTitle} />
							}
						/>
						<Route
							path="/contact-us"
							render={() =>
								<ContactUs title={contactUsPageTitle} mainTitle={mainPageTitle} />
							}
						/>
						<Route
							component={() =>
								<NotFound title={notFoundPageTitle} mainTitle={mainPageTitle} />
							}
						/>
					</Switch>
					<Footer />

					<Login handleLogin={this.handleLogin} handleProfilePicChange={this.handleProfilePicChange} />
					<Signup />
					<VerifyEmail />
					<ForgotPassword />
					<VerifyPassword />
					<VerifyNewPassword />
					<ReportBug />
					<CompleteProfile />

				</div>
			</Router>
		);
	}

}

export default App;
