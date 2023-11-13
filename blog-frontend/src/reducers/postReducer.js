import { ACTION_TYPES } from '../actions';

const initialPostState = {
	id: '',
	title: '',
	imageUrl: '',
	content: '',
	publishedAt: '',
	comments: [],
};

export const postReducer = (state = initialPostState, action) => {
	switch (action.type) {
		case ACTION_TYPES.ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, action.payload],
			};
		case ACTION_TYPES.REMOVE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(
					(comment) => comment.id !== action.payload,
				),
			};
		case ACTION_TYPES.SET_POST_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPES.RESET_POST_DATA:
			return initialPostState;
		default:
			return state;
	}
};
