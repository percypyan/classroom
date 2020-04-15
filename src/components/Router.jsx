import React from "react"
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom"

import SignUpPage from "./pages/SignUp"
import LogInPage from "./pages/LogIn"
import LogOutPage from "./pages/LogOut"
import HomePage from "./pages/Home"
import { useContext } from "react"
import AuthenticationContext from "./contextes/AuthenticationContext"
import ClassDetails from "./pages/Classes/ClassDetails"

function LoggedRoute({ component: Component, ...routeAttr }) {
	const { user } = useContext(AuthenticationContext)
	const isLogged = user != null
	return <Route {...routeAttr} render={() => isLogged ? (
		<Component />
	) : (
		<Redirect to={`/login?then=${encodeURI(routeAttr.path)}`} />
	)} />
}

function TeacherRoute({ component: Component, ...routeAttr }) {
	const { user, teacher } = useContext(AuthenticationContext)
	const isTeacher = user != null && teacher != null

	return <Route {...routeAttr} render={() => isTeacher ? (
		<Component />
	) : (
		<div>Erreur 404</div>
	)} />
}

function StudentRoute({ component: Component, ...routeAttr }) {
	const { user, student } = useContext(AuthenticationContext)
	const isStudent = user != null && student != null

	return <Route {...routeAttr} render={() => isStudent ? (
		<Component />
	) : (
		<div>Erreur 404</div>
	)} />
}

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<LoggedRoute exact path="/" component={HomePage} />
				<LoggedRoute exact path="/classes/:classID" component={ClassDetails} /> {/* Class homepage */}
				<LoggedRoute exact path="/classes/:classID/students/:studentID" component={HomePage} /> {/* Students details page */}
				<TeacherRoute exact path="/classes/:classID/students/:studentID/add" component={HomePage} /> {/* Add student to class */}
				<TeacherRoute exact path="/classes/:classID/students/:studentID/remove" component={HomePage} /> {/* Remove student of class */}
				<LoggedRoute exact path="/classes/:classID/assignments/:assignmentID" component={HomePage} /> {/* Assignments details page */}
				<TeacherRoute exact path="/classes/:classID/assignments/:assignmentID/add" component={HomePage} /> {/* Add assignment to class */}
				<TeacherRoute exact path="/classes/:classID/assignments/:assignmentID/edit" component={HomePage} /> {/* Edit assignment of class */}
				<TeacherRoute exact path="/classes/:classID/assignments/:assignmentID/remove" component={HomePage} /> {/* Remove assignment from class */}
				<StudentRoute exact path="/classes/:classID/assignments/:assignmentID/submit" component={HomePage} /> {/* Submit assignment */}
				<TeacherRoute exact path="/classes/:classID/assignments/:assignmentID/download" component={HomePage} /> {/* Download assignement file */}
				<TeacherRoute exact path="/classes/:classID/assignments/:assignmentID/work/download" component={HomePage} /> {/* Dowload work file for assignement */}
				<TeacherRoute exact path="/classes/:classID/assignments/:assignmentID/students/:studentsID/download" component={HomePage} /> {/* Download work file of a student for an assignement */}
				<Route exact path="/classes/:classID/join/:studentToken" component={HomePage} /> {/* Join class with a student token */}
				<Route exact path="/login" render={() => <LogInPage />} />
				<Route exact path="/signup" render={() => <SignUpPage />} />
				<Route exact path="/logout" render={() => <LogOutPage />} />
				<Route path="/" render={() => <div>Erreur 404 : Cette page n'existe pas. <Link to="/">Retourner à l'accueil.</Link></div>} />
			</Switch>
		</BrowserRouter>
	)
}

export default Router
