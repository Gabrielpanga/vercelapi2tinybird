import { STATUS_CODES } from 'http'

export default function HttpCodeBadge({ code }: { code: number }) {
  const baseStyles = 'text-sm font-medium mr-2 px-2 py-1 rounded text-slate-100'
  const statusCodeText = STATUS_CODES[code]
  let color = 'zinc'

  if (code >= 200 && code < 300) {
    color = 'bg-green-500 dark:bg-green-200 dark:text-green-900'
  } else if (code >= 300 && code < 400) {
    color = 'bg-indigo-500 dark:bg-indigo-200 dark:text-indigo-900'
  } else if (code >= 400 && code < 500) {
    color = 'bg-rose-500 dark:bg-rose-200 dark:text-rose-900'
  } else {
    color = 'bg-orange-500 dark:bg-orange-200 dark:text-orange-900'
  }

  return (
    <span className={`${color} ${baseStyles}`}>
      {code} - {statusCodeText}
    </span>
  )
}
