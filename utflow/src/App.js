import React from 'react';
import NavBar from './pages/_components/NavBar'
import Home from './pages/home/Home'
import Popup from './pages/popups/Popup'
import {Link, Route, Switch} from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<NavBar showSearch="false"/>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component ={Popup} />
			</Switch>
		</div>
	);
}

export default App;
