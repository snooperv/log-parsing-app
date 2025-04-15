import {counterSlice} from './counterSlice';
import {CounterState} from 'store/types';

describe('В counterSlice.reducer', () => {
	it('действие `setCounter` записывает переданное значение в параметр `value`', () => {
		const stateBefore: CounterState = {
			value: 0
		};

		const action = counterSlice.actions.setCounter(2);

		const stateAfter: CounterState = {
			value: 2
		};

		expect(counterSlice.reducer(stateBefore, action)).toEqual(stateAfter);
	});
});
