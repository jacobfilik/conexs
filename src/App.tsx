import './App.css'
import { Route, Routes } from 'react-router-dom'
import GraphPage from './GraphPage'
import MoleculeViewer from './Components/MoleculeViewer'

function App() {
  return (
    <>
      <Routes>
        <Route path='/Conexs' element={<MoleculeViewer />} />
        <Route path='/Conexs/graph' element={<GraphPage />} />
      </Routes>
    </>
  )
}

export default App