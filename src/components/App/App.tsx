import {
	App as AntApp,
	Button,
	Input,
	Radio,
	Select,
	Space,
	Spin,
	Tag,
	Typography,
	Upload,
	UploadProps
} from 'antd';
import {CHUNK_SIZE, LOG_LINE_REGEX} from './constants';
import cn from 'classnames';
import {filterByKeywords} from './helpers';
import {LogEntry} from './App.types';
import {PlusOutlined, UploadOutlined} from '@ant-design/icons';
import React, {useMemo, useRef, useState} from 'react';
import renderRowContent from 'components/RowContent';
import styles from './App.style.less';
import {VariableSizeList as List} from 'react-window';

const App = () => {
	const {Dragger} = Upload;
	const {Option} = Select;
	const {Title} = Typography;
	const {modal} = AntApp.useApp();

	const [inputValue, setInputValue] = useState<string>('');
	const [keywords, setKeywords] = useState<string[]>([]);
	const [levelFilter, setLevelFilter] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [logs, setLogs] = useState<LogEntry[]>([]);
	const [searchMode, setSearchMode] = useState<'AND' | 'OR'>('AND');

	const bufferRef = useRef<string>('');
	const listRef = useRef<List>(null);
	const offsetRef = useRef<number>(0);
	const readerRef = useRef<FileReader | null>(null);
	const rowHeights = useRef<{[key: string]: number}>({});

	const parsedLogs: LogEntry[] = [];

	const filteredLogs = useMemo(
		() => logs.filter(log =>
			(!levelFilter || log.level === levelFilter)
			&& (keywords.length === 0 || filterByKeywords(log.message, keywords, searchMode))),
		[keywords, levelFilter, logs, searchMode]
	);

	const getRowHeight = (index: number) => {
		const id = filteredLogs[index].id;
		return rowHeights.current[id] || 50;
	};

	const parseChunk = (chunk: string) => {
		const lines = chunk.split(/\r?\n/);
		let currentEntry: LogEntry | null = null;
		let isProcessingStackTrace = false;
		let stacktrace: string[] = [];

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const match = LOG_LINE_REGEX.exec(line);

			if (match) {
				if (currentEntry) {
					if (stacktrace.length > 0) {
						currentEntry.stacktrace = [...stacktrace];
						stacktrace = [];
					}

					parsedLogs.push(currentEntry);
				}

				currentEntry = {
					id: `${match[1]}-${match[3]}-${i}`,
					level: match[4],
					logger: match[5],
					message: match[6],
					thread: match[2],
					timestamp: match[3]
				};
				isProcessingStackTrace = false;
			} else if (currentEntry) {
				const isStackTraceLine = /^\s/.test(line);

				if (isStackTraceLine || isProcessingStackTrace) {
					if (!isProcessingStackTrace && currentEntry.message.includes('Exception')) {
						const stackStart = currentEntry.message.search(/\s(at\s|\[|Caused by:|\t)/);

						if (stackStart > -1) {
							const messagePart = currentEntry.message.substring(0, stackStart);
							const stackPart = currentEntry.message.substring(stackStart);

							currentEntry.message = messagePart.trim();
							stacktrace.push(stackPart);
						}
					}

					if (isStackTraceLine) {
						stacktrace.push(line);
						isProcessingStackTrace = true;
					} else if (stacktrace.length > 0) {
						stacktrace[stacktrace.length - 1] += '\n' + line;
					}
				} else {
					currentEntry.message += '\n' + line;
				}
			}
		}

		if (currentEntry) {
			if (stacktrace.length > 0) {
				currentEntry.stacktrace = [...stacktrace];
			}

			parsedLogs.push(currentEntry);
		}
	};

	const readFileChunked = (file: File) => {
		setLoading(true);
		offsetRef.current = 0;
		bufferRef.current = '';
		parsedLogs.length = 0;

		const reader = new FileReader();

		readerRef.current = reader;

		const readNextChunk = () => {
			if (offsetRef.current >= file.size) {
				setLogs([...parsedLogs]);
				setLoading(false);
				return;
			}

			const slice = file.slice(offsetRef.current, offsetRef.current + CHUNK_SIZE);

			reader.onload = e => {
				const text = e.target?.result as string;
				const combined = bufferRef.current + text;
				const lastNewLineIndex = combined.lastIndexOf('\n');

				if (lastNewLineIndex === -1) {
					bufferRef.current += text;
				} else {
					const toParse = combined.slice(0, lastNewLineIndex);

					bufferRef.current = combined.slice(lastNewLineIndex + 1);
					parseChunk(toParse);
				}

				offsetRef.current += CHUNK_SIZE;
				setTimeout(readNextChunk, 0);
			};

			reader.readAsText(slice);
		};

		readNextChunk();
	};

	const handleKeywordAdd = () => {
		const trimmed = inputValue.trim();

		if (trimmed && !keywords.includes(trimmed)) {
			setKeywords([...keywords, trimmed]);
		}

		setInputValue('');
	};

	const handleKeywordRemove = (keyword: string) => {
		setKeywords(keywords.filter(k => k !== keyword));
	};

	const uploadProps: UploadProps = {
		accept: '.log',
		beforeUpload: file => {
			if (!file.name.endsWith('.log')) {
				modal.error({title: 'Поддерживаются только .log файлы'});
				return false;
			}

			readFileChunked(file);

			return false;
		},
		disabled: loading,
		showUploadList: false
	};

	return (
		<AntApp>
			<div className={styles.appContainer}>
				<Title level={3}>Log Parser</Title>
				<Dragger {...uploadProps} style={{marginBottom: 20}}>
					<p className="ant-upload-drag-icon"><UploadOutlined /></p>
					<p className="ant-upload-text">Перетащите .log файл сюда или нажмите для выбора</p>
				</Dragger>
				<Spin size="large" spinning={loading} tip="Чтение файла...">
					<div className={styles.filters}>
						<Select
							allowClear
							className={styles.levelFilter}
							onChange={value => setLevelFilter(value)}
							placeholder="Фильтр по уровню"
						>
							<Option value="DEBUG">DEBUG</Option>
							<Option value="ERROR">ERROR</Option>
							<Option value="INFO">INFO</Option>
							<Option value="TRACE">TRACE</Option>
							<Option value="WARN">WARN</Option>
						</Select>
						<Input
							className={styles.keywordFilter}
							onChange={e => setInputValue(e.target.value)}
							onPressEnter={handleKeywordAdd}
							placeholder="Добавить ключевое слово"
							value={inputValue}
						/>
						<Button icon={<PlusOutlined />} onClick={handleKeywordAdd} type="primary">
							Добавить
						</Button>
						<Radio.Group
							onChange={e => setSearchMode(e.target.value)}
							value={searchMode}
						>
							<Radio.Button value="AND">И</Radio.Button>
							<Radio.Button value="OR">ИЛИ</Radio.Button>
						</Radio.Group>
					</div>
					<Space className={styles.keywords} wrap>
						{keywords.map(kw => <Tag closable key={kw} onClose={() => handleKeywordRemove(kw)}>{kw}</Tag>)}
					</Space>
					<div className={styles.table}>
						<div className={styles.header}>
							<div className={cn(styles.cell, styles.timeCell)}>Дата/Время</div>
							<div className={cn(styles.cell, styles.levelCell)}>Уровень</div>
							<div className={cn(styles.cell, styles.threadCell)}>Источник</div>
							<div className={styles.messageCell}>Сообщение</div>
						</div>
						<List
							height={600}
							itemCount={filteredLogs.length}
							itemData={filteredLogs}
							itemKey={index => filteredLogs[index].id}
							itemSize={getRowHeight}
							ref={listRef}
							width="100%"
						>
							{renderRowContent({listRef, rowHeights})}
						</List>
					</div>
				</Spin>
			</div>
		</AntApp>
	);
};

export default App;
