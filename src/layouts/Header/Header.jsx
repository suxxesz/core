import DarkThemeSwitcher from '@/components/DarkThemeSwitcher'
import LoudBar from '@/components/LoudBar'
import './Header.scss'

export default (props) => { 
    const {isSongRequired} = props
return (
        <> 
        <header className='header' >
           {isSongRequired && <LoudBar/>}
            <DarkThemeSwitcher />
        </header> 
        </>
    )
}