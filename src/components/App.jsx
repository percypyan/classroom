import React, { useContext } from "react"

import Router from "./Router"
import AuthenticationContext from "./contextes/AuthenticationContext"

function App() {
	const { isInit } = useContext(AuthenticationContext)
	return isInit ? <Router /> : "Chargement..."
}

export default App
