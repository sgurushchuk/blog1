import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../..';
import { ROLE } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole, selectUserLogin } from '../../../selectors';
import { logout } from '../../../actions';
import { checkAccess } from '../../../utils/checkAccess';
import styled from 'styled-components';

const StyledButton = styled.button`
	border: none;
	background: none;
	cursor: pointer;
	margin: 0 0 0 0;
	padding: 0 0 0 0;
`;

const StyledUserName = styled.div`
	font-size: 16px;
	margin: 0 0 0 10px;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<StyledButton onClick={() => navigate(-1)}>
				<Icon id="fa-angle-left" fontSize="28px" margin="0 30px 0 0" />
			</StyledButton>
			{isAdmin && (
				<>
					<Link to="/post">
						<Icon id="fa-file-text-o" fontSize="20px" margin="0 25px 0 0" />
					</Link>
					<Link to="/users">
						<Icon id="fa-user-o" fontSize="20px" margin="0 25px 0 0" />
					</Link>
				</>
			)}
			<div className="login-container">
				{roleId === ROLE.GUEST ? (
					<StyledButton>
						<StyledUserName>
							<Link to="/login">Sign in</Link>
						</StyledUserName>
					</StyledButton>
				) : (
					<div className="login-container">
						<StyledUserName>{login}</StyledUserName>
						<StyledButton onClick={onLogout}>
							<Icon id="fa-sign-out" fontSize="20px" margin="0 0 0 5px;" />
						</StyledButton>
					</div>
				)}
			</div>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	align-items: center;

	& .login-container {
		display: flex;
		margin: 0 0 0 50px;
	}
`;
