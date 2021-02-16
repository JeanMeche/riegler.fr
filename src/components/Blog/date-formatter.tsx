import { parseISO, format } from 'date-fns'
import frenchLocale from 'date-fns/locale/fr'
import { FunctionComponent } from 'react'

const DateFormatter: FunctionComponent<{dateString: string}> = ({ dateString }) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'PPP', {locale: frenchLocale})}</time>
}

export default DateFormatter