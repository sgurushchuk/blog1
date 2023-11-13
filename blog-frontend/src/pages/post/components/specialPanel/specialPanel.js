import { styled } from 'styled-components';
import { Icon } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils/checkAccess';
import { ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../selectors';
import { transformDate } from '../../../../utils/transormDate';

const SpecialPanelContainer = ({
	className,
	id,
	publishedAt,
	editButtonId,
	onClick,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Remove post?',
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() => navigate('/'));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<div className="date">
				{publishedAt && (
					<Icon id="fa-calendar-o" margin="0 5px 0 0" inactive="true" />
				)}
				{transformDate(publishedAt)}
			</div>
			{isAdmin && (
				<div className="buttons">
					<Icon
						id={editButtonId}
						fontSize="22px"
						margin="0 10px 0 0"
						onClick={onClick}
					/>
					{publishedAt && (
						<Icon
							id="fa-trash-o"
							fontSize="24px"
							onClick={() => {
								onPostRemove(id);
							}}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;

	& .date {
		display: flex;
	}

	& .buttons {
		display: flex;
	}
`;
