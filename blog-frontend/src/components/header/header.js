import { ControlPanel, Logo } from './components';
import styled from 'styled-components';

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
	height: 80px;
	padding: 20px 40px;
	background-color: #fff;
	position: fixed;
	max-width: 1200px;
	width: 100%;
	top: 0;
	display: flex;
	justify-content: space-between;
`;
