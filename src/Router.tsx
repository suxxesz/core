import React , { useEffect, useState } from 'react';

export const useRoute = () => {
    const [path , setPath] = useState<string>(window.location.pathname)

    useEffect(() => {
        const onLocationChange = () => {
            setPath(window.location.pathname)
        }
        window.addEventListener('popstate' , onLocationChange)
        return () => {
            window.removeEventListener('popstate' , onLocationChange)
        }
    } , [])

    return path

}

const Router = ({routes} : {routes : Record<string , string>}) => {


    const path = useRoute()

    const Component = routes[path] || routes['*']

    return <Component/>


}

export default Router