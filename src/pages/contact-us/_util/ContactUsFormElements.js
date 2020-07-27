import React from 'react'
import { useField } from 'formik';

export const TextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div>
			<label className='col-sm-4 contact-form-label' htmlFor={props.id || props.name}>{label}<small className='warning'> *</small></label>
			<br />
			<input className={`col-sm-4 contact-form-input text-input ${props.name}-input`} {...field} {...props} />
			{meta.touched && meta.error ? (
				<div>
					<small className="error warning">{meta.error}</small>
				</div>
			) : null}
		</div>
	);
};

export const TextArea = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div>
			<label className='col-sm-4 contact-form-label' htmlFor={props.id || props.name}>{label}<small className='warning'> *</small></label>
			<br />
			<textarea className={`col-sm-4 contact-form-input text-input ${props.name}-input`} {...field} {...props} />
			{meta.touched && meta.error ? (
				<div>
					<small className="error warning">{meta.error}</small>
				</div>
			) : null}
		</div>
	);
};