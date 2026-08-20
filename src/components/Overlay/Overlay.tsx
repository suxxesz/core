import React , { useContext } from "react"
import Button from "../Button"
import { OverlayContext } from "@/context/OverlayContext"
import './Overlay.scss'
import { X , Bell } from "lucide-react"
import clsx from "clsx"
import { IOverlayContext } from "@/types/providers.interfaces"


export default function Overlay({ children } : {children: React.ReactNode}) {
    const { onClose, hasOpened } : IOverlayContext = useContext(OverlayContext)

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
