export const formModel = [
	{ label: 'E-Mail', type: 'email', name: 'email', id: 'email' },
	{ label: 'Password', type: 'password', name: 'password', id: 'password' },
	{
		label: 'Repeat password',
		name: 'passwordRepeat',
		type: 'password',
		id: 'passwordRepeat'
	}
]

export const initialState = formModel.reduce(
	(a, c) => ({ ...a, [c.id]: '' }),
	{}
)
