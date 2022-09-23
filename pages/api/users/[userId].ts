// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withRequestTracking } from '../../../lib/withRequestTracking'

type Data = {
  name: string
}

function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId } = req.query
  res.status(200).json({ name: `John Doe (${userId})` })
}


export default withRequestTracking(handler)