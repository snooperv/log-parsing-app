import {AppState, CounterReducers, CounterState} from 'store/types';
import {createSlice, Slice} from '@reduxjs/toolkit';
import {initialState} from 'store/initialState';

// Пример асинхронного действия:
// const getData = createAsyncThunk(
//   'counter/getData',
//   async (params, thunkApi) => {
//     try {
//       // Реализация (обращение к API)
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );

export const counterSlice: Slice<CounterState, CounterReducers, keyof AppState> = createSlice({
	// Пример редюсера для асинхронного действия:
	// extraReducers: builder => {
	//   builder.addCase(getData.fulfilled, (state, action) => {
	//     state.prop1 = action.payload.data;
	//     state.prop2 = 'fulfilled';
	//   });
	//   builder.addCase(getData.pending, state => {
	//     state.prop2 = 'pending';
	//   });
	//   builder.addCase(getData.rejected, state => {
	//     state.prop2 = 'rejected';
	//   });
	// },
	initialState: initialState.counter,
	name: 'counter',
	reducers: {
		setCounter: (state, action) => {
			state.value = action.payload;
		}
	}
});
