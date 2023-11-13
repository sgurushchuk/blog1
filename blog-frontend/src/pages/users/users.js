import { UserRow, TableRow } from './components';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Content } from '../../components';
import { ROLE } from '../../constants';
import { request } from '../../utils/request';

const UsersPageContainer = ({ className }) => {
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	useEffect(() => {
		Promise.all([request('/users'), request('/users/roles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}
				setUsers(usersRes.data);
				setRoles(rolesRes.data);
			},
		);
	}, [shouldUpdateUserList]);

	const onUserRemove = async (userId) => {
		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<div className={className}>
			<Content error={errorMessage}>
				<h2>Users</h2>
				<div>
					<TableRow>
						<div className="login-column">Login</div>
						<div className="registered-at-column">Registration date</div>
						<div className="role-column">Role</div>
					</TableRow>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</Content>
		</div>
	);
};

export const UsersPage = styled(UsersPageContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	width: 570px;
`;
