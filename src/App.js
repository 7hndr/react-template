import logo from './images/logo.svg'
import './App.scss'
import { Calculator } from './Calculator'

export const App = () => (
	<div className='App'>
		<header className='App-header'>
			<img
				src={logo}
				className='App-logo'
				alt='logo'
			/>
			<a
				className='App-link'
				href='https://reactjs.org'
				target='_blank'
				rel='noopener noreferrer'
			>
				React docs
			</a>
		</header>
		<Calculator />
		<span className='App-copyright'>{`All rights reserved | ${new Date().getFullYear()}`}</span>
	</div>
)
