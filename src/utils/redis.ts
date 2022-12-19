import Redis from 'ioredis'

const HOST = process.env.REDIS_HOST || 'localhost'
const PORT = process.env.REDIS_PORT || '6379'

const options = {
  host: HOST,
  port: Number(PORT),
  ...(process.env.REDIS_PASSWORD && { password: process.env.REDIS_PASSWORD }),
  maxRetriesPerRequest: null,
}

const client = new Redis(options)

export default client
