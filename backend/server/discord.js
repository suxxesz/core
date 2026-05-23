import { Client, GatewayIntentBits } from 'discord.js'

const lastSeenMap = {}

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
})

client.on('presenceUpdate', (oldPresence, newPresence) => {
  if (!newPresence?.userId) return

  // ← был баг: `=== 'offline' !== 'offline'` всегда false
  if (oldPresence?.status !== 'offline' && newPresence?.status === 'offline') {
    lastSeenMap[newPresence.userId] = Date.now()
  }
})

client.once('ready', () => {
  console.log(`Bot ready as ${client.user.tag}`)
})

export { lastSeenMap }