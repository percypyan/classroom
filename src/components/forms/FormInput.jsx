import React from "react"
import PropTypes from "prop-types"

function FormInput({ value, setValue, type, name, label, errorMessage, ...inputAttr }) {
	return (
		<div className="form-input">
			{label && <label htmlFor={name}>{label}</label>}
			<input
				id={name}
				name={name}
				type={type}
				onChange={(e) => setValue(e.target.value)}
				value={value}
				{...inputAttr}
			/>
			<div className="input-error">{errorMessage}</div>
		</div>
	)
}
FormInput.propTypes = {
	type: PropTypes.oneOf(["text", "email", "password", "number"]).isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	errorMessage: PropTypes.string,
	value: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
}

export default FormInput
