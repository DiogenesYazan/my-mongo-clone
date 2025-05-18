// pages/api/docs/[id].js
import db from '../../../lib/db'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  const token = req.cookies.token
  if (!token) return res.status(401).json({ error: 'Não autenticado' })
  let payload
  try { payload = jwt.verify(token, process.env.JWT_SECRET) }
  catch { return res.status(401).json({ error: 'Token inválido' }) }

  await db.read()
  const { id } = req.query  // rota dinâmica via [id].js :contentReference[oaicite:7]{index=7}

  // PUT: atualiza o documento
  if (req.method === 'PUT') {
    const idx = db.data.docs.findIndex(d => d.id === id && d.userId === payload.userId)
    if (idx < 0) return res.status(404).end()
    db.data.docs[idx].data = req.body
    await db.write()
    return res.status(200).json(db.data.docs[idx])
  }
  
  // DELETE: exclui o documento
  if (req.method === 'DELETE') {
    db.data.docs = db.data.docs.filter(d => !(d.id === id && d.userId === payload.userId))
    await db.write()
    return res.status(204).end()
  }

  res.setHeader('Allow', ['PUT','DELETE'])
  return res.status(405).end(`Método ${req.method} não permitido`)
}
