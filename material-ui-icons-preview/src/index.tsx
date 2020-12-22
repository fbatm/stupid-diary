import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isValidElementType } from 'react-is';
import * as Icons from '@material-ui/icons';
import { withStyles } from '@material-ui/core';

const Preview = function Preview({ classes }) {
	const keys = Object.getOwnPropertyNames(Icons);
	return (
		<ul className={classes.list}>
			{keys.map(key => {
				let result = null;
				if (isValidElementType(Icons[key])) {
					const Comp = Icons[key];
					result = (
						<li key={Comp.displayName}>
							<Comp />
							<span>{key}</span>
						</li>
					);
				}
				return result;
			})}
		</ul>
	);
};
Preview.propTypes = {
	classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles({
	list: {
		listStyleType: 'none',
		display: 'flex',
		flexWrap: 'wrap',
		'& li': {
			display: 'flex',
			alignItems: 'center',
			flexDirection: 'column',
			width: '200px',
			overFlow: 'hidden',
			margin: '1em',
		},
	},
})(Preview);
