import React from 'react';
import { GlobalContext } from '../contexts/Globals/GlobalProvider';

import TypeWriter from 'typewriter-effect';
import '../styles/Hero.css';

export default function Hero() {
	const [state, _] = React.useContext(GlobalContext);
	const greetings = [
		'<span>hi</span>.',
		'<span>bonjour</span>.',
		'<span>guten tag</span>.',
		'<span>नमस्कार</span>.',
		'<span>ನಮಸ್ಕಾರ</span>.',
	];
	return (
		<div className={'hero ' + (state.themeDark ? 'theme-dark' : 'theme-light')}>
			<div className="hero-title">
				<TypeWriter
					className="typewriter"
					options={{
						strings: greetings,
						autoStart: true,
						loop: true,
						pauseFor: 4000,
						delay: 150,
						deleteSpeed: 75,
					}}
				/>
				<span className="are">i’m</span>
				<br />
				<span>dhananjay shettigar</span>.
			</div>
			<div className="intro-para intro">
				I am a budding software developer with a passion to learn new things and deepdive
				into complex theoretical topics yet to be brought to life. Wanna chat?
			</div>
		</div>
	);
}
