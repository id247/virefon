import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';

class NotFound extends React.Component {

	render(){
		const { props } = this;

		return (
			<div className={( (props.mixClass ? props.mixClass : '') + ' app-404')}>

				<h1 className="app-404__title">
					Страницы не существует
				</h1>

				<div className="app-404__button-placeholder">

					<a 
						href="#/"
						className="button button--blue button--m"
					>
						Перейти на главную
					</a>
				
				</div>

			</div>
		);
	}
}

NotFound.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
});

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
