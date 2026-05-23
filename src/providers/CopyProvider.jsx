import { CopyContext } from '@/context/CopyContext'
import useCopy from '@/hooks/useCopy'
import { useEffect, useState } from 'react'
import ApiData from '@/config'
import getRawDiscordData from '@/api/discord/getRawDiscordData'
import { formatLastSeen } from '@/utils/formatLastSeen'

export default function CopyProvider({ children }) {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('offline')

  const {
    isCopied,
    countOfCopy,
    copyInner,
    copyOnClipboard,
    onMouseLeaveCopyState,
  } = useCopy()

  const { API_URL, USER_ID } = ApiData

  useEffect(() => {
    let isMounted = true

    const fetchUser = async () => {
      try {
        const data = await getRawDiscordData(
          API_URL,
          USER_ID
        )

        if (!isMounted) return

        setUser(data)
        setStatus(data?.status || 'offline')
      } catch (error) {
        console.error(
          'Failed to fetch discord user:',
          error
        )

        if (isMounted) {
          setStatus('offline')
        }
      }
    }

    fetchUser()

    const interval = setInterval(fetchUser, 10000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [API_URL, USER_ID])

  return (
    <CopyContext.Provider
      value={{
        subname: 'levi_v_',

        src: user?.avatar || '',

        id: '1337',

        name:
          user?.globalName ||
          user?.username ||
          'Unknown User',

        href: user?.id
          ? `https://discord.com/users/${user.id}`
          : '#',

        time: formatLastSeen(user?.lastSeen),

        status,

        isCopied,
        countOfCopy,
        copyInner,
        copyOnClipboard,
        onMouseLeaveCopyState,
      }}
    >
      {children}
    </CopyContext.Provider>
  )
}