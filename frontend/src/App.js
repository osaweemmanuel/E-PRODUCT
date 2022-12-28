import {BrowserRouter,Routes,Route,} from 'react-router-dom'
import { Home,Error,Cart} from './pages'
import Navbar from './components/Navbar'

const App=()=>{
  return(
      <BrowserRouter>
       <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='cart' element={<Cart/>}/>
            <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App