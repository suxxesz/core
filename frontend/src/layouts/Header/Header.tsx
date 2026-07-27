import DarkThemeSwitcher from '@/components/DarkThemeSwitcher'
import LoudBar from '@/components/LoudBar'
import './Header.scss'

export default ({isSongRequired} : { isSongRequired: boolean }) => { 
    
return (
        <> 
        <header className='header' >
           {isSongRequired && <LoudBar/>}
            <DarkThemeSwitcher />
        </header> 
        </>
    )
}