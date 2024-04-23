import './App.css'

import { Routes, Route } from 'react-router-dom'

// For Layout
import Navbar from './Layout/Navbar/Navbar'

// For Pages
import Home from './Pages/Home/Home'
import Delete from './Pages/Delete/Delete'
import View from './Pages/View/View'
import Edit from './Pages/Edit/Edit'
import Add from './Pages/Add/Add'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={[<Navbar />, <Home />]}> </Route>
        <Route path='/Delete/:id' element={[<Navbar />, <Delete />]}> </Route>
        <Route path='/View/:id' element={[<Navbar />, <View />]}> </Route>
        <Route path='/Edit/:id' element={[<Navbar />, <Edit />]}> </Route>
        <Route path='/Add' element={[<Navbar />, <Add />]}> </Route>
      </Routes>

    </>
  )
}

export default App
