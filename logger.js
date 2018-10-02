const {
	createLogger,
	format,
	transports
} = require('winston')
const {combine, timestamp, printf} = format
const customFormat = printf(info => {
	return `${info.timestamp} ${info.level}: ${info.message}`
})

module.exports = () => {
	const logger = createLogger({
		level: 'error',
		format: combine(
			format.splat(),
			timestamp(),
			customFormat
		),
		transports: [
			new transports.File({
				filename: 'error.log',
				level: 'error'
			})
		],
		exceptionHandlers: [
			new transports.File({filename: 'exceptions.log'})
		]
	})

	if (process.env.NODE_ENV !== 'production') {
		logger.add(
			new transports.Console({
				level: 'debug'
			})
		)
	}

	return logger
}
