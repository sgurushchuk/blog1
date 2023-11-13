import { ACTION_TYPES } from './actionTypes';

export const addComment = (comment) => ({
	type: ACTION_TYPES.ADD_COMMENT,
	payload: comment,
});
