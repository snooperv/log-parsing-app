import {AppState} from './types';
import {configureStore} from '@reduxjs/toolkit';
import {counterSlice} from './features/counter';
import {eventsSlice, getEvents} from './features/events';
import {initialState} from './initialState';
import packageJson from '../../package.json';
import {setupDevTools} from './helpers';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const createStore = (preloadedState: AppState) => configureStore({
	...setupDevTools(packageJson.name),
	preloadedState,
	reducer: {
		counter: counterSlice.reducer,
		events: eventsSlice.reducer
	}
});

export const useAppDispatch = () => useDispatch<ReturnType<typeof createStore>['dispatch']>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useStore = () => {
	const dispatch = useAppDispatch();
	const counterValue = useAppSelector(state => state.counter.value);
	const events = useAppSelector(state => state.events);

	return {
		counterValue,
		events,
		getEvents: () => dispatch(getEvents()),
		logEvent: (event: string) => dispatch(eventsSlice.actions.logEvent(event)),
		setCounter: (newValue: number) => dispatch(counterSlice.actions.setCounter(newValue))
	};
};

export const store = createStore(initialState);
