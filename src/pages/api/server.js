// src/pages/api/server.js
import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from '../../server/routes/auth'
import docsRoutes from '../../server/routes/docs'
import apiKeyRoutes from '../../server/routes/api-key'

const app = express()
app.use(express.json())
app.use(cookieParser())

// todas as rotas /api/auth/* vão para authRoutes
app.use('/auth', authRoutes)
// /api/docs/* para suas rotas de documentos
app.use('/docs', docsRoutes)
// /api/api-key/* para suas rotas de API Key
app.use('/api-key', apiKeyRoutes)

export default app
