import { styled } from 'styled-components';
import { Icon } from '../../../../components';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<button disabled={page === 1} onClick={() => setPage(1)}>
				<div className="start-button-content">Start</div>
			</button>
			<button disabled={page === 1} onClick={() => setPage(page - 1)}>
				<Icon id="fa-angle-left" fontSize="24px" margin="0 4px 1px 0" />
			</button>
			<div className="current-page">{page}</div>
			<button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				<Icon id="fa-angle-right" fontSize="24px" margin="0 0 1px 2px" />
			</button>
			<button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				End
			</button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	margin: 20px;

	& .current-page {
		width: 40px;
		height: 40px;
		border: none;
		border-radius: 50%;
		background-color: #efefef;
		padding: 9px;
		margin: 0 7px;
		text-align: center;
	}

	& button {
		background-color: inherit;
		border: 1px solid #bababa;
		border-radius: 50%;
		height: 40px;
		width: 40px;
		margin: 0 7px;
		cursor: pointer;
	}

	& .start-button-content {
		margin: 0 0 0 -2px;
	}
`;
