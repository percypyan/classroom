import React, { useState, useContext } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import FormInput from "../forms/FormInput"
import AuthenticationContext from "../contextes/AuthenticationContext"

const loginErrorsMap = {
	"auth/invalid-email": "Cette adresse email est invalide.",
	"auth/user-disabled": "Ce compte a été desactivé.",
	"auth/user-not-found": "Identifiants invalides.",
	"auth/wrong-password": "Identifiants invalides.",
}

function LogIn() {
	const history = useHistory()
	const location = useLocation()
	const { logInTeacher } = useContext(AuthenticationContext)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

	function onSubmit(event) {
		event.preventDefault()

		logInTeacher(email, password)
			.then(() => history.push(location.search.then || "/"))
			.catch((error) => setErrorMessage(loginErrorsMap[error.code]))
	}

	return (
		<div className="page">
			<div className="login-form">
				<h1>Connexion</h1>
				<p className="no-account">
					Pas encore de compte ? <Link to="/signup">Créez un compte pour commencer.</Link>
				</p>
				<form onSubmit={onSubmit}>
					<FormInput type="email" name="email" label="Adresse email" value={email} setValue={setEmail} />
					<FormInput type="password" name="password" label="Mot de passe" value={password} setValue={setPassword} />
					<button type="submit">Se connecter</button>
				</form>
				{errorMessage && <div className="login-error">{errorMessage}</div>}
			</div>
		</div>
	)
}

export default LogIn
