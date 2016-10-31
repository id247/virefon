import React from 'react';
import { connect } from 'react-redux';

import Message from '../../components/chat/Message';

import { DocUser } from 'appSettings';



class Chat extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			messages: [
				{
					user: DocUser,
					text: (`
						Здравствуйте! Я Ваш персональный врач-консультант по вопросам здоровья. Рад приветствовать Вас в своей виртуальной приёмной.
				
						Выберите тему, которую Вы хотели бы обсудить со мной.
					`),
				},
				{
					user: props.profile,
					text: (`
						В семье болеют взрослые. Как обезопасить ребёнка?
					`),
				},
			],
		};
	}

	componentDidMount() {
		const { props } = this;
		this._scrollChatToBottom();
	}

	componentDidUpdate(){
		this._scrollChatToBottom();
	}

	_scrollChatToBottom(){
		const { refs } = this;

		refs['app-chat'].scrollTop = refs['app-chat'].scrollHeight;
	}

	_ask(){
		const { state, props, setState } = this;

		const newMessages = [
			...state.messages,
			{
				user: props.profile,
				text: 'Пора домой!',
			}
		];

		console.log(newMessages);
		
		this.setState({
			...state,
			...{
				messages: newMessages,
			}
		});
	}

	_askHandler = () => (e) =>{
		e.preventDefault();

		this._ask();
	}

	render(){
		const { props, state } = this;

		return(
			<div className="app-inner">

				<div className="app-inner__chat">

					<div className="app-chat" ref="app-chat">

						<ul className="app-chat__list">

							{state.messages.map( (message, i) => {
								const your = (message.user.id === props.profile.id);

								return(
									<li 
										className={ 'app-chat__item ' + (your ? 'app-chat__item--your' : '') } 
										key={'chat-item' + i}
									>
										<Message
											user={message.user}
											text={message.text}
											your={your}
										/>
									</li>
								);
							})}

						</ul>

					</div>

				</div>

				<div className="app-inner__questions">

					<div className="app-questions">

						<ul className="app-questions__list">

							<li className="app-questions__item">

								<button className="app-questions__button button button button--blue"
									onClick={this._askHandler()}
								>

									<span className="app-questions__button-inner">
										В семье болеют взрослые. Как обезопасить ребёнка?
									</span>

								</button>

							</li>

							<li className="app-questions__item">

								<button className="app-questions__button button button--blue">

									<span className="app-questions__button-inner">
										Когда формируется иммунитет ребёнка и от каких факторов этого зависит?
									</span>

								</button>

							</li>

							<li className="app-questions__item">

								<button className="app-questions__button button button button--blue">

									<span className="app-questions__button-inner">
										Какие меры можно принять для профилактики в период подъема эпидемий ОРВИ и гриппа?
									</span>

								</button>

							</li>

						</ul>

						<div className="app-questions__more-placeholder">

							<button className="app-questions__more button button--orange button--m">Еще вопросы</button>

						</div>

					</div>

				</div>

			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

Chat.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
