import { styled } from 'styled-components';
import { SpecialPanel } from '../specialPanel/specialPanel';
import { useNavigate } from 'react-router-dom';

const PostContentsContainer = ({
	className,
	id,
	title,
	imageUrl,
	content,
	publishedAt,
	comments,
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<h2>{title}</h2>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				editButtonId="fa-pencil-square-o"
				onClick={() => navigate(`/post/${id}/edit`)}
			/>
			<div className="text-content">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentsContainer)`
	font-weight: 300;

	& img {
		border-radius: 5px;
		width: 100%;
	}

	& h2 {
		margin: 5% 0;
	}

	& .text-content {
		margin: 5% 0;
		white-space: pre-line;
		width: 100%;
		word-wrap: break-word;
	}
`;
