import React from 'react';

import MessageText from './MessageText';

const Message = (props) => (
	<div className={'app-message ' + (props.your ? 'app-message--your' : '') }>

		<div className="app-message__image-placeholder">

			<img src={props.user.photoMedium} alt="app-message" className="app-message__image" />

		</div>

		<div className="app-message__content">

			<div className="app-message__name">
				{props.user.fullName}
			</div>

			{
			props.typing
			?
			<span className="app-message__typing">Печатает...</span>
			:
			<MessageText
				text={props.text}
			/>
			}
			

		</div>

	</div>
);

Message.defaultProps = {
	your: false,
	typing: false,
	user: {},
	text: '',
};

Message.propTypes = {
	user: React.PropTypes.object.isRequired,
	text: React.PropTypes.string.isRequired,
	your: React.PropTypes.bool,
	typing: React.PropTypes.bool,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default Message;
