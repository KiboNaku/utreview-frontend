import React, { Component } from 'react';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tabpanel-${index}`}
			{...other}
		>
			{value === index && (
				<Box py={3}>
					{children}
				</Box>
			)}
		</div>
	);
}

export default TabPanel