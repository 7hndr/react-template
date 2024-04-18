import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getDatabase, ref } from 'firebase/database'

const firebaseConfig = {
	apiKey: 'AIzaSyAF15IY3c2MlUvvLkZHH_fjTA-9338sJMs',
	authDomain: 'react-template-df118.firebaseapp.com',
	projectId: 'react-template-df118',
	storageBucket: 'react-template-df118.appspot.com',
	messagingSenderId: '595599801416',
	appId: '1:595599801416:web:33b3ff328f7c63babb2c7d',
	measurementId: 'G-FVDDXLS74F',
	databaseURL:
		'https://react-template-df118-default-rtdb.europe-west1.firebasedatabase.app'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
export const db = getDatabase(app)

export const TABLES = {
	TODO: 'todos'
}

export const getDbRef = dbName => ref(db, `/${dbName}`)
