import React from 'react';
import ReactDOM from 'react-dom';
import AppTestAndy from './AppTestAndy';
import AppTestIris from './AppTestIris';
import * as serviceWorker from './serviceWorker';
// hello

ReactDOM.render(
	<React.StrictMode>
		<AppTestIris />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
