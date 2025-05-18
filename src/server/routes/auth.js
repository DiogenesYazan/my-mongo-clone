// src/server/routes/auth.js
import { Router } from 'express'
import db from '../../lib/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = Router()

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body
  await db.read()
  if (db.data.users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Usuário já existe' })
  }
  const hash = await bcrypt.hash(password, 10)
  const user = { id: Date.now().toString(), email, password: hash }
  db.data.users.push(user)
  await db.write()
  res.status(201).json({ ok: true })
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
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
  res.setHeader(
    'Set-Cookie',
    `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60}`
  )
  res.json({ ok: true })
})

export default router
