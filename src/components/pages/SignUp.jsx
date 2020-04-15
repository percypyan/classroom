import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"

import FormInput from "../forms/FormInput"
import { useContext } from "react"
import AuthenticationContext from "../contextes/AuthenticationContext"

const signUpErrorsMap = {
	"auth/email-already-in-use": "Un compte existe déjà pour cette adresse email.",
	"auth/invalid-email": "Cette adresse email est invalide.",
	"auth/operation-not-allowed": "Les inscriptions sont clôturées pour le moment.",
	"auth/weak-password": "Ce mot de passe n'est pas assez sécurisé.",
}

function SignUp() {
	const history = useHistory()
	const { signUpTeacher } = useContext(AuthenticationContext)

	const [email, setEmail] = useState("p@p.fr")
	const [password, setPassword] = useState("Cl@ssr00m")
	const [passwordConfirmation, setPasswordConfirmation] = useState("Cl@ssr00m")
	const [fullName, setFullName] = useState("Testeur")
	const [errorMessage, setErrorMessage] = useState(null)

	function onSubmit(event) {
		event.preventDefault()

		signUpTeacher(email, password, fullName)
			.then(() => history.push("/"))
			.catch((error) => setErrorMessage(signUpErrorsMap[error.code]))
	}

	return (
		<div className="page">
			<div className="signup-form">
				<h1>Inscription Enseignant</h1>
				<p className="no-account">
					Vous avez déjà un compte ? <Link to="/login">Connectez vous ici.</Link>
				</p>
				<form onSubmit={onSubmit}>
					<FormInput type="email" name="email" label="Adresse email" value={email} setValue={setEmail} />
					<FormInput type="text" name="fullName" label="Nom complet" value={fullName} setValue={setFullName} />
					<FormInput type="password" name="password" label="Mot de passe" value={password} setValue={setPassword} />
					<FormInput type="password" name="passwordConfirmation" label="Confirmation du mot de passe" value={passwordConfirmation} setValue={setPasswordConfirmation} />
					<button type="submit">S'inscrire</button>
				</form>
				{errorMessage && <div className="signup-error">{errorMessage}</div>}
			</div>
		</div>
	)
}

export default SignUp
