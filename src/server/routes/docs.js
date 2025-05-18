import { Router } from 'express'
import db from '../../lib/db'
import authenticate from '../middleware/auth'

const router = Router()

router.use(authenticate)

// Listar documentos
router.get('/', async (req, res) => {
  await db.read()
  const docs = db.data.docs.filter(d => d.userId === req.userId)
  res.json(docs)
})

// Criar documento
router.post('/', async (req, res) => {
  await db.read()
  const doc = { id: Date.now().toString(), userId: req.userId, data: req.body }
  db.data.docs.push(doc)
  await db.write()
  res.status(201).json(doc)
})

// Editar documento
router.put('/:id', async (req, res) => {
  await db.read()
  const idx = db.data.docs.findIndex(d => d.id === req.params.id && d.userId === req.userId)
  if (idx === -1) return res.status(404).end()
  db.data.docs[idx].data = req.body
  await db.write()
  res.json(db.data.docs[idx])
})

// Deletar documento
router.delete('/:id', async (req, res) => {
  await db.read()
  db.data.docs = db.data.docs.filter(d => !(d.id === req.params.id && d.userId === req.userId))
  await db.write()
  res.status(204).end()
})

export default router
