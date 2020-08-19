import React from 'react';
import { Switch, Route } from 'react-router';
export default (
	<Route>
		<Route path="/about"/>
		<Route path="/privacy-policy"/>
		<Route exact path="/results"/>
		<Route path="/contact-us"/>
		<Route path={"/course-results/:courseId"}/>
		<Route path={"/prof-results/:profId"}/>
		<Route path="/confirm-email"/>
		<Route path="/reset-password"/>
	</Route>
);
