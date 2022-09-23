import { STATUS_CODES } from 'http'

export default function HttpCodeBadge({ code }: { code: number }) {
  const baseStyles = 'text-sm font-medium mr-2 px-2.5 py-0.5 rounded'
  const statusCodeText = STATUS_CODES[code]
  let color = 'gray'
  if (code >= 200 && code < 300) {
    color = 'green'
  } else if (code >= 300 && code < 400) {
    color = 'pink'
  } else {
    color = 'red'
  }

  return (
    <span
      className={`${baseStyles} bg-${color}-100 text-${color}-800 dark:bg-${color}-200 dark:text-${color}-900`}
    >
      {code} - {statusCodeText}
    </span>
  )
}
