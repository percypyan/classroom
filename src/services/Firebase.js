import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
	apiKey: process.env.REACT_APP_GFB_API_KEY,
	authDomain: process.env.REACT_APP_GFB_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_GFB_DATABASE_URL,
	projectId: process.env.REACT_APP_GFB_PROJECT_ID,
	storageBucket: process.env.REACT_APP_GFB_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_GFB_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_GFB_APP_ID,
	measurementId: process.env.REACT_APP_GFB_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig)

export default firebase
