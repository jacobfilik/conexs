import { useState } from 'react'
import './App.css'
import Molecule3D from './Components/Molecule3D'
import MoleculeDataTextArea from './Components/moleculeDataTextArea'

function App() {

  const [color, setcolor] = useState("#00FFFF")
  const [moleculedata, setmoleculeData] = useState('5\nLattice="2.8910999499435217 0.0 0.0 -1.4455499749717609 2.503766001531009 0.0 0.0 0.0 12.0" size="1 1" sym_prec=0.3\nV        0.163920355   2.010556463  5.207822443\nV        1.659549808   1.146964790  2.792551218\nC        0.186758046   0.323055004  4.000202257\nO        1.641249387   1.157827410  6.208219945\nO        0.182400454   2.000036854  1.792200686')
  
  return (
    <>
        <h1>3D Molecule Viewer</h1>
        <Molecule3D key={color} color={color} moleculedata={moleculedata} />
        <input type="color" value={color} onChange={(e) => {
          setcolor(e.target.value)}}/>
        <MoleculeDataTextArea moleculedata={moleculedata} setmoleculeData={setmoleculeData} />
        {/* Count lines instead
        atom line format is symbol then three numbers
        Validation
        Make it look nice with MUI
        */}
    </>
  )
}

export default App