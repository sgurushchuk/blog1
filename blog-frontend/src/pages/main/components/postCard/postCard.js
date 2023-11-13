import { styled } from 'styled-components';
import { Icon } from '../../../../components';
import { Link } from 'react-router-dom';
import { transformDate } from '../../../../utils/transormDate';

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<div className="thumb">
					<img src={imageUrl} alt={title}></img>
				</div>
				<div className="post-card-footer">
					<h3>{title}</h3>
					<div className="post-card-info">
						<div className="published-at">
							<Icon
								id="fa-calendar-o"
								fontSize="14px"
								margin="1px 5px 0 0"
								inactive="true"
							/>
							{transformDate(publishedAt)}
						</div>
						<div className="comments-count">
							<Icon
								id="fa-comment-o"
								fontSize="18px"
								margin="-2px 3px 0 0"
								inactive="true"
							/>
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	width: 300px;
	display: flex;
	flex-direction: column;
	margin: 20px 20px;
	border: 1px solid #bababa;
	border-radius: 10px;

	& img {
		width: 100%;
	}

	& .thumb {
		background-color: #e0e0e0;
		border-radius: 10px 10px 0 0;
		width: 100%;
		height: 200px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	& h3 {
		text-align: center;
	}

	& .post-card-info {
		display: flex;
		padding: 20px 30px;
		justify-content: space-between;
	}

	& .published-at {
		display: flex;
		margin-right: 10px;
	}

	& .comments-count {
		display: flex;
	}
`;
