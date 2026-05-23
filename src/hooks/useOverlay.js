import { useEffect, useRef, useState } from 'react'

const randomDelay = () => Math.floor(Math.random() * 10_000) + 5_000

const useOverlay = () => {
    const [hasOpened, setHasOpened] = useState(false)
    const timerRef = useRef(null)

    const scheduleOpen = () => {
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            setHasOpened(true)
        }, randomDelay())
    }

    const onClose = () => {
        setHasOpened(false)
    }

    useEffect(() => {
        scheduleOpen()
        return () => clearTimeout(timerRef.current)
    }, [])

    return { hasOpened, onClose }
}

export default useOverlay