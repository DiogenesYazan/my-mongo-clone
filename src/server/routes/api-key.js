// src/server/routes/api-key.js
import { Router } from 'express'
import { randomBytes } from 'crypto'
import db from '../../lib/db'
import authenticate from '../middleware/auth'

const router = Router()

// GET /api/api-key - retorna a chave atual do usuário
router.get('/', authenticate, async (req, res) => {
  await db.read()
  const user = db.data.users.find(u => u.id === req.userId)
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })
  return res.json({ key: user.apiKey || null })
})

// POST /api/api-key - gera/regenera a chave API do usuário
router.post('/', authenticate, async (req, res) => {
  await db.read()
  const userIndex = db.data.users.findIndex(u => u.id === req.userId)
  if (userIndex === -1) return res.status(404).json({ error: 'Usuário não encontrado' })

  // Gera chave de 32 bytes em hexadecimal
  const newKey = randomBytes(32).toString('hex')
  db.data.users[userIndex].apiKey = newKey
  await db.write()

  return res.json({ key: newKey })
})

export default router
