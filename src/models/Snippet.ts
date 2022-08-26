import { model, models, Schema } from 'mongoose'

export interface ISnippet extends Document {
  slug: string
  code: string
  language: string
}

const SnippetSchema = new Schema(
  {
    slug: {
      type: String,
      unique: true
    },
    code: String,
    language: String
  },
  { versionKey: false }
)

export const Snippet = models.Snippet || model<ISnippet>('Snippet', SnippetSchema)

export default Snippet
