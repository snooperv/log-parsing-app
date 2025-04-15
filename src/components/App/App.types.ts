export type LogEntry = {
	id: string,
	thread: string,
	timestamp: string,
	level: string,
	logger: string,
	message: string,
	stacktrace?: string[]
};
