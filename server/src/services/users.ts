import { prisma } from '@/prismaClient.js'
import { hashPassword } from '@/services/auth.js'

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await hashPassword(password)

  const data = { email, password: hashedPassword }
  const user = await prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
    }
  })
  return user
}

export const getUserByIdOrEmail = async ({ id, email } : { id?: number, email?: string }) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { id },
        { email },
      ],
    },
    select: {
      id: true,
      email: true,
      password: true,
      firstName: true,
      lastName: true,
    }
  })
  return user
}