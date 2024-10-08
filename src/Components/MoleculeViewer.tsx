import { useState } from 'react'
import Molecule3D from './Molecule3D'
import MoleculeDataTextArea from './moleculeDataTextArea'
import { Box, Grid2, Tooltip, Typography } from '@mui/material'
import StyleToggle from './StyleToggle'
import SideDrawer from './SideDrawer'

function MoleculeViewer() {

  const [color, setcolor] = useState("#3465A4")
  const [style, setStyle] = useState("Stick");
  const [moleculedata, setmoleculeData] = useState('12\nBenzene molecule\nC   0.000000  1.402720  0.000000\nH   0.000000  2.490290  0.000000\nC  -1.214790  0.701360  0.000000\nH  -2.156660  1.245150  0.000000\nC  -1.214790 -0.701360  0.000000\nH  -2.156660 -1.245150  0.000000\nC   0.000000 -1.402720  0.000000\nH   0.000000 -2.490290  0.000000\nC   1.214790 -0.701360  0.000000\nH   2.156660 -1.245150  0.000000\nC   1.214790  0.701360  0.000000\nH   2.156660  1.245150  0.000000')

  return (
    <>
      <SideDrawer />
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

export default MoleculeViewer