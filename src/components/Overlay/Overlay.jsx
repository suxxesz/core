import { useContext } from "react"
import Button from "../Button"
import './Overlay.scss'
import { OverlayContext } from "@/context/OverlayContext"
import { X , Bell } from "lucide-react"
import clsx from "clsx"

export default function Overlay({ children }) {
    const { onClose, hasOpened } = useContext(OverlayContext)

    if (!hasOpened) return null

    return (
        <figure className={clsx("overlay" , hasOpened ? 'overlay--visible' : '')}>
            <div className="overlay__icon">
                <Bell size={18} />
            </div>

            <div className="overlay__content">
                <h3 className="overlay__title">Need to contact with me as fast as possible?</h3>
                <div className="overlay__subtitle-wrapper">
                    <span className="overlay__subtitle">{children}</span>
                    <div className="overlay__dot" />
                </div>
            </div>


            <Button
                className="overlay__close-button"
                onClick={onClose}
            >
                <X
                    className="icon-switcher overlay__close-icon overlay__close-button-icon"
                    size={12}
                />
            </Button>
        </figure>
    )
}
