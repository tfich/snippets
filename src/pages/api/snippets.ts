import type { NextApiRequest, NextApiResponse } from 'next'
import shortid from 'shortid'
import Snippet, { ISnippet } from '../../models/Snippet'
import { connectDatabase } from '../../utils/database'

type Data = ISnippet | { error: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (typeof req.body !== 'object' || typeof req.body.code !== 'string' || typeof req.body.language !== 'string') {
    res.statusCode = 400
    return res.end()
  }

  const { code, language, slug } = req.body

  await connectDatabase()

  if (req.method === 'POST') {
    try {
      const slug = shortid.generate()
      const snippet = await Snippet.create({ slug, code, language })

      return res.status(200).json(snippet)
    } catch (error: any) {
      return res.json({ error: error.message || 'unknown error' })
    }
  }

  if (req.method === 'PUT') {
    if (!slug) {
      res.statusCode = 400
      return res.end()
    }

    try {
      const snippet = await Snippet.findOneAndUpdate({ slug }, { code, language })

      return res.status(200).json(snippet)
    } catch (error: any) {
      return res.json({ error: error.message || 'unknown error' })
    }
  }

  res.statusCode = 404
  return res.end()
}
