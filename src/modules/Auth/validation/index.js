import * as yup from 'yup'

export const rules = {
	isEmail: email => {
		const exp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		return exp.test(email)
	},
	required: v => Boolean(v.trim()),
	minLength: (v, num) => v.trim().length >= num,
	maxLength: (v, num) => v.trim().length <= num,
	mathchOriginPassword: (pass, _, data) => {
		return pass === data?.password
	}
}

export const schema = {
	email: {
		required: { message: 'E-Mail required' },
		isEmail: { message: 'Enter valid E-Mail' }
	},
	password: {
		minLength: { arg: 6, message: 'Minimum number of characters 6' },
		maxLength: { arg: 24, message: 'Maximum number of characters 24' },
		required: { message: 'Password required' }
	},
	passwordRepeat: {
		required: { message: 'Repeat your password' },
		mathchOriginPassword: {
			message: 'Password mismatch'
		}
	}
}

export const libsSchema = yup.object().shape({
	email: yup
		.string()
		.email(schema.email.isEmail.message)
		.required(schema.email.required.message),
	password: yup
		.string()
		.min(6, schema.password.minLength.message)
		.max(24, schema.password.maxLength.message)
		.required(schema.password.required.message),
	passwordRepeat: yup
		.string()
		.oneOf(
			[yup.ref('password'), null],
			schema.passwordRepeat.mathchOriginPassword.message
		)
		.required(schema.passwordRepeat.required.message)
})
