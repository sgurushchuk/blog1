import { ACTION_TYPES } from './actionTypes';

export const setPostData = (postData) => ({
	type: ACTION_TYPES.SET_POST_DATA,
	payload: postData,
});
