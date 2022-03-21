// // const functions = require('firebase-functions')
// // const express = require('express')
// // const cors = require('cors')
// // const stripe = require('stripe')(
// // 	'sk_test_51Keyd9SDlYEApd2WgpOSbBqDe55PToEaZuwa1QvcP2chhx7Zega1Y4ZWsUv0tAIxwORkIeaeyCOjbvU1tjjatr6o00SYCbHF1u'
// // )

// // // API

// // // - App config
// // const app = express()

// // // - Middlewares
// // app.use(cors())
// // app.use(express.json())

// // // - API routes
// // app.get('/', (request, response) => response.status(200).send('hello world'))

// // app.post('/payments/create', async (request, response) => {
// // 	const total = request.query.total

// // 	console.log('Payment Request Recieved BOOM!!! for this amount >>> ', total)

// // 	const paymentIntent = await stripe.paymentIntents.create({
// // 		amount: total, // subunits of the currency
// // 		currency: 'usd',
// // 	})

// // 	// OK - Created
// // 	response.status(201).send({
// // 		clientSecret: paymentIntent.client_secret,
// // 	})
// // })

// // // - Listen command
// // exports.api = functions.https.onRequest(app)

// // Example endpoint
// // http://localhost:5001/challenge-4b2b2/us-central1/api

// const functions = require('firebase-functions')
// const express = require('express')
// const cors = require('cors')
// const stripe = require('stripe')(
// 	'sk_test_51Keyd9SDlYEApd2WgpOSbBqDe55PToEaZuwa1QvcP2chhx7Zega1Y4ZWsUv0tAIxwORkIeaeyCOjbvU1tjjatr6o00SYCbHF1u'
// )

// const app = express()

// app.use(cors({ origin: true }))
// app.use(express.json())

// app.get('/', (req, res) => res.status(200).send('Hello World'))
// app.post('/payments/create', async (req, res) => {
// 	const { total: amount } = req.query
// 	console.log('Payment request received for this amount, ', amount)
// 	const paymentIntent = await stripe.paymentIntents.create({
// 		amount,
// 		currency: 'INR',
// 	})
// 	res.status(201).send({ clientSecret: paymentIntent.client_secret })
// })

// exports.api = functions.https.onRequest(app)
