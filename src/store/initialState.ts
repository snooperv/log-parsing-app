import {AppState} from './types';

export const initialState: AppState = {
	counter: {
		value: 0
	},
	events: {
		isLoading: false,
		list: []
	}
};
