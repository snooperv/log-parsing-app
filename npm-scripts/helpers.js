const {extname, join} = require('path');
const {readdir, unlink} = require('fs');

/**
 * Удаляет файлы из директории
 * @param {*} dir название директории
 * @param {*} ext расширение файла (например, .zip)
 */
function removeFilesFromDirectory (dir, ext) {
	readdir(dir, {withFileTypes: true}, (err, files) => {
		if (err) {
			throw err;
		}

		for (const file of files) {
			if (file.isFile() && extname(file.name).toLowerCase() === ext) {
				unlink(join(dir, file.name), err => {
					if (err) {
						throw err;
					}
				});
			}
		}
	});
}

/**
 * Экранирует переменную
 * @param {*} node нода
 * @param {*} osType тип ОС
 * @returns escapedNode
 */
function escapeNodeVariable (node, osType) {
	return osType === 'Windows_NT'
		? `%${node}%`
		: `$${node}`;
}

module.exports = {
	escapeNodeVariable,
	removeFilesFromDirectory
};
