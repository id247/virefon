import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Title 		from '../components/header/Title';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={Title} />	
		<Route path="/:theme" component={Title} />	
	</Router>
);

class RootTitle extends React.Component {

	render() {		
		return (
			<Provider store={this.props.store}>		
				{routes}
			</Provider>
		);
	}
}

export default RootTitle;

