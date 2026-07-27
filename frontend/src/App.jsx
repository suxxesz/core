import './styles' 
import  Router  from './Router'
import MainPage from './pages/MainPage'
import FormPage from './pages/FormPage'

const routes = {
  '/' : MainPage,
  '/form' : FormPage , 
  '*' : () => <h1>404 Not Found</h1>
}

function App() {
  return (
    <Router routes={routes}/>
  )
}
export default App
