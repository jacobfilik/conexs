import './App.css'
import { Route, Routes } from 'react-router-dom'
import GraphPage from './GraphPage'
import MoleculeViewer from './Components/MoleculeViewer'
import FormPage from './FormPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/Conexs' element={<MoleculeViewer />} />
        <Route path='/Conexs/graph' element={<GraphPage />} />
        <Route path='/Conexs/form' element={<FormPage />} />
      </Routes>
    </>
  )
}

export default App