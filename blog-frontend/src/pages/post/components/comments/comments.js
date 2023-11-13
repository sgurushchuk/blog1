import { useState } from 'react';
import { Icon } from '../../../../components';
import { Comment } from './components/comment';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { selectUserRole } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions';
import { ROLE } from '../../../../constants';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Comment..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						fontSize="24px"
						margin="0 0 0 10px"
						onClick={() => onNewCommentAdd(postId, newComment)}
					/>
				</div>
			)}
			<div className="comments">
				{comments.length > 0 &&
					comments.map(({ id, authorId, content, publishedAt }) => (
						<Comment
							key={id}
							postId={postId}
							id={id}
							author={authorId}
							content={content}
							publishedAt={publishedAt}
						></Comment>
					))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	textarea {
		width: 700px;
		height: 80px;
		border-radius: 10px;
		padding: 1%;
	}

	& .new-comment {
		display: flex;
		justify-content: center;
		margin: 20px 0;
	}
`;
