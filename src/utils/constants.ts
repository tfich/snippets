import { langs } from '@uiw/codemirror-extensions-langs'

export const GITHUB_URL = 'https://github.com/tfich/snippets'

export const DEFAULT_LANG: keyof typeof langs = 'markdown'

export const MY_TOP_LANGUAGES: (keyof typeof langs)[] = [
  DEFAULT_LANG,
  'python',
  'typescript',
  'javascript',
  'tsx',
  'jsx',
  'html',
  'css',
  'json',
  'yaml'
]
