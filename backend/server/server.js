import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { client, lastSeenMap } from './discord.js'
import applicationsRouter from './routes/application.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())  // ← обязательно, иначе req.body будет undefined

// маршруты
app.use('/applications', applicationsRouter)

// маршрут бота
app.get('/users/:id', async (req, res) => {
  try {
    const guild = client.guilds.cache.get(process.env.GUILD_ID)

    if (!guild) return res.status(500).json({ error: 'Guild not found' })

    const member = await guild.members.fetch(req.params.id)
    const user = member.user

    res.json({
      id: user.id,
      username: user.username,
      globalName: user.globalName,
      avatar: user.displayAvatarURL({ size: 512 }),
      status: member.presence?.status || 'offline',
      lastSeen: lastSeenMap[user.id] || null,
    })
  } catch (err) {
    console.error(err)
    res.status(404).json({ error: 'User not found' })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`API running on port ${process.env.PORT}`)
})

client.login(process.env.TOKEN)