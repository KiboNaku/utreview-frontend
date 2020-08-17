import React from 'react';
import { Switch, Route } from 'react-router';
export default (
	<Route>
		<Route exact path="/" />
		<Route path="/profile" />
		<Route path="/about" />
		<Route path="/privacy-policy" />
		<Route exact path="/results" />
		<Route path="/add-review" />
		<Route path="/edit-review" />
		<Route path="/confirm_email" />
		<Route path="/reset_password" />
		<Route path={"/course-results/:courseId"} />
		<Route path={"/prof-results/:profId"} />
		<Route path="/contact-us" />
	</Route>
);