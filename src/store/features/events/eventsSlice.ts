import {AppAsyncThunkOptions, AppState, EventsReducers, EventsState, Response} from 'store/types';
import {createAsyncThunk, createSlice, Slice} from '@reduxjs/toolkit';
import {initialState} from 'store/initialState';

// Пример асинхронного действия:
export const getEvents = createAsyncThunk<string[], void, AppAsyncThunkOptions>(
	'counter/getEvents',
	async (_, thunkApi) => {
		try {
			const {jsApi} = window;
			const contentCode = jsApi.findContentCode();
			const subjectUuid = jsApi.extractSubjectUuid();

			const url = `exec/?func=modules.appModule.getEvents&params='${subjectUuid}', '${contentCode}'`;

			const response = await jsApi.restCallAsJson<Response<string[]>>(url, {});

			if (response.data) {
				return response.data;
			}

			if (response.error) {
				return thunkApi.rejectWithValue({error: response.error.message});
			}

			return thunkApi.rejectWithValue({error: 'Ошибка получения данных'});
		} catch (err) {
			const error = err as Error;
			return thunkApi.rejectWithValue({error: error.message});
		}
	}
);

export const eventsSlice: Slice<EventsState, EventsReducers, keyof AppState> = createSlice({
	// Пример редюсера для асинхронного действия:
	extraReducers: builder => {
		builder.addCase(getEvents.fulfilled, (state, action) => {
			state.list = action.payload;
			state.isLoading = false;
		});
		builder.addCase(getEvents.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(getEvents.rejected, state => {
			state.isLoading = false;
		});
	},
	initialState: initialState.events,
	name: 'events',
	reducers: {
		logEvent: (state, {payload}) => {
			state.list.unshift(payload);
		}
	}
});
