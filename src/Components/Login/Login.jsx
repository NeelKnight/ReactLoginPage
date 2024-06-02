import React, { useState, useEffect } from 'react';
import './Login.css';
import { FaEnvelope, FaMobileAlt, FaExclamationCircle } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";

let initialState = 0;

const Login = () => {

	const [usernameVal, setUsernameVal] = useState('');

	const [usernameState, setUsernameState] = useState({
		errorState: '',
		errorDescription: '',
		iconSelector: false,
	});

	const isValidMobile = (number) => {
		if (number[0] !== '0' && number.length === 10)
			return true;
		return false;
	}

	const isValidEmail = (str) => {
		return /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str);
	}

	const validateUsername = (username) => {

		let flag;


		if (username.length === 0) {
			flag = false;
			setUsernameState(previousState => {
				return { ...previousState, errorState: 'error', errorDescription: 'Field cannot be empty!' }
			});
		}
		else {
			flag = true;
			for (let i = 0; i < username.length; i++)
				if (username.charCodeAt(i) < 48 || username.charCodeAt(i) > 57) {
					flag = false;
					break;
				}

			if (flag)
				if (isValidMobile(username))
					setUsernameState(previousState => {
						return { ...previousState, errorState: 'success', errorDescription: '' }
					});
				else
					setUsernameState(previousState => {
						return { ...previousState, errorState: 'error', errorDescription: 'Invalid mobile number provided!' }
					});
			else
				if (isValidEmail(username))
					setUsernameState(previousState => {
						return { ...previousState, errorState: 'success', errorDescription: '' }
					});
				else
					setUsernameState(previousState => {
						return { ...previousState, errorState: 'error', errorDescription: 'Invalid email address provided!' }
					});
		}

		setUsernameState(previousState => {
			return { ...previousState, iconSelector: flag }
		});

		return (usernameState.errorState === 'error') ? false : true;
	}


	useEffect(() => {
		if (initialState)
			validateUsername(usernameVal);
	}, [usernameVal]);



	const handleChange = (e) => {
		setUsernameVal(e.target.value);
		++initialState;
	}



	const validateAndSubmitForm = (e) => {
		e.preventDefault();

		if (validateUsername(usernameVal)) {
			alert("Success!!! Username entered : " + usernameVal);
			setUsernameState(previousState => {
				return { errorState: '', errorDescription: '', iconSelector: false }
			});
			setUsernameVal('');
			initialState = 0;
		}
		else {
			setUsernameState(previousState => {
				return { ...previousState, errorState: 'error', errorDescription: 'Please provide proper username!' }
			});
		}
	}



	return (
		<div className="wrapper">
			<div className="login-box">
				<form onSubmit={validateAndSubmitForm}>

					<h1>Login to Dashboard</h1>

					<div className={`${usernameState.errorState} input-box`}>
						<input type='text' name='username' placeholder='Email or Mobile Number' onChange={handleChange} value={usernameVal} required autoComplete='username' />
						<FaEnvelope style={{ display: `${usernameState.iconSelector ? 'none' : 'inline'}` }} className='input-icon' />
						<FaMobileAlt style={{ display: `${usernameState.iconSelector ? 'inline' : 'none'}` }} className='input-icon' />
						<small><FaExclamationCircle className='info-icon' />{usernameState.errorDescription}</small>
					</div>

					<button type='submit'>Next</button>

					<div className='separator'>
						<p className='p-lines'>Or</p>
					</div>

					<div className='gbutton-wrapper'>
						<FcGoogle className='input-icon'/>
						<button type='button'>Sign in With Google</button>
					</div>
					
				</form>
			</div>
		</div>
	)
}

export default Login