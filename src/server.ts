import mongoose from 'mongoose'
import config from './config'
import colors from 'colors'
import app from './app'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(colors.yellow(`Database is connected successfully`))

    server = app.listen(config.port, () => {
      logger.info(colors.yellow(`Application listening on port ${config.port}`))
    })
  } catch (error) {
    errorLogger.error('Failed to connect database', error)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
bootstrap()

process.on('SIGTERM', () => {
  logger.info('Sigterm is received.....')
  if (server) {
    server.close()
  }
})

// Node.js Process Properties Example
// console.log(`Process Properties: ${process.cwd()}`)
