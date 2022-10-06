import { NextFetchEvent, NextResponse, userAgent } from 'next/server'
import type { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

import { kafkaProducer } from './lib/kafka'

const { UPSTASH_REQUEST_TOPIC = '' } = process.env

const PATH_TO_SKIP = ['/api/requests']

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const isNotAPIRequest = !request.url.includes('/api/')
  const { pathname: path } = new URL(request.url)
  if (isNotAPIRequest || PATH_TO_SKIP.includes(path)) {
    return
  }
  const requestedAt = new Date()
  const response = NextResponse.next()
  const endedAt = new Date()
  const message = {
    id: uuidv4(),
    date: requestedAt,
    path,
    method: request.method,
    statusCode: response.status,
    responseTime: endedAt.getTime() - requestedAt.getTime(),
    ...userAgent(request),
  }

  event.waitUntil(
    kafkaProducer
      .produce(UPSTASH_REQUEST_TOPIC, message)
      .catch((error) => console.log(error)),
  )
}
