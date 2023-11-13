import { Routes, Route } from 'react-router-dom';
import { Header, Footer, Modal, Error } from './components';
import {
	AuthorizationPage,
	RegistrationPage,
	UsersPage,
	PostPage,
	MainPage,
} from './pages';
import styled from 'styled-components';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './actions';
import { ERROR } from './constants';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	max-width: 1200px;
	width: 100%;
	min-height: 100%;
	background-color: #fff;
	margin: auto;
`;

const Page = styled.div`
	padding: 80px 0;
`;

export default function Blog() {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/login" element={<AuthorizationPage />} />
					<Route path="/register" element={<RegistrationPage />} />
					<Route path="/users" element={<UsersPage />} />
					<Route path="/post" element={<PostPage />} />
					<Route path="/post/:id" element={<PostPage />} />
					<Route path="/post/:id/edit" element={<PostPage />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
}
