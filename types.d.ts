export declare global {
	module '*.gif'
	module '*.png'
	module '*.svg'

	module '*.less' {
		const resource: {[key: string]: string};
		export = resource;
	}
}
