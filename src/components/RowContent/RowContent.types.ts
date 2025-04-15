import {CSSProperties, RefObject} from 'react';
import {LogEntry} from 'components/App/App.types';
import {VariableSizeList as List} from 'react-window';

export type RowProps = {
	index: number,
	style: CSSProperties,
	data: LogEntry[]
};

export type RenderRowProps = {
	listRef: RefObject<List<any> | null>,
	rowHeights: RefObject<{[p: string]: number}>
};
