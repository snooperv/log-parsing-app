import {CaseReducer, PayloadAction} from '@reduxjs/toolkit';
import {store} from 'store';

export type CounterState = {
	value: number
};

export type EventsState = {
	isLoading: boolean,
	list: string[]
};

export type AppState = {
	counter: CounterState,
	events: EventsState
};

export type CounterReducers = {
	setCounter: CaseReducer<CounterState, PayloadAction<number>>
};

export type EventsReducers = {
	logEvent: CaseReducer<EventsState, PayloadAction<string>>
};

export type ResponseError = {
	message: string
};

export type Response<T> = {data: T, error: null} | {data: null, error: ResponseError};

export type AppDispatch = typeof store.dispatch;

export type AppAsyncThunkOptions = {
	dispatch: AppDispatch,
	rejectValue: {error: string},
	state: AppState
};
