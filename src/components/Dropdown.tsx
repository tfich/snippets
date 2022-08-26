import { Menu, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { Fragment } from 'react'

type Props = {
  options: string[]
  selected: string
  onChange: (selected: string) => void
}

const Dropdown = ({ options, selected, onChange }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        aria-label="language dropdown"
      >
        {selected}
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-72 z-10 overflow-scroll">
          <div className="py-1">
            {options.map((val, i) => (
              <Menu.Item key={i}>
                <button
                  type="submit"
                  className={classNames(
                    'flex flex-row justify-between w-full px-4 py-2 text-sm',
                    'hover:bg-gray-100 hover:text-gray-900 text-gray-700'
                  )}
                  aria-label={val}
                  onClick={() => onChange(val)}
                >
                  {val}
                  {val === selected && <CheckIcon className="h-5 w-5" aria-hidden="true" />}
                </button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown
