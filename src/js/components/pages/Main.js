import React from 'react';
import { connect } from 'react-redux';

import Message from '../../components/chat/Message';
import { DocUser } from 'appSettings';

import { themes } from '../../settings/data.js';

class Main extends React.Component {

	render(){

		return(
			<div className="app-main">

				<div className="app-main__message">

					<Message
						user={DocUser}
						text={(`
							Здравствуйте! Я Ваш персональный врач-консультант по вопросам здоровья. Рад приветствовать Вас в своей виртуальной приёмной.
									
							Выберите тему, которую Вы хотели бы обсудить со мной.
						`)}
					/>

				</div>

				<ul className="app-main__list">

					{themes.map( (theme, i) => (

					<li className="app-main__item" key={'theme' + i}>

						<a 
							href={'#/theme/' + theme.url}
							className="app-main__href button button--orange button--m"
						>
							{theme.title}
						</a>

					</li>

					))}

				</ul>

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	//profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	//logout: () => dispatch(asyncActions.logout()),
});

Main.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
