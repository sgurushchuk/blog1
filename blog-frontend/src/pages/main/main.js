import { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { PostCard } from './components/postCard/postCard';
import { PAGINATIOPN_LIMIT } from '../../constants';
import { Pagination, Search } from './components';
import { debounce } from './utils';
import { request } from '../../utils/request';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	useEffect(() => {
		request(
			`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATIOPN_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setLastPage(lastPage);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<Search searchPhrase={searchPhrase} onChange={onSearch} />
			{posts.length > 0 ? (
				<div className="post-list">
					{posts.map(({ id, title, imageUrl, publishedAt, comments }) => (
						<PostCard
							key={id}
							id={id}
							title={title}
							imageUrl={imageUrl}
							publishedAt={publishedAt}
							commentsCount={comments.length}
						/>
					))}
				</div>
			) : (
				<div className="no-posts-found">
					<h2>No posts found</h2>
				</div>
			)}
			{lastPage > 1 && posts.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const MainPage = styled(MainContainer)`
	min-height: 500px;

	& .no-posts-found {
		text-align: center;
		display: flex;
		align-items: center;
	}

	& h2 {
		margin: 250px auto;
	}

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
`;
