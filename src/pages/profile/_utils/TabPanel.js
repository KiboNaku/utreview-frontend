import React from 'react';
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
            className="tabs"
		>
			{value === index && (
				<Box>
					{children}
				</Box>
			)}
		</div>
	);
}

export default TabPanel