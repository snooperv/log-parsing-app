const {exec} = require('child_process');
const os = require('os');
const {escapeNodeVariable} = require('./helpers');

const inspect = (error, stdout, stderr) => {
	if (error) {
		process.stdout.write(error);
		return;
	}

	process.stdout.write(stdout);
	process.stdout.write(stderr);
};

const packAppInZip = (args = []) => {
	const npmPackageName = 'npm_package_name';
	const npmPackageVersion = 'npm_package_version';

	if (!Array.isArray(args)) {
		return;
	}

	let name = escapeNodeVariable(npmPackageName, os.type());

	if (args.includes('-v')) {
		name += '-v.';
		name += escapeNodeVariable(npmPackageVersion, os.type());
	}

	name += '.zip';

	exec(`cd build/ && bestzip ../"${name}" *`, inspect);
};

const args = process.argv.slice(2);

switch (args[0]) {
	case '-v':
		packAppInZip([args[0]]);
		break;
	default:
		packAppInZip();
}
