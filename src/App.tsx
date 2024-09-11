import { useState } from 'react'
import './App.css'
import Molecule3D from './Components/Molecule3D'

function App() {

  const [color, setcolor] = useState("#00FFFF")
  
  return (
    <>
        <h1>3D Molecule Viewer</h1>
        <Molecule3D key={color} color={color} />
        <input type="color" value={color} onChange={(e) => {
          setcolor(e.target.value)}}/>
    </>
  )
}

export default App