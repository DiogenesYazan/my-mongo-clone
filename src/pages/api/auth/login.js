// src/pages/api/auth/login.js

import db from '../../../lib/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body

  await db.read()
  const user = db.data.users.find(u => u.email === email)
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ error: 'Credenciais inválidas' })

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
  // seta cookie HTTP-only
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`)
  return res.status(200).json({ ok: true })
}
