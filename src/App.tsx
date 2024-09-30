import { useState } from 'react'
import './App.css'
import Molecule3D from './Components/Molecule3D'
import MoleculeDataTextArea from './Components/moleculeDataTextArea'
import { Box, Grid2, Tooltip, Typography } from '@mui/material'
import StyleToggle from './Components/StyleToggle'

function App() {

  const [color, setcolor] = useState("#3465A4")
  const [style, setStyle] = useState("Stick");
  const [moleculedata, setmoleculeData] = useState('5\nLattice="2.8910999499435217 0.0 0.0 -1.4455499749717609 2.503766001531009 0.0 0.0 0.0 12.0" size="1 1" sym_prec=0.3\nV        0.163920355   2.010556463  5.207822443\nV        1.659549808   1.146964790  2.792551218\nC        0.186758046   0.323055004  4.000202257\nO        1.641249387   1.157827410  6.208219945\nO        0.182400454   2.000036854  1.792200686')

  return (
    <>
      <Typography variant='h1' sx={{textAlign: "center"}}>3D Molecule Viewer</Typography>
      <Grid2 container spacing={2} sx={{}}>
        <Grid2 size={6} sx={{display: "grid", gridAutoRows: "80% 20%", margin: 2, gap: 3}}>
          <Molecule3D key={color} color={color} moleculedata={moleculedata} style={style} />
          <Box sx={{textAlign: "center"}}>
            <Tooltip title="Change Background Colour" arrow>
              <input style={{margin: "50px"}} type="color" value={color} onChange={(e) => {setcolor(e.target.value)}}/>
            </Tooltip>
            <StyleToggle style={style} setStyle={setStyle} />
          </Box>
        </Grid2>
        <Grid2 size={5}>
          <div style={{position: "relative"}}>
            <MoleculeDataTextArea moleculedata={moleculedata} setmoleculeData={setmoleculeData} />
          </div>
        </Grid2>
      </Grid2>
    </>
  )
}

export default App