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

	componentDidMount() {
        if (localStorage.getItem("logout-message")) {
            $("#toast-logout-success").toast("show")
            localStorage.removeItem("logout-message")
        }
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

		let mainPageDescription = `Find your class. Plan your schedule. Leave a review. What starts here changes your course schedule. Make the most informed decision at University of Texas at Austin. It all starts here at UT Review.`
		let profilePageDescription = `View your user information and manage your reviews using the profile page at UT Review.`
		let aboutPageDescription = `Learn more about UT Review and the team! UT Review is a course planning website made for UT students, by UT students. 
		We've been through and understand the struggles of choosing courses/professors every semester and we want to make this process easier for everyone. 
		Here at UT Review, you can find everything you need to make more informed course planning decisions, from grade distributions to pre-requisites to other students' opinions.`
		let privacyPolicyPageDescription = `Learn more about UT Review's privacy policy and practices, such as the information we collect, how we use this information, the third-party services we use, and the information security.`
		let resultsPageDescription = `Look up your course and professor in UT Review's database with thousands of UT courses and professors. 
		Start here to make the most of your time at UT Austin.`
		let addReviewPageDescription = `Have an opinion about a course or professor at UT Austin? 
		Leave a review here at UT Review to tell the community your opinion. 
		Let us know if a course is a blow-off or warn us about the deadly ones. 
		Talk to us about your professors too! Had bad ones? Roast them. The ones you loved? Hype them up.`
		let editReviewPageDescription = `Had an oopsie while leaving a review at UT Review? No worries! 
		You can wipe away any mistakes you made and update your review here!`
		let confirmEmailPageDescription = `Want to sign up at UT Review? You're almost finished! 
		Once your email is confirmed, you are free to leave reviews, like/dislike comments, and more!`
		let resetPasswordPageDescription = `Is the old password not working for you anymore at UT Review? No worries! 
		Update your password here once you have requested for password reset!`
		let createPasswordPageDescription = `Didn't make a password on initial signup at UT review? Well now you can add a password here!`
		let defaultCourseDetailsPageDescription = `Want to learn more about a specific course at UT Austin? 
		On this UT Review page, you can get the grade distributions, compare the professors, and read the reviews.`
		let defaultProfDetailsPageDescription = `Want to learn more about a specific professor at UT Austin? \
		On this UT Review page, you can get the grade distributions, see the courses they teach, and read the reviews.`
		let contactUsPageDescription = `Have questions or suggestions? Send the UT Review team an email here and let us know what you think about our work.`
		let notFoundPageDescription = `Oopsies! If you are on this page, then the url you are looking for does not exist at UT Review.`

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
								<Home title={mainPageTitle} description={mainPageDescription} />
							}
						/>
						<Route
							path="/profile"
							render={(props) =>
								<Profile title={profilePageTitle} mainTitle={mainPageTitle} description={profilePageDescription}
									handleProfilePicChange={this.handleProfilePicChange} />
							}
						/>
						<Route
							path="/about"
							component={() =>
								<About title={aboutPageTitle} mainTitle={mainPageTitle} description={aboutPageDescription} />
							}
						/>
						<Route
							path="/privacy-policy"
							component={() =>
								<PrivacyPolicy title={privacyPolicyPageTitle} mainTitle={mainPageTitle} description={privacyPolicyPageDescription} />
							}
						/>
						<Route
							exact path="/results"
							render={(props) =>
								<Results title={resultsPageTitle} mainTitle={mainPageTitle} description={resultsPageDescription}
									handleSearchValueChange={this.handleSearchValueChange} />
							}
						/>
						<Route
							path="/add-review"
							render={(props) =>
								<ReviewForm title={addReviewPageTitle} mainTitle={mainPageTitle} description={addReviewPageDescription} />
							}
						/>
						<Route
							path="/edit-review"
							component={() =>
								<ReviewForm title={editReviewPageTitle} mainTitle={mainPageTitle} description={editReviewPageDescription} />
							}
						/>
						<Route
							path="/confirm-email"
							component={() =>
								<ConfirmEmail title={confirmEmailPageTitle} mainTitle={mainPageTitle} description={confirmEmailPageDescription} />
							}
						/>
						<Route
							path="/reset-password"
							component={() =>
								<ResetPassword title={resetPasswordPageTitle} mainTitle={mainPageTitle} description={resetPasswordPageDescription} />
							}
						/>
						<Route
							path="/create-password"
							component={() =>
								<ResetPassword title={createPasswordPageTitle} mainTitle={mainPageTitle} description={createPasswordPageDescription} />
							}
						/>
						<Route
							path={"/course-results/:courseId"}
							component={() =>
								<CourseDetails title={defaultCourseDetailsPageTitle} mainTitle={mainPageTitle} description={defaultCourseDetailsPageDescription}
									notFoundPageTitle={notFoundPageTitle} notFoundPageDescription={notFoundPageDescription} />
							}
						/>
						<Route
							path={"/prof-results/:profId"}
							component={() =>
								<ProfDetails title={defaultProfDetailsPageTitle} mainTitle={mainPageTitle} description={defaultProfDetailsPageDescription}
									notFoundPageTitle={notFoundPageTitle} notFoundPageDescription={notFoundPageDescription} />
							}
						/>
						<Route
							path="/contact-us"
							render={() =>
								<ContactUs title={contactUsPageTitle} mainTitle={mainPageTitle} description={contactUsPageDescription} />
							}
						/>
						<Route
							component={() =>
								<NotFound title={notFoundPageTitle} mainTitle={mainPageTitle} description={notFoundPageDescription} />
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
