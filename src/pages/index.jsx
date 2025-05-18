// src/pages/login.jsx
import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/component.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (res.ok) return router.push('/dashboard')
    alert('Credenciais inválidas')
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.cardHeader}>
          <img src="/images/mongo-logo.svg" alt="Logo MongoDB" />
          <h2>Faça seu login</h2>
        </header>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className={styles.button} type="submit">
            Entrar
          </button>
        </form>
        <a className={styles.link} href="/signup">
          Não tem conta? Crie uma aqui
        </a>
      </div>
    </div>
  )
}
