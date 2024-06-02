import './App.css';
import Login from './Components/Login/Login';

function App() {
	return (

		<div className='page-wrapper'>
			<div className='central-viewport'> 
				<footer>
					<p> [ Author: Ishanneel Chaudhuri ] <br />
						Need SWE tasks done? <a href="mailto:neel.knight7@gmail.com">Hire me!</a>
					</p>
				</footer>
			</div>
			<div className='login-viewport'> 
				<Login />
				<footer>
					<p>Powered by <span>🗲</span> ReactJS, Facebook <br /> "ReactJS: where <span>Possibilities</span> amplify, <span>UI Experiences</span> we simplify"</p>
				</footer>
			</div>
		</div>

	);
}

export default App;
