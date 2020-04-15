import { useContext } from "react"
import AuthenticationContext from "../contextes/AuthenticationContext"
import { useHistory } from "react-router-dom"

function LogOut() {
	const history = useHistory()
	const { logOut } = useContext(AuthenticationContext)
	logOut().then(() => history.push("/login"))

	return "Déconnexion en cours..."
}

export default LogOut
