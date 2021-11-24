import React from 'react';
import { GlobalContext } from '../contexts/Globals/GlobalProvider';

import '../styles/App.css';
import Hero from './Hero';

function App() {
	const [state, _] = React.useContext(GlobalContext);
	return (
		<div className={'App ' + (state.themeDark ? 'theme-dark' : 'theme-light')}>
			<Hero />
		</div>
	);
}

export default App;
