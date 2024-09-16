import { useState } from 'react'
import './App.css'
import Molecule3D from './Components/Molecule3D'

function App() {

  const [color, setcolor] = useState("#00FFFF")
  const [moleculedata, setmoleculeData] = useState("12\nglucose from 2gbp\nC  35.884  30.895  49.120\nC  36.177  29.853  50.124 \nC  37.296  30.296  51.074 \nC  38.553  30.400  50.259  \nC  38.357  31.290  49.044  \nC  39.559  31.209  48.082  \nO  34.968  30.340  48.234  \nN  34.923  29.775  50.910  \nO  37.441  29.265  52.113  \nO  39.572  30.954  51.086  \nN  37.155  30.858  48.364  \nO  39.261  32.018  46.920")
  
  return (
    <>
        <h1>3D Molecule Viewer</h1>
        <Molecule3D key={color} color={color} moleculedata={moleculedata} />
        <input type="color" value={color} onChange={(e) => {
          setcolor(e.target.value)}}/>
        <textarea name="" rows={15} cols={30} id="" value={moleculedata} onChange={(e) => setmoleculeData(e.target.value)}></textarea>
    </>
  )
}

export default App