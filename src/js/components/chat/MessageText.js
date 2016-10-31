import React from 'react';

const MessageText = (props) => (
	<div className="app-message__text text">			
		{props.text && props.text.trim().split('\n').map( (item, i) => (
			<p key={i + new Date().getTime()}>
				{item}
			</p>
		))}
	</div>
);

MessageText.propTypes = {
	mixClass: React.PropTypes.string,
	text: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default MessageText;
