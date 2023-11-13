import { Icon } from '../..';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LargeText = styled.div`
	font-syze: 32px;
	font-weight: bold;
`;
const SmallText = styled.div`
	font-syze: 18px;
	font-weight: bold;
`;

export const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon id="fa-grav" fontSize="33px" margin="0 5px 0 0" />
		<div>
			<LargeText>Frontender</LargeText>
			<SmallText>Blog</SmallText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	color: #000;
	text-decoration: none;
`;
