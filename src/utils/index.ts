import 'dotenv/config'
import { verify } from 'jsonwebtoken'

interface JwtPayload {
  id: string
  email: string
  role: string
}

export const verifyAndDecodeToken = (header: string): JwtPayload => {
  const token = header.split(' ')[1]
  const payload = verify(token, process.env.JWT_SECRET) as JwtPayload

  if (!payload.id || !payload.email || !payload.role) {
    throw new Error('Invalid token')
  }

  return payload
}
