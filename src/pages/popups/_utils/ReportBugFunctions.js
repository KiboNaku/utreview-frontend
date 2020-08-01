import * as Yup from 'yup'
import axios from 'axios'

export const validation = Yup.object({
	firstname: Yup.string()
		.required('Required'),
	lastname: Yup.string()
		.required('Required'),
	email: Yup.string()
		.required('Required')
		.email('Invalid email address'),
	message: Yup.string()
		.required('Required')
})
