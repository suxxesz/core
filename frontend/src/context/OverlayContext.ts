import { createContext } from 'react'

export const OverlayContext = createContext({
    hasOpened: false,
    onClose: () => {},
})