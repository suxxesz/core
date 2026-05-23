import { OverlayContext } from "@/context/OverlayContext"
import useOverlay from "@/hooks/useOverlay"

export default function OverlayProvider({ children }) {
    const { hasOpened, onClose } = useOverlay()

    return (
        <OverlayContext.Provider value={{ hasOpened, onClose }}>
            {children}
        </OverlayContext.Provider>
    )
}