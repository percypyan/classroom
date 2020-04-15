import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./components/App"
import { AuthenticationProvider } from "./components/contextes/AuthenticationContext"

ReactDOM.render(
	<React.StrictMode>
		<AuthenticationProvider>
			<App />
		</AuthenticationProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
