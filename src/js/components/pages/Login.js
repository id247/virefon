import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';

class Login extends React.Component {

	componentWillMount(){
		const { props } = this;		
		if (props.profile){
			props.redirect('/');
		}
	}

	render(){
		const { props } = this;

		const site = location.href.indexOf('mosreg') === -1 ? 'Дневник.ру' : 'Школьный портал';

		return (
			<div className={( (props.mixClass ? props.mixClass : '') + ' app-login')}>

				<h1 className="app-login__title">
					
				</h1>

				<div className="app-login__text text">
					
					<p>
						
					</p>

				</div>

				<div className="app-login__button-placeholder">

					<Button 
						size="m"
						color="blue"
						type="button"
						onClickHandler={props.login}
					>
						Войти через {site}
					</Button>
				
				</div>

			</div>
		);
	}
}

Login.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	login: () => dispatch(asyncActions.login()),
	init: () => dispatch(asyncActions.init()), 
	redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
