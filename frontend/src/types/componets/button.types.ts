export interface ButtonProps<T>  {
    children : React.ReactNode , 
    href: string , 
    className: string , 
    unussual: boolean , 
    isDisabeled: boolean
    rest : T
    target?: '_blank' | null , 
    rel?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    type?: 'button' | 'submit' | 'reset' , 
    title : string
    onPointerLeave?: React.PointerEventHandler<HTMLButtonElement | HTMLAnchorElement>
}