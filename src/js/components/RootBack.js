import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Back 		from '../components/header/Back';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={Back} />	
		<Route path="/:theme" component={Back} />	
	</Router>
);

class RootBack extends React.Component {

	render() {		
		return (
			<Provider store={this.props.store}>		
				{routes}
			</Provider>
		);
	}
}

export default RootBack;
