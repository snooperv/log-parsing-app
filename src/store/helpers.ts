import {DevToolsEnhancerOptions} from '@reduxjs/toolkit';

/**
 * Генерирует название для redux store и возвращает объект настройки redux devtools.
 * @param {string} name - название приложения.
 * @returns {{devTools: DevToolsEnhancerOptions}} возвращает объект настройки redux devtools.
 */
export const setupDevTools = (name: string): {devTools: DevToolsEnhancerOptions} => ({
	devTools: {
		name
	}
});
