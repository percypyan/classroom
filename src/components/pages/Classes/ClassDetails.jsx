import React, { useState } from "react"

import { useParams } from "react-router-dom"
import { useEffect } from "react"

import Firebase from "../../../services/Firebase"

const Classes = Firebase.firestore().collection("classes")
const Students = Firebase.firestore().collection("students")
const Assignments = Firebase.firestore().collection("assignments")

function ClassDetails() {
	const { classID } = useParams()
	const [theClass, setTheClass] = useState(null)
	const [students, setStudents] = useState(null)
	const [assignments, setAssignments] = useState(null)

	useEffect(() => {
		const classRef = Classes.doc(classID)
		classRef.get()
			.then(setTheClass)

		Students.where("class", "==", classRef).get()
			.then((result) => setStudents(result.docs))

		Assignments.where("class", "==", classRef).get()
			.then((result) => setAssignments(result.docs))
	}, [classID])

	return theClass ? (
		<div className="class-details">
			<h1>{theClass.data().name}</h1>
			<div className="students">
				{!students && "Chargement des élèves..."}
				{students && Boolean(students.length) && (
					<ul className="students-list">
						{students.map((student) => (
							<li key={student.id}>
								{student.data().fullName}
							</li>
						))}
					</ul>
				)}
				{students && !students.length && (
					"Il n'y a pas encore d'élève dans cette classe."
				)}
			</div>
			<div className="assignments">
				{!assignments && "Chargement des devoirs..."}
				{assignments && Boolean(assignments.length) && (
					<ul className="assignments-list">
						{assignments.map((assignement) => (
							<li key={assignement.id}>
								{assignement.data().title}
							</li>
						))}
					</ul>
				)}
				{assignments && !assignments.length && (
					"Vous n'avez pas encore créé de devoir pour cette classe."
				)}
			</div>
		</div>
	) : "Chargement de la classe..."
}

export default ClassDetails
