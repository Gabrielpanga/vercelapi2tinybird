import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { userAgent, URLPattern } from 'next/server'

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
