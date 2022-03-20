import type { NextApiRequest, NextApiResponse } from 'next'
import { searchDatabase } from '../../../lib/notion'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { query } = req.query
  const results = await searchDatabase(query as string)

  res.status(200).json(results)
}
