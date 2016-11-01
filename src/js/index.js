'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import Root from './components/Root';
import RootTitle from './components/RootTitle';
import RootBack from './components/RootBack';

const store = configureStore(); 
const appContent = document.getElementById('app-content');
const appTitle = document.getElementById('app-title');
const appBack = document.getElementById('app-back');

if (appContent){

	ReactDOM.render(
		<Root store={store} />,
		appContent
	);

}
if (appTitle){

	ReactDOM.render(
		<RootTitle store={store} />,
		appTitle
	);

}
if (appBack){

	ReactDOM.render(
		<RootBack store={store} />,
		appBack
	);

}



