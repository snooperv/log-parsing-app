import {Props} from './ButtonWithCounter.types';
import styles from './ButtonWithCounter.less';
import {useEffect} from 'react';
import {useStore} from 'store';

export const ButtonWithCounter = (props: Props) => {
	const {onClick, text} = props;
	const {events: {isLoading, list}, counterValue, setCounter} = useStore();

	const handleClick = () => {
		onClick();
	};

	useEffect(() => {
		setCounter(list.length);
	}, [list, setCounter]);

	return (
		<div className={styles.wrapper}>
			<button disabled={isLoading} onClick={handleClick}>{text}</button>
			{' '}
			<span>{counterValue}</span>
		</div>
	);
};
