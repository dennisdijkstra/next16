import { RequestHandler } from 'express'
import { prisma } from '@/prismaClient.js'
import redis from '@/redisClient.js'
import { getUserByIdOrEmail } from '@/services/users.js'

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.body.user || req.params
  const user = await getUserByIdOrEmail({ id: parseInt(id) })

  delete user.password
  redis.set(req.originalUrl, JSON.stringify(user))

  res.status(200).json({ ...user })
}

export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params
  const { firstName, lastName } = req.body

  const user = await prisma.user.update({
    where: { id: parseInt(id)  },
    data: { firstName, lastName },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    }
  })

  res.status(200).json({ ...user })
}

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params

  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id)  },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    }
  })

  res.status(200).json({ ...deletedUser })
}

