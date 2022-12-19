import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'

const HOST = process.env.REDIS_HOST || 'localhost'
const PORT = process.env.REDIS_PORT || '6379'

const options = {
  host: HOST,
  port: Number(PORT),
  retryStrategy: (times: number) => {
    return Math.min(times * 50, 2000)
  },
  ...(process.env.REDIS_PASSWORD && { password: process.env.REDIS_PASSWORD }),
}

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
})

export default pubsub
