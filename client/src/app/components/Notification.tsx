'use client'

import { useEffect, useState, useCallback, useRef, ForwardRefExoticComponent } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useNotificationsStore } from '@/store/notificationsStore'
import { WarningCircleIcon, CheckCircleIcon, XCircleIcon, XIcon, IconProps } from '@phosphor-icons/react'
import { classNames } from '@/utils/index'

type Notification = {
  id: string,
  message: string,
  type: 'success' | 'error' | 'warning'
  hasAutoClose?: boolean,
}

type NotificationProps = {
  notification: Notification
}

type Icons = {
  success: ForwardRefExoticComponent<IconProps>
  error: ForwardRefExoticComponent<IconProps>
  warning: ForwardRefExoticComponent<IconProps>
}

const Notification = ({ notification }: NotificationProps) => {
  const nodeRef = useRef(null)
  const [shouldShow, setShouldShow] = useState(true)
  const { id, type, message, hasAutoClose = true } = notification
  const removeNotification = useNotificationsStore((state) => state.removeNotification)

  const icons: Icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: WarningCircleIcon,
  }

  const classes = {
    success: 'bg-green-100',
    error: 'bg-red-100',
    warning: 'bg-yellow-100',
  }

  const Icon = icons[type]
  const className = classes[type]

  const close = useCallback((id: string) => {
    setShouldShow(false)
    setTimeout(() => removeNotification(id), 300)
  }, [removeNotification])

  useEffect(() => {
    if (! hasAutoClose) {
      return
    }

    const timeoutId = setTimeout(() => {
      close(id)
    }, 3000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [id, close, hasAutoClose])

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={shouldShow}
      appear={true}
      timeout={300}
      classNames={{
        appear: 'translate-x-full',
        appearActive: 'translate-x-px transition duration-300',
        appearDone: 'translate-x-px',
        enter: 'translate-x-full',
        enterActive: 'translate-x-px transition duration-300',
        enterDone: 'translate-x-px',
        exitActive: 'translate-x-full transition duration-300',
        exitDone: 'translate-x-full',
      }}
    >
      <div
        ref={nodeRef}
        className={classNames(
          'relative mb-2 last:mb-0',
          'h-16 w-100 px-12',
          'rounded-md text-sm',
          'flex justify-center items-center',
          'translate-x-full',
          className
        )}>
        <Icon size={24} weight="bold" className="absolute top-1/2 -translate-y-1/2 left-4" />
        <p>{message}</p>
        <button onClick={() => close(id)} className="absolute top-1/2 -translate-y-1/2 right-4">
          <XIcon size={16} weight="bold" />
        </button>
      </div>
    </CSSTransition>
  )
}

export default Notification
