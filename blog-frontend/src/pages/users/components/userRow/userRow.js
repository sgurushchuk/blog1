import { Icon } from '../../../../components';
import { TableRow } from '../tableRow/tableRow';
import { useState } from 'react';
import styled from 'styled-components';
import { request } from '../../../../utils/request';

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initalRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleID] = useState(userRoleId);

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const onRoleChange = ({ target }) => {
		setSelectedRoleID(Number(target.value));
	};

	const isSaveButtonDisabled = selectedRoleId === initalRoleId;

	return (
		<div className={className}>
			<TableRow>
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{registeredAt}</div>
				<div className="role-column">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<div className="save-role-button">
						<Icon
							id="fa-floppy-o"
							fontSize="20px"
							margin="0 0 0 0"
							onClick={() => onRoleSave(id, selectedRoleId)}
							disabled={isSaveButtonDisabled}
						/>
					</div>
				</div>
				<div className="delete-user-button">
					<Icon
						id="fa-trash-o"
						fontSize="20px"
						margin="0 0 0 0"
						onClick={onUserRemove}
					/>
				</div>
			</TableRow>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;

	& .save-role-button {
		width: 17px;
		height: 20px;
	}

	& .delete-user-button {
		width: 16px;
		height: 20px;
	}
`;
