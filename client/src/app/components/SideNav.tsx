'use client'

import { useState } from 'react'
import Logo from '@/components/Logo'
import SideNavLink from '@/components/SideNavLink'
import { CaretRightIcon } from '@phosphor-icons/react'
import { classNames } from '@/utils/index'

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  return (
    <div className={classNames(
      'relative flex flex-col flex-end bg-black text-white',
      isOpen ? 'w-40' : 'w-16',
      'transition-width duration-300',
    )}>
      <Logo />
      <div className="flex flex-col items-center justify-end flex-1 py-2">
        <SideNavLink title="Link 1" url="/link" />
        <SideNavLink title="Link 2" url="/link" />
        <SideNavLink title="Link 3" url="/link" />
        <SideNavLink title="Settings" url="/settings" />
      </div>
      <button
        onClick={handleClick}
        className="absolute flex items-center justify-center top-1/2 -translate-y-1/2 h-7 w-7 bg-gray-900 rounded-full -right-2.5"
      >
        <CaretRightIcon size={18} weight="bold" className={isOpen ? 'rotate-180' : ''} />
      </button>
    </div>
  )
}

export default SideNav
