// src/pages/api/api-key.js

import { randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'
import db from '../../lib/db'

export default async function handler(req, res) {
  // 1. Verifica método
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET','POST'])
    return res.status(405).json({ error: `Método ${req.method} não permitido` })
  }

  // 2. Autentica via JWT no cookie
  const token = req.cookies.token
  if (!token) return res.status(401).json({ error: 'Não autenticado' })

  let payload
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }
  const userId = payload.userId

  // 3. Lê base e busca usuário
  await db.read()
  const user = db.data.users.find(u => u.id === userId)
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })

  // 4. GET: retorna chave atual (ou null)
  if (req.method === 'GET') {
    return res.status(200).json({ key: user.apiKey || null })
  }

  // 5. POST: gera/regenera chave, salva e retorna
  const newKey = randomBytes(32).toString('hex')
  user.apiKey = newKey
  await db.write()
  return res.status(200).json({ key: newKey })
}
