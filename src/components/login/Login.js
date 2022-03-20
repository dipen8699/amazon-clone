import React, { useState } from 'react'
import './login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase'
import {
	signInWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth'

function Login() {
	const history = useHistory()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [status, setStatus] = useState(undefined)

	const signIn = (e) => {
		e.preventDefault()
		signInWithEmailAndPassword(auth, email, password)
			.then((auth) => {
				if (auth.user.emailVerified === true) {
					history.push('/')
				} else {
					sendEmailVerification(auth.user)
					setStatus({ type: 'success' })
				}
			})
			.catch((error) => setStatus({ type: 'error', error }))
	}

	return (
		<div className='login'>
			<Link to='/'>
				<img
					className='login__logo'
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
					alt=''
				/>
			</Link>
			<div className='login__container'>
				<h1>Sign-in</h1>
				<form action=''>
					<h5>E-mail</h5>
					<input
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<h5>Password</h5>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button
						type='submit'
						onClick={signIn}
						className='login__signInButton'
					>
						Sign In
					</button>
					<Link to='/forgot-password'>
						<p className='login__forgotPassword'>Forgot password</p>
					</Link>
					<Link to='/reset-password'>
						<p className='login__resetpassword'>Reset password</p>
					</Link>
				</form>
				<p>
					By signing-in you agree to the AMAZON FAKE CLONE Conditions
					of Use & Sale. Please see our Privacy Notice, our Cookies
					Notice and our Interest-Based Ads Notice.
				</p>
				<Link to='/register'>
					<button className='login__registerButton'>
						Create Your Amazon Account
					</button>
				</Link>
				{status?.type === 'success' && (
					<div className='verify__email'>
						<p>Verify mail send to your E-mail</p>
					</div>
				)}
				{status?.type === 'error' && <p>Please provide valid E-mail</p>}
			</div>
		</div>
	)
}

export default Login
