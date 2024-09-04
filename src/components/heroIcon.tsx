'use client'
import * as outline from '@heroicons/react/24/outline'
import * as solid from '@heroicons/react/24/solid'
import { createElement } from 'react'

export function HeroIconNamed<T extends 'solid' | 'outline' = 'solid'>(props: {
  name: T extends 'solid' ? keyof typeof solid : keyof typeof outline
  type?: T
  className?: string
}) {
  const { name, type, className: overrides } = props
  // latest classes override the defaults
  const className = ['h-[30px]', 'w-[30px]']
    .concat(overrides?.split(' ') || []).join(' ')
  const icon = { solid, outline }[type ? type : 'solid'][name]
  // no need to use JSX syntax for "dynamically" acquired component
  return createElement(icon, { className })
}

const HeroIcon = (props: { name: any, type: 'solid' | 'outline' | undefined, className?: string }) => {
  const { name, type, className = 'text-[#558B2F]' } = props
  return <HeroIconNamed
    type={type}
    name={name}
    className={className}
  />
}

export default HeroIcon
