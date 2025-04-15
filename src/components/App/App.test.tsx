import App from 'components/App';
import {createStore} from 'store';
import {initialState} from 'store/initialState';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Создаём mock для  getEvents
jest.mock('store/features/events', () => ({
	...jest.requireActual('store/features/events'),
	getEvents: jest.fn(() => ({
		type: 'getEvents'
	}))
}));

describe('Компонент App', () => {
	beforeEach(() => {
		render(
			<Provider store={createStore(initialState)}>
				<App />
			</Provider>
		);
	});

	it('выводит заголовок и изображение с `alt`-атрибутом', () => {
		expect(screen.queryAllByText('Привет, Мир!')).toHaveLength(1);
		expect(screen.queryAllByAltText('Unofficial JavaScript logo')).toHaveLength(1);
	});

	it('добавляет строки в лог при кликах по кнопке', async () => {
		const user = userEvent.setup();
		const button = screen.getByText('Кнопка');

		expect(screen.queryAllByText('Дата:')).toHaveLength(0);

		await user.click(button);
		await user.click(button);

		expect(screen.queryAllByText('Дата:')).toHaveLength(2);
	});
});
