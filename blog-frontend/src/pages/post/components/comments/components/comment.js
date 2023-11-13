import { styled } from 'styled-components';
import { Icon } from '../../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
	CLOSE_MODAL,
	openModal,
	removeCommentAsync,
} from '../../../../../actions';
import { selectUserRole } from '../../../../../selectors';
import { ROLE } from '../../../../../constants';

const CommentContainer = ({
	className,
	postId,
	id,
	author,
	publishedAt,
	content,
}) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Remove comment?',
				onConfirm: () => {
					dispatch(removeCommentAsync(postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	return (
		<div className={className}>
			<div className="information-panel">
				<div className="author">
					<Icon
						id="fa-user-circle-o"
						fontSize="24px"
						margin="0 10px 0 10px"
						inactive="true"
					/>
					{author}
				</div>
				<div className="published-at">
					<Icon
						id="fa-calendar-o"
						fontSize="12px"
						margin="0 5px 0 10px"
						inactive="true"
					/>
					{publishedAt}
				</div>
				{isAdminOrModerator && (
					<div className="delete">
						<Icon
							className="delete-icon"
							id="fa-trash-o"
							fontSize="16px"
							margin="0 0 0 10px"
							onClick={() => {
								onCommentRemove(id);
							}}
						/>
					</div>
				)}
			</div>
			<div className="comment-text">{content}</div>
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	margin: 10px;

	& .author {
		display: flex;
		align-items: center;
	}

	& .published-at {
		display: flex;
		align-items: center;
		font-size: 12px;
		color: grey;
	}

	& .information-panel {
		display: flex;
		align-items: center;
	}

	& .comment-text {
		margin: 5px 45px 5px 45px;
		word-wrap: break-word;
		font-weight: 300;
	}

	& .delete-icon:hover {
		color: red;
	}
`;
