import { Router } from 'express'
import db from '../db.js'

const router = Router()

// POST /applications — принять заявку с формы
router.post('/', (req, res) => {
  const { discord_id, name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Заполните все обязательные поля' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Некорректный email' })
  }

  const stmt = db.prepare(`
    INSERT INTO applications (discord_id, name, email, message)
    VALUES (@discord_id, @name, @email, @message)
  `)

  const result = stmt.run({ discord_id: discord_id || null, name, email, message })

  res.status(201).json({
    id: result.lastInsertRowid,
    message: 'Заявка принята',
  })
})

// GET /applications — получить все заявки (для админки)
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM applications ORDER BY created_at DESC').all()
  res.json(rows)
})

// PATCH /applications/:id/status — обновить статус заявки
router.patch('/:id/status', (req, res) => {
  const { status } = req.body
  const allowed = ['pending', 'approved', 'rejected']

  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `Статус должен быть: ${allowed.join(', ')}` })
  }

  const stmt = db.prepare('UPDATE applications SET status = ? WHERE id = ?')
  const result = stmt.run(status, req.params.id)

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Заявка не найдена' })
  }

  res.json({ message: 'Статус обновлён' })
})

export default router