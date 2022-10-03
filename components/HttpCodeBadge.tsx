import { STATUS_CODES } from 'http'

export default function HttpCodeBadge({ code }: { code: number }) {
  const baseStyles = 'text-sm font-medium mr-2 px-2 py-1 rounded'
  const statusCodeText = STATUS_CODES[code]
  let color = 'zinc'
  if (code >= 200 && code < 300) {
    color = 'green'
  } else if (code >= 300 && code < 400) {
    color = 'indigo'
  } else if (code >= 400 && code < 500) {
    color = 'rose'
  } else {
    color = 'orange'
  }

  return (
    <span
      className={`bg-${color}-500 text-slate-100 dark:bg-${color}-200 dark:text-${color}-900 ${baseStyles}`}
    >
      {code} - {statusCodeText}
    </span>
  )
}
