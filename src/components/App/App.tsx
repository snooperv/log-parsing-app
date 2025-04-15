import {ButtonWithCounter} from 'components/ButtonWithCounter';
import jsLogo from 'assets/images/Unofficial-JavaScript-logo.png';
import {Provider} from 'react-redux';
import {store, useStore} from 'store';
import styles from './App.less';
import {useEffect} from 'react';

const EmbeddedApp = () => {
	const {events: {isLoading, list}, getEvents, logEvent} = useStore();

	const handleClick = () => {
		const message = new Date().toString();

		logEvent(message);
	};

	useEffect(() => {
		getEvents();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderButton = () => (
		<ButtonWithCounter
			onClick={handleClick}
			text="Кнопка" />
	);

	const renderEvent = (event: string, id: number) => <li key={id}><span>Дата: </span>{event}</li>;

	const renderEventLog = () => {
		if (isLoading) {
			return 'Загрузка данных...';
		}

		if (list.length) {
			return list.map(renderEvent);
		}

		return null;
	};

	const renderHeader = () => <h1 className={styles.heading}>Привет, Мир!</h1>;

	const renderLogo = () => (
		<figure>
			<p><img
				alt="Unofficial JavaScript logo"
				src={jsLogo} /></p>
			<figcaption className={styles.caption}>Пример изображения</figcaption>
		</figure>
	);

	return (
		<div>
			{renderHeader()}
			{renderLogo()}
			{renderButton()}
			{renderEventLog()}
		</div>
	);
};

export const App = () => (
	<Provider store={store} >
		<EmbeddedApp />
	</Provider>
);
