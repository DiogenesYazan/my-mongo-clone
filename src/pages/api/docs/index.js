// pages/api/docs/index.js
import db from '../../../lib/db'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  await db.read()

  let userId

  // 1. Autenticação via API Key no header
  const apiKey = req.headers['x-api-key']
  if (apiKey) {
    const user = db.data.users.find(u => u.apiKey === apiKey)
    if (!user) {
      return res.status(401).json({ error: 'API Key inválida' })
    }
    userId = user.id
  } else {
    // 2. Autenticação via JWT no cookie
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ error: 'Não autenticado' })
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      userId = payload.userId
    } catch {
      return res.status(401).json({ error: 'Token inválido' })
    }
  }

  // 3. Rotas GET e POST
  if (req.method === 'GET') {
    const docs = db.data.docs.filter(d => d.userId === userId)
    return res.status(200).json(docs)
  }

  if (req.method === 'POST') {
    const data = req.body
    const doc = {
      id: Date.now().toString(),
      userId,
      data,
    }
    db.data.docs.push(doc)
    await db.write()
    return res.status(201).json(doc)
  }

  res.setHeader('Allow', ['GET','POST'])
  return res.status(405).end(`Método ${req.method} não permitido`)
}
