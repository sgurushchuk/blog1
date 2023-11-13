import { Input } from '../../../../components';
import { styled } from 'styled-components';
import { SpecialPanel } from '../specialPanel/specialPanel';
import { useLayoutEffect, useRef, useState } from 'react';
import { sanitizeContent } from './utils/sanitizeContent';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePostAsync } from '../../../../actions';

const PostFormContainer = ({
	className,
	id,
	title,
	imageUrl,
	content,
	publishedAt,
	comments,
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleUrlValue] = useState(title);
	const contentRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleUrlValue(title);
	}, [imageUrl, title]);

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(id, {
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleUrlValue(target.value);

	return (
		<div className={className}>
			<label>Image</label>
			<Input
				value={imageUrlValue}
				placeholder="Input image url"
				onChange={onImageChange}
			/>
			<label>Titile</label>
			<Input
				value={titleValue}
				placeholder="Input title"
				onChange={onTitleChange}
			/>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				editButtonId="fa-floppy-o"
				onClick={onSave}
			/>
			<label>Post text</label>
			<div
				ref={contentRef}
				contentEditable="true"
				suppressContentEditableWarning="true"
				className="text-content"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	font-weight: 300;
	height: 100%;

	& label {
		font-weight: 500;
		margin: 5px;
		display: block;
	}

	& Input {
		width: 100%;
	}

	& .text-content {
		margin: 10px 0;
		border: solid 1px grey;
		border-radius: 5px;
		padding: 10px;
		white-space: pre-line;
	}
`;
