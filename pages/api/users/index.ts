// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withRequestTracking } from '../../../lib/withRequestTracking'

type Data = {
  name: string
}

function handler(_req: NextApiRequest, res: NextApiResponse<Data[]>) {
  res.status(200).json([{ name: 'John Doe' }])
}

export default withRequestTracking(handler)
