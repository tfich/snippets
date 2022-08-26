import { Transition } from '@headlessui/react'
import { SunIcon } from '@heroicons/react/outline'
import { ScissorsIcon } from '@heroicons/react/solid'
import { langs } from '@uiw/codemirror-extensions-langs'
import classNames from 'classnames'
import { GetServerSideProps } from 'next'
import Error from 'next/error'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import Dropdown from '../components/Dropdown'
import Editor from '../components/Editor'
import Snippet from '../models/Snippet'
import { DEFAULT_LANG, GITHUB_URL, MY_TOP_LANGUAGES } from '../utils/constants'
import { connectDatabase } from '../utils/database'

const LANGUAGE_OPTIONS = [
  ...MY_TOP_LANGUAGES,
  ...Object.keys(langs).filter((val) => MY_TOP_LANGUAGES.indexOf(val as keyof typeof langs) === -1)
]

type Props = {
  data?: {
    code: string
    language: string
    slug: string
  }
  error?: {
    code: number
    message?: string
  }
}

const Home = (props: Props) => {
  const [{ code, language, slug, isSavable, loading, copied }, setState] = useState({
    code: props.data?.code || '',
    language: props.data?.language || DEFAULT_LANG,
    slug: props.data?.slug,
    isSavable: false,
    loading: false,
    copied: false
  })

  const onShareOrSave = () => {
    window
      .fetch('/api/snippets', {
        method: props.data ? 'PUT' : 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code, language, slug })
      })
      .then((res) => {
        if (!res.ok) throw res
        return res
      })
      .then((res) => res.json())
      .then((res) => {
        if (!props.data) Router.push(`/${res.slug}`)
        navigator.clipboard.writeText(`${window.location.origin}/${res.slug}`)
        setState((state) => ({ ...state, isSavable: false, slug: res.slug }))
      })
      .catch((error) => {
        // TODO: show error of some sort
      })
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    const charCode = event.key.toLowerCase()
    if ((event.ctrlKey || event.metaKey) && charCode === 's') {
      event.preventDefault()
      if (isSavable) {
        onShareOrSave()
      }
    }
  }

  useEffect(() => {
    // attach and dettach the event listener
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <>
      <Head>
        <title>{props.data ? `snippets/${props.data.slug}` : 'snippets'}</title>
      </Head>
      <div className="flex h-screen bg-white">
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex justify-between items-center py-3 px-10 border-b border-gray-300 bg-white z-50">
            <div
              className={classNames('flex items-center', props.data ? 'cursor-pointer' : 'cursor-default')}
              onClick={() => {
                if (props.data) {
                  setState((state) => ({ ...state, copied: true }))
                  setTimeout(() => setState((state) => ({ ...state, copied: false })), 3000)
                  navigator.clipboard.writeText(window.location.href)
                }
              }}
            >
              <ScissorsIcon className="h-6 w-6 text-gray-700" />
              <span className="text-left text-gray-700 font-bold text-xl">snippets</span>
              {props.data && (
                <>
                  <span className="text-left text-gray-400 font-bold text-xl px-0.5">{'/'}</span>
                  <span className="text-left text-gray-400 font-bold text-xl">{`${slug}`}</span>
                </>
              )}
              <Transition
                show={copied}
                enter="transition-opacity duration-250"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-250"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="px-3 cursor-default text-slate-800">Copied!</div>
              </Transition>
            </div>
            <div className="flex items-center">
              <div className="flex gap-3 items-center text-slate-800 border-r pr-3">
                <Dropdown
                  options={LANGUAGE_OPTIONS}
                  selected={language}
                  onChange={(selected) =>
                    setState((state) => ({
                      ...state,
                      language: selected,
                      isSavable: true
                    }))
                  }
                />
                <Button text={props.data ? 'Save' : 'Share'} disabled={!isSavable} onClick={onShareOrSave} />
              </div>
              <div className="flex gap-3 items-center text-slate-800 pl-3">
                <button
                  name="theme button"
                  className="rounded-md p-1 border border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
                >
                  <SunIcon className="h-5 w-5" />
                </button>
                <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="flex items-center text-slate-800">
                  <Image src="/github.svg" alt="github" width={24} height={24} />
                </a>
              </div>
            </div>
          </header>
          <div className="flex flex-auto z-0">
            <Editor
              code={code}
              language={language}
              onChange={(val) =>
                setState((state) => ({
                  ...state,
                  code: val,
                  isSavable: val !== (props.data?.code || '')
                }))
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  if (!params || !params.slug || params.slug[0] === 'index') return { props: {} }

  if (params.slug.length > 1)
    return {
      props: {
        error: { code: 404, message: "Sorry, could't find this page" }
      }
    }

  const slug = params.slug[0]

  try {
    await connectDatabase()

    const snippet = await Snippet.findOne({ slug })

    if (!snippet)
      return {
        props: {
          error: { code: 404, message: "Sorry, could't find this page" }
        }
      }

    return {
      props: {
        data: {
          code: snippet.code,
          language: snippet.language,
          slug
        }
      }
    }
  } catch (error: any) {
    return {
      props: {
        error: { code: 500, message: error.message || 'unknown error' }
      }
    }
  }
}

const Slug = ({ data, error }: Props) =>
  error ? <Error statusCode={error.code} title={error.message} /> : <Home data={data} />

export default Slug
