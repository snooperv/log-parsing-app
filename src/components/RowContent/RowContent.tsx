import {RenderRowProps, RowProps} from './RowContent.types';
import styles from './RowContent.style.less';
import {useEffect, useMemo, useRef, useState} from 'react';

const renderRowContent = ({listRef, rowHeights}: RenderRowProps) =>
	function RowContent ({data, index, style}: RowProps) {
		const [expanded, setExpanded] = useState(false);
		const [messageHeight, setMessageHeight] = useState(0);

		const messageRef = useRef<HTMLDivElement>(null);
		const rowRef = useRef<HTMLDivElement>(null);
		const threadRef = useRef<HTMLDivElement>(null);
		const timeRef = useRef<HTMLDivElement>(null);

		const log = useMemo(() => data[index], [data, index]);
		const hasDetails = useMemo(() => log.stacktrace || log.message.includes('\n'), [log.message, log.stacktrace]);

		useEffect(() => {
			const messageElement = messageRef.current;
			const rowElement = rowRef.current;
			const threadElement = threadRef.current;
			const timeElement = timeRef.current;

			if (messageElement && rowElement && threadElement && timeElement) {
				const currentMessageHeight = Math.max(
					messageElement.scrollHeight,
					threadElement.scrollHeight,
					timeElement.scrollHeight
				) + 20;
				const rowHeight = expanded
					? rowElement.scrollHeight
					: currentMessageHeight;

				setMessageHeight(currentMessageHeight);
				rowHeights.current[log.id] = rowHeight;
				listRef.current?.resetAfterIndex(index);
			}
		}, [expanded, index, log.id]);

		const handleRowClick = () => {
			if (hasDetails) {
				setExpanded(!expanded);
			}
		};

		const renderExpandedContent = () => {
			if (expanded && hasDetails) {
				return (
					<div className={styles.stacktrace}>
						{log.stacktrace?.join('\n')}
					</div>
				);
			}

			return null;
		};

		return (
			<div
				className={styles.row}
				onClick={handleRowClick}
				ref={rowRef}
				style={{...style, cursor: hasDetails ? 'pointer' : 'default'}}
			>
				<div className={styles.rowContent} style={{height: messageHeight}}>
					<div className={styles.time} ref={timeRef}>{log.timestamp}</div>
					<div className={styles.level}>{log.level}</div>
					<div className={styles.thread} ref={threadRef}>{log.thread}</div>
					<div className={styles.message} ref={messageRef}>{log.message.split('\n')[0]}</div>
				</div>

				{renderExpandedContent()}
			</div>
		);
	};

export default renderRowContent;
