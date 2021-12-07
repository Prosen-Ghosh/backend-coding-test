const { format, transports, createLogger } = require('winston');
module.exports = createLogger({
	level: 'info',
	format: format.json(),
	defaultMeta: { service: 'backend-coding-test' },
	transports: [
		new transports.Console({
			level: 'info',
			format: format.combine(format.colorize(), format.simple()),
		}),
		new transports.File({
			filename: `./error-${new Date().toLocaleDateString()}.log`,
		}),
	],
});
