import useOverlay from "@/hooks/useOverlay"
import { OverlayContext } from "@/context/OverlayContext"
import { IOverlayContext } from "@/types/providers.interfaces"
import React  from "react"


export default function OverlayProvider({ children } : { children: React.ReactNode }) {
    const { hasOpened, onClose } : IOverlayContext = useOverlay()

    return (
        <OverlayContext.Provider value={{ hasOpened, onClose }}>
            {children}
        </OverlayContext.Provider>
    )
}