import Register from './components/Register'
import './App.css'
import {Toaster} from 'react-hot-toast';
import Homepage from './components/Homepage';
import {Routes,Route} from 'react-router-dom'
import Verification from './components/Verification';
import CategoryPage from './components/Categorypage';
function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/verification' element={<Verification/>}/>
      <Route path='/homepage' element={<Homepage/>}/>
      <Route path="/category/:categoryName" element={<CategoryPage />} />
    </Routes>
    <Toaster/>
      
     
      
    </>
  )
}

export default App
