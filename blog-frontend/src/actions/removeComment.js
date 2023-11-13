import { ACTION_TYPES } from './actionTypes';

export const removeComment = (commentID) => ({
	type: ACTION_TYPES.REMOVE_COMMENT,
	payload: commentID,
});
