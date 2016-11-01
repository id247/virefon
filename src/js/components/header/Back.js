import React from 'react';

const Back = (props) => {
	
	let link = null;

	if (props.params.theme){
		link = (<a href="#/" className="app-section__back"></a>);
	}

	return (
		link
	)
};

Back.propTypes = {	
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default Back;
