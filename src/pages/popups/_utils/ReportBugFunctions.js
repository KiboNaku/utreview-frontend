import * as Yup from 'yup'
import axios from 'axios'

export const validation = Yup.object({

	page: Yup.array()
		.of(
			Yup.object().shape({
				label: Yup.string().required('Required'),
				value: Yup.string().required('Required')
			})
		)
})
