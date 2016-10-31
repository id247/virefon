'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import Root from './components/Root';

const store = configureStore(); 
const appContent = document.getElementById('app-content');

if (appContent){

	ReactDOM.render(
		<Root store={store} />,
		appContent
	);

}



