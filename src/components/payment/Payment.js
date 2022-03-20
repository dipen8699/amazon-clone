import React, { useEffect, useState } from 'react'
import './payment.css'
import axios from '../../axios'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../StateProvider'
import { CheckoutProduct } from '../index'
import { getBasketTotal, getTotalProduct } from '../../reducer'
import { Link } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useHistory } from 'react-router-dom'
import { db } from '../../firebase'
import { collection, getDoc, doc, setDoc } from 'firebase/firestore'

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue()
	const history = useHistory()

	const stripe = useStripe()
	const elements = useElements()

	const [succeeded, setSucceeded] = useState(false)
	const [processing, setProcessing] = useState('')
	const [error, setError] = useState(null)
	const [disabled, setDisabled] = useState(true)
	const [clientSecret, setClientSecret] = useState('')
	const [paymentOption, setPaymentOption] = useState('Card')

	const onRadioChange = (e) => {
		setPaymentOption(e.target.value)
	}

	useEffect(() => {
		const getClientSecret = async () => {
			const response =
				basket &&
				(await axios({
					method: 'post',
					url: `/payments/create?total=${parseInt(
						getBasketTotal(basket) * 100
					)}`,
				}))
			setClientSecret(response.data.clientSecret)
		}
		getClientSecret()
	}, [basket])

	console.log('THE SECRET IS >>>', clientSecret)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setProcessing(true)

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(async ({ paymentIntent }) => {
				// paymentIntent = payment confirmation

				const colRef = doc(
					db,
					'Users',
					user?.uid,
					'orders',
					paymentIntent.id
				)
				const gameSnap = await getDoc(colRef)
				const game = gameSnap.data()
				setDoc(
					colRef,
					{
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					},
					{ merge: true }
				)
				setSucceeded(true)
				setError(null)
				setProcessing(false)

				dispatch({
					type: 'EMPTY_BASKET',
				})

				history.replace('/')
			})
	}

	const handleChange = (event) => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		setDisabled(event.empty)
		setError(event.error ? event.error.message : '')
	}

	return (
		<div className='payment'>
			<div className='payment__container'>
				<h1>
					Checkout (<Link to='/checkout'>{basket?.length} items</Link>
					)
				</h1>

				{/* Payment section - delivery address */}
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Delivery Address</h3>
					</div>
					<div className='payment__address'>
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>Los Angeles, CA</p>
					</div>
				</div>

				{/* Payment section - Review Items */}
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Review items and delivery</h3>
					</div>
					<div className='payment__items'>
						{basket.map((item) => (
							<CheckoutProduct
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))}
					</div>
				</div>

				{/* Payment section - Payment method */}
				<div className='payment__section'>
					<div className='payment__title'>
						<h3>Payment Method</h3>
					</div>
					<div>
						<input
							type='radio'
							value='Card'
							checked={paymentOption === 'Card'}
							onChange={onRadioChange}
							name='Card'
						/>
						Card Payment
						<input
							type='radio'
							value='Crypto'
							checked={paymentOption === 'Crypto'}
							onChange={onRadioChange}
							name='Crypto'
						/>
						Crypto Payment
					</div>
					<div className='payment__details'>
						{/* Stripe magic will go */}

						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />

							<div className='payment__priceContainer'>
								<CurrencyFormat
									renderText={(value) => (
										<h3>Order Total: {value}</h3>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
								/>
								<button
									disabled={
										!user ||
										processing ||
										disabled ||
										succeeded ||
										!getBasketTotal(basket)
									}
								>
									<span>
										{processing ? (
											<p>Processing</p>
										) : (
											'Buy Now'
										)}
									</span>
								</button>
							</div>

							{/* Errors */}
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Payment
