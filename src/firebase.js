// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCP-UA3_MK6mVezrhoP4VaR0w2giliVjIY',
	authDomain: 'clone-f6123.firebaseapp.com',
	projectId: 'clone-f6123',
	storageBucket: 'clone-f6123.appspot.com',
	messagingSenderId: '806608370166',
	appId: '1:806608370166:web:f3286d1752aeaddcf32fd7',
	measurementId: 'G-V9282D34DL',
}
const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }
