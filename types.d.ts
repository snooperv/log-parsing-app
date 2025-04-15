import {IJsApi} from '@nsmp/js-api';

export declare global {
	interface Window {
		jsApi: IJsApi
	}

	module '*.gif'
	module '*.png'
	module '*.svg'

	module '*.less' {
		const resource: {[key: string]: string};
		export = resource;
	}
}
