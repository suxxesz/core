export const formatLastSeen = (timestamp : number) : string => {
    if (!timestamp) return 'unknown'

    const diff = Date.now() - timestamp

    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes} min ago`
    if (hours < 24) return `${hours} h ago`

    return `${days} d ago`
  }