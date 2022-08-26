import { Extension } from '@codemirror/state'
import { langs } from '@uiw/codemirror-extensions-langs'
import { useCodeMirror } from '@uiw/react-codemirror'
import { useEffect, useRef, useState } from 'react'
import { DEFAULT_LANG } from '../utils/constants'

type Props = {
  code?: string
  language?: string
  onChange: (val: string) => void
}

const Editor = ({ code, language, onChange }: Props) => {
  const editor = useRef<HTMLDivElement | undefined>()
  const [langExtension, setLangExtension] = useState<Extension>(langs[DEFAULT_LANG]())

  const handleLangChange = (lang?: string) => {
    try {
      setLangExtension(langs[lang as keyof typeof langs]())
    } catch {
      setLangExtension(langs[DEFAULT_LANG]())
    }
  }

  const { setContainer } = useCodeMirror({
    container: editor.current,
    value: code,
    extensions: [langExtension],
    height: '100%',
    theme: 'light',
    autoFocus: true,
    onChange
  })

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current)
    }
  }, [])

  useEffect(() => {
    handleLangChange(language)
  }, [language])

  return (
    <div className="relative flex-auto">
      <div ref={editor as any} className="absolute inset-0 w-full h-full focus:outline-0" />
    </div>
  )
}

export default Editor
