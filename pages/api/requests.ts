// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withRequestTracking } from '../../lib/withRequestTracking'
import { ErrorResponse } from '../../types/api'

const { TINYBIRD_TOKEN, TINYBIRD_URL } = process.env

type RequestItem = {
  date: string
  method: string
  path: string
  response_time: number
  status_code: number
  browser_name: string
  os_name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RequestItem[] | ErrorResponse>,
) {
  const { page = 0, page_size: pageSize = 100 } = req.query

  if (!TINYBIRD_TOKEN || !TINYBIRD_URL) {
    return res.status(400).json({ message: 'Tinybird was not configured' })
  }

  const tinybirdApiUrl = `${TINYBIRD_URL}?page=${page}&page_size=${pageSize}&token=${TINYBIRD_TOKEN}`
  try {
    const response = await fetch(tinybirdApiUrl)
    const json = await response.json()
    const { data } = json
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: 'Connection with tinybird failed' })
  }
}
