'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import * as yup from 'yup'
import Link from 'next/link'
import { login as fetcher } from '@/api'
import { useAuthStore } from '@/store/authStore'
import { capitalize } from '@/utils'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { ArrowRightIcon } from '@phosphor-icons/react'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const Page = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const router = useRouter()
  const { trigger: login, isMutating: isLoading } = useSWRMutation('auth/login', fetcher)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')

    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await schema.validate(formData, { abortEarly: false })
    } catch (error) {
      setError(error.errors[0])
      return
    }

    const { error: loginError } = await login({
      email: formData.email,
      password: formData.password
    })

    if (loginError) {
      setError(loginError)
      return
    }

    setIsAuthenticated(true)
    router.push('/')
  }

  return (
    <>
      <h1 className='text-4xl font-bold'>Log In</h1>
      <div className='flex flex-1 items-center justify-center'>
        <form onSubmit={onSubmit} className="relative w-full sm:w-96">
          <div className='flex flex-col mb-8'>
            <Input
              name='email'
              label='Email'
              value={formData.email}
              onChange={onChange}
              className='w-full'
            />
            <Input
              type='password'
              name='password'
              label='Password'
              value={formData.password}
              onChange={onChange}
              className='w-full'
            />
          </div>
          {error && <p className="text-sm text-red-600 absolute bottom-38">{capitalize(error)}</p>}
          <Button type='submit' className='w-full mb-4' isDisabled={isLoading}>
            Login
            <ArrowRightIcon size={24} weight="bold" className="ml-1" />
          </Button>
          <div className="flex flex-col float-right">
            <Link href="/signup" className="text-right underline">Sign up</Link>
            <Link href="/forgot-password" className="text-right underline">Forgot your password?</Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Page
