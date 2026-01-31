'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useAuthStore } from '@/store/authStore'
import {
  updateUser as updateUserFetcher,
  deleteUser as deleteUserFetcher,
  logout as logoutFetcher,
} from '@/api'
import useSWRMutation from 'swr/mutation'
import { useRouter } from 'next/navigation'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { ArrowRightIcon } from '@phosphor-icons/react'

const Settings = () => {
  const [showModal, setShowModal] = useState(false)
  const user = useAuthStore((state) => state.user)
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)

  const { trigger: updateUser } = useSWRMutation(`users/${user?.id}`, updateUserFetcher)
  const { trigger: deleteUser } = useSWRMutation(`users/${user?.id}`, deleteUserFetcher)
  const { trigger: logout } = useSWRMutation('auth/logout', logoutFetcher)

  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const onClick = () => {
    setShowModal(true)
  }

  const onConfirm = async () => {
    const { error: deleteUserError } = await deleteUser()
    if (deleteUserError) {
      return
    }

    const { error: logoutError } = await logout()
    if (logoutError) {
      return
    }

    setIsAuthenticated(false)
    router.push('/login')
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName
    })
  }

  return (
    <div className='w-full'>
      <h1 className='text-4xl font-bold mb-20'>User settings</h1>
      <form onSubmit={onSubmit} className="relative">
        <div className='flex flex-col mb-8'>
          <Input
            name='firstName'
            label='First name'
            value={formData.firstName}
            onChange={onChange}
            className='w-96'
          />
          <Input
            name='lastName'
            label='Last name'
            value={formData.lastName}
            onChange={onChange}
            className='w-96'
          />
          <Input
            name='email'
            label='Email'
            value={formData.email}
            onChange={onChange}
            className='w-96'
            isDisabled
          />
          <button
            type="button"
            className="text-xs underline mr-auto"
            onClick={onClick}>
              Delete account instead
          </button>
        </div>
        {showModal && (
          <Modal
            title="Delete account"
            onConfirm={onConfirm}
            onCancel={() => setShowModal(false)}
          >
              Are you sure you want to delete your account?
          </Modal>
        )}
        <Button type='submit' className='w-96 mb-4'>
            Save
          <ArrowRightIcon size={24} weight="bold" className="ml-1" />
        </Button>
      </form>
    </div>
  )
}

export default Settings