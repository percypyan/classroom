function objectWithoutUndefined(obj) {
	const newObj = {}
	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] !== "undefined") { newObj[key] = obj[key] }
	})
	return newObj
}

export default { objectWithoutUndefined }
