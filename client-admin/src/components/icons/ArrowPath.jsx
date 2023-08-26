import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function ArrowPath({ dynamicClassName }) {
  const staticClassName = "animate-spin"

  const combinedClassName = `${staticClassName} ${dynamicClassName}`

  return (
    <ArrowPathIcon className={combinedClassName} />
  )
}