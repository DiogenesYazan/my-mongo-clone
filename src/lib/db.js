// lib/db.js
import { join } from 'path'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// Caminho para o arquivo JSON
const file = join(process.cwd(), 'data', 'db.json')
// Adapter que lê e escreve JSON
const adapter = new JSONFile(file)
// Dados padrão: aqui definimos users e docs como arrays vazios
const defaultData = { users: [], docs: [] }

// Passe o defaultData ao criar o Low
const db = new Low(adapter, defaultData)

// Agora faça a leitura e, se o arquivo não existir, ele usará defaultData
await db.read()
// (Opcional) Escrita imediata para criar o arquivo com defaultData
await db.write()

export default db
