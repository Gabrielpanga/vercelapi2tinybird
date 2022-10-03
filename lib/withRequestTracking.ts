import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { userAgent } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

import { kafkaProducer } from './kafka'

const { UPSTASH_REQUEST_TOPIC = '' } = process.env

export function withRequestTracking(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const requestedAt = new Date()
    const start = performance.now()
    await handler(req, res)
    const end = performance.now()

    try {
      const headers = new Headers(req.headers as Record<string, string>)

      const message = {
        id: uuidv4(),
        date: requestedAt,
        path: req.url,
        method: req.method,
        statusCode: res.statusCode,
        responseTime: end - start,
        ...userAgent({ headers }),
      }

      await kafkaProducer.produce(UPSTASH_REQUEST_TOPIC, message)
    } catch (error) {
      console.error('Failed to produce event on kafka', error)
    }
  }
}
