import React, { useState } from 'react'
import './login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'

function ResetPassword() {
	const history = useHistory()
	const [email, setEmail] = useState('')
	const [status, setStatus] = useState(undefined)

	const resetPassword = (e) => {
		e.preventDefault()

		sendPasswordResetEmail(auth, email)
			.then(
				() => {
					setStatus({ type: 'success' })
				},
				setTimeout(() => {
					history.push('/login')
				}, 5000)
			)
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
				<h1>Reset-Password</h1>
				<form action=''>
					<h5>E-mail</h5>
					<input
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{status?.type === 'success' && (
						<div className='reset__password'>
							<p>Reset password mail send to your E-mail</p>
						</div>
					)}
					{status?.type === 'error' && (
						<p>Please provide valid E-mail</p>
					)}
					<button
						type='submit'
						onClick={resetPassword}
						className='login__signInButton'
					>
						Reset Password
					</button>
				</form>
			</div>
		</div>
	)
}

export default ResetPassword
