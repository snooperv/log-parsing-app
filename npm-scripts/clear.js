const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const {cwd} = require('process');
const {removeFilesFromDirectory} = require('./helpers');

rimraf.sync('build');
mkdirp.sync('build');

const basedir = cwd();

removeFilesFromDirectory(basedir, '.zip');
