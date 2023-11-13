import styled from 'styled-components';

const ButtonContainer = ({ children, classname, width, ...props }) => {
	return (
		<button className={classname} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	padding: 10px;
	margin: 0 0 10px;
	border: none;
	border-radius: 3px;
	background-color: #e3e3e3;
	cursor: pointer;
	height: 40px;
	width: ${({ width = '100%' }) => width};
	&:hover {
		background-color: #cdcdcd;
	}
`;
