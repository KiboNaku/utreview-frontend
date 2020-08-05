import React from 'react'
import { useField } from 'formik';

export const TextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className='form-group contact-form-element'>
			<label className='' htmlFor={props.id || props.name}>{label}<small className='text-danger'> *</small></label>
			<input className={`form-control ${props.name}-input`} {...field} {...props} />
			{meta.touched && meta.error ? (
				<div>
					<small className="error text-danger">{meta.error}</small>
				</div>
			) : null}
		</div>
	);
};

export const TextArea = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className='form-group contact-form-element'>
			<label className='' htmlFor={props.id || props.name}>{label}<small className='text-danger'> *</small></label>
			<textarea className={`form-control ${props.name}-input`} rows="3" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div>
					<small className="error text-danger">{meta.error}</small>
				</div>
			) : null}
		</div>
	);
};