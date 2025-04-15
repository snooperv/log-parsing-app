import 'styles/global.less';
import App from 'components/App';
import {createRoot} from 'react-dom/client';

(async function () {
	try {
		const container = document.getElementById('root');

		if (container) {
			const root = createRoot(container);

			root.render(
				<App />
			);
		}
	} catch (error) {
		console.error('Ошибка инициализации приложения!', error);
	}
}());
