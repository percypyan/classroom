import React, { useContext, useEffect, useState } from "react"

import AuthenticationContext from "../contextes/AuthenticationContext"
import Firebase from "../../services/Firebase"
import FormInput from "../forms/FormInput"
import ObjectUtils from "../../services/ObjectUtils"
import { Link } from "react-router-dom"

const Classes = Firebase.firestore().collection("classes")

function Home() {
	const { teacher } = useContext(AuthenticationContext)
	const [classes, setClasses] = useState(null)
	const [newClassName, setNewClassName] = useState("")

	useEffect(() => {
		Classes.where("teacher", "==", teacher.ref).get()
			.then((result) => setClasses(result.docs || []))
	}, [teacher])

	function onSubmit(event) {
		event.preventDefault()
		if (!newClassName) { return }

		Classes.add(ObjectUtils.objectWithoutUndefined({
			name: newClassName,
			teacher: teacher.ref,
		}))
		.then((ref) => ref.get())
		.then((newClass) => setClasses([...classes, newClass]))
	}

	return (
		<div className="home">
			Bonjour {teacher.data().fullName} !
			<div className="classes">
				{!classes && "Chargement des classes..."}
				{classes && Boolean(classes.length) && (
					<ul className="classes-list">
						{classes.map((classSnapshot) => (
							<li key={classSnapshot.id}>
								<Link to={`/classes/${classSnapshot.id}`}>{classSnapshot.data().name}</Link>
							</li>
						))}
					</ul>
				)}
				{classes && !classes.length && (
					"Vous n'avez pas encore de classes."
				)}
				<div className="classes-add">
					<form onSubmit={onSubmit}>
						<FormInput type="text" name="className" label="Nouvelle classe" value={newClassName} setValue={setNewClassName} />
						<button type="submit">Se connecter</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Home
