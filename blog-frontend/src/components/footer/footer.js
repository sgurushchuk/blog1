import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	return (
		<footer className={className}>
			<div>Some footer info...</div>
			<div>Contact me: +34 555 55 55 55</div>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	height: 80px;
	padding: 20px 40px;
	background-color: #fff;
	max-width: 1200px;
	width: 100%;
	top: 0;
	display: flex;
	justify-content: space-between;
	font-size: 14px;
`;
