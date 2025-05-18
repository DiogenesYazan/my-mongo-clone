// src/pages/dashboard.jsx
import { useState, useEffect } from 'react'
import styles from '../styles/dashboard.module.css'

export default function Dashboard() {
  const [docs, setDocs] = useState([])
  const [newDoc, setNewDoc] = useState('{}')
  const [apiKey, setApiKey] = useState('')
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchDocs()
    fetchApiKey()
  }, [])

  const fetchDocs = async () => {
    const res = await fetch('/api/docs')
    if (res.ok) {
      const data = await res.json()
      setDocs(data)
    }
  }

  const fetchApiKey = async () => {
    const res = await fetch('/api/api-key')
    if (res.ok) {
      const { key } = await res.json()
      setApiKey(key)
    }
  }

  const handleCreateDoc = async () => {
    try {
      const json = JSON.parse(newDoc)
      const res = await fetch('/api/docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json),
      })
      if (res.ok) {
        setNewDoc('{}')
        fetchDocs()
      } else {
        alert('Erro ao criar documento')
      }
    } catch {
      alert('JSON inválido')
    }
  }

  const handleDeleteDoc = async (id) => {
    if (!confirm('Tem certeza que deseja excluir?')) return
    const res = await fetch(`/api/docs/${id}`, { method: 'DELETE' })
    if (res.ok) fetchDocs()
  }

  const handleViewDoc = (doc) => {
    setSelectedDoc(doc)
    setShowModal(true)
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey)
    alert('Chave API copiada!')
  }

  const handleGenerateKey = async () => {
    const res = await fetch('/api/api-key', { method: 'POST' })
    if (res.ok) {
      const { key } = await res.json()
      setApiKey(key)
    } else {
      alert('Erro ao gerar chave')
    }
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>MyMongoClone</div>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a className={`${styles.navLink} ${styles.navLinkActive}`} href="#">Dashboard</a>
          </li>
          <li className={styles.navItem}>
            <button className={styles.navLink} onClick={fetchApiKey}>Chave API</button>
          </li>
        </ul>
      </aside>

      <header className={styles.topbar}>
        <div className={styles.topbarTitle}>Dashboard</div>
        <div className={styles.topbarUser}>
          <div className={styles.topbarAvatar} />
          <span>Olá, usuário</span>
        </div>
      </header>

      <main className={styles.main}>
        {/* Seção de Chave API */}
        <section className={styles.apiSection}>
          <h3 className={styles.metricTitle}>Sua Chave API</h3>
          {apiKey ? (
            <div className={styles.apiControls}>
              <pre className={styles.apiKey}>{apiKey}</pre>
              <button className={styles.button} onClick={handleCopyKey}>Copiar Chave</button>
              <button className={styles.button} onClick={handleGenerateKey}>Gerar Nova Chave</button>
            </div>
          ) : (
            <button className={styles.button} onClick={handleGenerateKey}>Gerar Chave API</button>
          )}
        </section>

        {/* Seção de Criação de Documento */}
        <section className={styles.createSection}>
          <h3 className={styles.metricTitle}>Criar Documento JSON</h3>
          <textarea
            rows="6"
            className={styles.input}
            value={newDoc}
            onChange={(e) => setNewDoc(e.target.value)}
          />
          <button className={styles.button} onClick={handleCreateDoc}>Criar</button>
        </section>

        {/* Seção de Lista de Documentos */}
        <section className={styles.listSection}>
          <h3 className={styles.chartTitle}>Meus Documentos</h3>
          <table className={styles.docsTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.id}</td>
                  <td>
                    <button onClick={() => handleViewDoc(doc)}>Ver</button>
                    <button onClick={() => handleDeleteDoc(doc.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Modal de Visualização JSON */}
        {showModal && (
          <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={() => setShowModal(false)}>×</button>
              <pre className={styles.jsonView}>{JSON.stringify(selectedDoc.data, null, 2)}</pre>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
