// src/server/middleware/auth.js
import jwt from 'jsonwebtoken'

export default function authenticate(req, res, next) {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ error: 'Não autenticado' })
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = userId
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' })
  }
}
