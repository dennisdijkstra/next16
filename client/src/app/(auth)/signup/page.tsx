'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import * as yup from 'yup'
import Link from 'next/link'
import { register as fetcher } from '@/api'
import { capitalize } from '@/utils'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { ArrowRightIcon } from '@phosphor-icons/react'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Your passwords do not match.'),
})

const Page = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  const router = useRouter()
  const { trigger: register, isMutating: isLoading } = useSWRMutation('auth/register', fetcher)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')

    setData({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await schema.validate(data, { abortEarly: false })
    } catch (error) {
      setError(error.errors[0])
      return
    }

    const { error: registerError } = await register({
      email: data.email,
      password: data.password
    })

    if (registerError) {
      setError(registerError)
      return
    }

    router.push('/')
  }

  return (
    <>
      <h1 className='text-4xl font-bold'>Sign Up</h1>
      <div className='flex flex-1 items-center justify-center'>
        <form onSubmit={onSubmit} className="relative w-full sm:w-96">
          <div className='flex flex-col mb-8'>
            <Input
              name='email'
              label='Email'
              value={data.email}
              onChange={onChange}
              className='w-full'
            />
            <Input
              type='password'
              name='password'
              label='Password'
              value={data.password}
              onChange={onChange}
              className='w-full'
            />
            <Input
              type='password'
              name='confirmPassword'
              label='Confirm password'
              value={data.confirmPassword}
              onChange={onChange}
              className='w-full'
            />
          </div>
          {error && <p className="text-sm text-red-600 absolute bottom-31">{capitalize(error)}</p>}
          <Button type='submit' className='w-full mb-4' isDisabled={isLoading}>
            Sign Up
            <ArrowRightIcon size={24} weight="bold" className="ml-1" />
          </Button>
          <Link href="/login" className="float-right underline">Log In</Link>
        </form>
      </div>
    </>
  )
}

export default Page
