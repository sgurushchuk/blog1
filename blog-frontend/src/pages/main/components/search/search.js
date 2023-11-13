import { styled } from 'styled-components';
import { Icon } from '../../../../components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<input
				value={searchPhrase}
				placeholder="Input search"
				onChange={onChange}
			/>
			<div className="search-button">
				<Icon id="fa-search" margin="0 0 0 0" size="18px" />
			</div>
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	// margin: 0 auto;
	width: 25%;
	height: 40px;
	border-radius: 20px;
	border: 1px solid #bababa;
	padding: 0 0 0 8px;

	position: fixed;
	margin: -60px 0 0 30%;

	& .search-button {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		text-align: center;
		padding: 8px;
	}

	& input {
		background-color: inherit;
		border: none;
		width: 95%;
		outline: none;
	}
`;
