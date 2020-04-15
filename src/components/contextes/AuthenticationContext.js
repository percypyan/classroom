import React, { useState } from "react"

import Firebase from "../../services/Firebase"
import ObjectUtils from "../../services/ObjectUtils"

const Teachers = Firebase.firestore().collection("teachers")
const Students = Firebase.firestore().collection("students")

const AuthenticationContext = React.createContext(null)

async function loadUser(user) {
	const teacherQuery = Teachers.where("userID", "==", user.uid)
	const teacherResult = await teacherQuery.get()
	if (!teacherResult.empty) {
		return { teacher: teacherResult.docs[0] }
	} else {
		const studentQuery = Students.where("userID", "==", user.uid)
		const studentResult = await studentQuery.get()
		if (!studentResult.empty) {
			return { student: studentResult.docs[0] }
		}
	}
	return {}
}

function createTeacher(user, teacherData) {
	return Teachers.add(ObjectUtils.objectWithoutUndefined({
		userID: user.uid,
		...teacherData
	})).then((ref) => ref.get())
}

function AuthenticationProvider({ children }) {
	const [authState, setAuthState] = useState({
		isInit: false,
		user: null,
		teacher: null,
		student: null,
	})

	async function updateUser(updatedUser) {
		const { user } = authState
		if ((updatedUser && user && updatedUser.uid === user.uid) || updatedUser === user) { return }
		if (!updatedUser) {
			const patch = { user: null, teacher: null, student: null }
			setAuthState((prevState) => ({ ...prevState, ...patch }))
			return patch
		}
		const { teacher = null, student = null } = await loadUser(updatedUser)
		const patch = { user: updatedUser, teacher, student }
		setAuthState((prevState) => ({ ...prevState, ...patch }))
		return patch
	}

	Firebase.auth().onAuthStateChanged((updatedUser) => {
		if (!authState.isInit) {
			updateUser(updatedUser)
				.then(() => setAuthState((prevState) => ({ ...prevState, isInit: true })))
		}
	})

	const store = {
		...authState,
		logInTeacher(email, password) {
			return Firebase.auth().signInWithEmailAndPassword(email, password)
				.then(({ user }) => updateUser(user))
		},
		signUpTeacher(email, password, teacherData) {
			return Firebase.auth().createUserWithEmailAndPassword(email, password)
				.then(({ user }) => createTeacher(user, teacherData)
					.then(() => updateUser(user)))
		},
		logOut() {
			return Firebase.auth().signOut()
				.then(() => updateUser(null))
		},
	}
	return (
		<AuthenticationContext.Provider value={store}>
			{children}
		</AuthenticationContext.Provider>
	)
}

const AuthenticationConsumer = AuthenticationContext.Consumer

export default AuthenticationContext
export { AuthenticationProvider, AuthenticationConsumer }
