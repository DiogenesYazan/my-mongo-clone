// pages/api/auth/signup.js
import db from '../../../lib/db'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
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
}
