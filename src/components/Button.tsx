import classNames from 'classnames'

type Props = {
  text: string
  disabled?: boolean
  onClick: () => void
}

const Button = ({ text, disabled, onClick }: Props) => (
  <button
    type="button"
    name="save button"
    disabled={disabled}
    onClick={onClick}
    className={classNames(
      'inline-flex items-center px-4 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white',
      disabled ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
    )}
  >
    {text}
  </button>
)

export default Button
