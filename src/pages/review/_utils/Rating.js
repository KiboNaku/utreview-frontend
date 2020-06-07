import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

export const StyledRating = withStyles({
	iconFilled: {
		color: '#bf5700',
	},
})(Rating);