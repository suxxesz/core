import useOverlay from "@/hooks/useOverlay"
import { OverlayContext } from "@/context/OverlayContext"
//@ts-ignore
import { IOverlayContext } from "@/types/providers/overlay.types"
import React  from "react"


export default function OverlayProvider({ children } : { children: React.ReactNode }) {
    const { hasOpened, onClose } : IOverlayContext = useOverlay()

    return (
        <OverlayContext.Provider value={{ hasOpened, onClose }}>
            {children}
        </OverlayContext.Provider>
    )
}