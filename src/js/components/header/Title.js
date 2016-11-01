import React from 'react';

const Title = (props) => {
	
	let title = null;

	switch(props.params.theme){
		case 'prevention':
			title = (<span>Профилактика гриппа и ОРВИ</span>);
			break;
		case 'treatment':
			title = (<span>Лечение гриппа и ОРВИ</span>);
			break;
		case 'viferon':
			title = (<span>Применение препарата Виферон у детей</span>);
			break;
		default: 
			title = (<span>Чат с виртуальным помощником</span>);
	}

	return (
		title
	)
};

Title.propTypes = {	
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default Title;
