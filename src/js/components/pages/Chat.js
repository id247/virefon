import React from 'react';
import { connect } from 'react-redux';

import Message from '../../components/chat/Message';

import { DocUser } from 'appSettings';

import { firstMessages, questions, themes } from '../../settings/data.js';

class Chat extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			messages: [],
			questions: [],
			questionsStart: 0,
			docTexting: 0,
		};
	}

	componentDidMount() {
		const { props, state } = this;

		this.mounted = true;

		this._getQuestions();
		this._firstQuestion();
	}

	componentDidUpdate(prevProps, prevState){
		const { props, state } = this;

		this._scrollChatToBottom();
		
		if (props.params.theme !== prevProps.params.theme){
			this._getQuestions();
			this._firstQuestion();
		}
	}

	componentWillUnmount(){
		const { props, state } = this;

		this.mounted = false;
	}

	_scrollChatToBottom(){
		const { refs } = this;

		const chat = refs['app-chat'];

		const lastMessage = chat.querySelectorAll('.app-chat__item');

		if (lastMessage.length === 0){
			return;
		}

		chat.scrollTop = lastMessage[lastMessage.length - 1].offsetTop - 30;
	}

	_getQuestions(){

		return new Promise( (resolve, reject) => {

			setTimeout( () => {
				
				const { state, props } = this;

				this.setState({
					...state,
					...{
						questions: questions[props.params.theme] ? questions[props.params.theme] : [],
					}
				});
			
			},0);

		});
	}

	_firstQuestion(){
		const { props, state } = this;

		const text = firstMessages[props.params.theme] 
			? firstMessages[props.params.theme] 
			: 'Вы выбрали несуществующую тему';

		this._docStartTexting()
		.then( () => this._wait(2000) )
		.then( () => this._docAnswer(text) )
		.then( () => this._docStopTexting() )
		;		
	}

	_ask(questionId){
		const { state, props } = this;

		const currentQuestion = state.questions.find( question => question.id === questionId );

		this._addMessage(props.profile, currentQuestion.question)
		.then( () => this._deleteQuestion(questionId) )
		.then( () => this._wait(2000) )
		.then( () => this._docStartTexting() )
		.then( () => this._wait(3000) )
		.then( () => this._docAnswer(currentQuestion.answer) )
		.then( () => this._docStopTexting() )
		.catch( e => { console.log(e); })
		;

	}

	_wait(ms, ...rest){

		return new Promise( (resolve, reject) => {
			
			const { state, props } = this;
						
			if (!this.mounted){
				reject('Unmounted');
				return;
			}
			
			setTimeout(() => {
				resolve(...rest);
			}, ms);

		});
	}

	_docStartTexting(){

		return new Promise( (resolve, reject) => {

			setTimeout( () => {

				const { state, props } = this;

				console.log(state);
							
				if (!this.mounted){
					reject('Unmounted');
					return;
				}			
				this.setState({
					...state,
					...{
						docTexting: state.docTexting + 1,
					}
				});

				resolve();
			
			},0);

		});

	}

	_docStopTexting(){

		return new Promise( (resolve, reject) => {

			setTimeout( () => {
			
				const { state, props } = this;
							
				if (!this.mounted){
					reject('Unmounted');
					return;
				}

				this.setState({
					...state,
					...{
						docTexting: state.docTexting - 1,
					}
				});

				resolve();
			
			},0);

		});

	}

	_docAnswer(answer){

		return new Promise( (resolve, reject) => {

			setTimeout( () => {
				
				const { state, props } = this;
							
				if (!this.mounted){
					reject('Unmounted');
					return;
				}

				this._addMessage(DocUser, answer);

				resolve();
			
			},0);

		});

	}

	_addMessage(user, text){

		return new Promise( (resolve, reject) => {

			setTimeout( () => {
			
				const { state, props } = this;
							
				if (!this.mounted){
					reject('Unmounted');
					return;
				}

				const newMessages = [
					...state.messages,
					{
						user: user,
						text: text,
					}
				];

				this.setState({
					...state,
					...{
						messages: newMessages,
					}
				});

				resolve();
			
			},0);

		});

	}

	_deleteQuestion(questionId){

		return new Promise( (resolve, reject) => {

			setTimeout( () => {
				
				const { state, props } = this;
							
				if (!this.mounted){
					reject('Unmounted');
					return;
				}

				const questionIndex = state.questions.findIndex( question => question.id === questionId );

				const newQuestions = [
					...state.questions.slice(0, questionIndex),
					...state.questions.slice(questionIndex + 1)
				];

				const newQuestionsStart = state.questionsStart > 0 ? state.questionsStart - 1 : 0;
				
				this.setState({
					...state,
					...{
						questions: newQuestions,
						questionsStart: newQuestionsStart,
					}
				});

				resolve();
			
			},0);

		});
	}

	_changeQuestions(){

		const { state, props } = this;

		const newQuestionsStart = state.questionsStart + 3 < state.questions.length ? state.questionsStart + 3 : 0;

		console.log(newQuestionsStart);
		console.log(state.questionsStart, state.questions.length);
			
		this.setState({
			...state,
			...{
				questionsStart: newQuestionsStart,
			}
		});

	}

	_askHandler = (questionId) => (e) =>{
		e.preventDefault();

		this._ask(questionId);
	}

	_changeQuestionsHandler = () => (e) =>{
		e.preventDefault();

		this._changeQuestions();
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
											typing={message.typing}
											your={your}
										/>
									</li>
								);
							})}

							{
							state.docTexting > 0
							?
							(
							<li 
								className={'app-chat__item'} 
							>
								<Message
									user={DocUser}
									text={' '}
									typing={true}
								/>
							</li>
							)
							:
							null
							}

						</ul>

					</div>

				</div>

				<div className="app-inner__questions">

					<div className="app-questions">

						<ul className="app-questions__list">

							{
							state.questions.length > 0
							?
							(							

							state.questions
								.slice(state.questionsStart, state.questionsStart + 3)
								.map( (question, i) =>(

							<li className="app-questions__item" key={'questions-item' + question.id}>

								<button className="app-questions__button button button button--blue"
									onClick={this._askHandler(question.id)}
								>

									<span className="app-questions__button-inner">
										{question.question}
									</span>

								</button>

							</li>

							))

							)
							:
							(													

							themes
								.filter( theme => theme.url !== props.params.theme )
								.map( (theme, i) =>(

							<li className="app-questions__item" key={'questions-item' + theme.url}>

								<a className="app-questions__button button button button--blue"
									href={'#/theme/' + theme.url}
								>

									<span className="app-questions__button-inner">
										{theme.title}
									</span>

								</a>

							</li>
							))

							)
							}

						</ul>


						<div className="app-questions__more-placeholder">
						{
						state.questions.length > 3
						?
						(
							<button 
								className="app-questions__more button button--orange button--m"
								onClick={this._changeQuestionsHandler()}
							>Еще вопросы</button>

						)
						:
						(
							<a href="#/" 
								className="app-questions__more button button--orange button--m"
							>Вернуться назад</a>
						)
						}
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
