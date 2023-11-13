import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button, AuthFormError } from '../../components';
import { Navigate } from 'react-router-dom';
import { setUser } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import styled from 'styled-components';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { useResetForm } from '../../hooks/useResetAuthForm';
import { request } from '../../utils/request';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Please fill Login')
		.matches(/^\w+$/, 'Login should contain letters and/or numbers')
		.min(3, 'Login should contain minimum 3 letters')
		.max(15, 'Login should contain maximum 15 letters'),
	password: yup
		.string()
		.required('Please fill Password')
		.matches(
			/^[\w!@#$%]+$/,
			'Password should contain letters, numbers and symbols !@#$%',
		)
		.min(6, 'Password should contain minimum 6 letters')
		.max(30, 'Password should contain maximum 30 letters'),
	passCheck: yup
		.string()
		.required('Please fill Password check')
		.oneOf([yup.ref('password'), null], 'Passwords should maxtch'),
});

const RegistrationPageContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Server request error: ${error}`);
					return;
				}

				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
			},
		);
	};

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passCheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<h2>Registration</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Login..."
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Password..."
					{...register('password')}
				/>
				<Input
					type="password"
					placeholder="Repeate password..."
					{...register('passCheck')}
				/>
				<Button disabled={!!formError} type="submit">
					Register
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const RegistrationPage = styled(RegistrationPageContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
