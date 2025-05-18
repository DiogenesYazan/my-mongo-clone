// src/pages/api/[...all].js
import server from './server.js'    // ajuste o caminho se necessário
export const config = { api: { bodyParser: true, externalResolver: true } }
export default server
