import { TextField } from "@mui/material";

type Molecule3DProps = {
    moleculedata: string,
    setmoleculeData: (moleculedata: string)=> void
}

function MoleculeDataTextArea(props: Molecule3DProps) {
      
    return (
        <TextField
        id="datafilebox"
        label="Molecule Data"
        multiline
        rows={30}
        defaultValue={props.moleculedata}
        sx={{m: 2, width: "100%"}}
        onChange={(e) => props.setmoleculeData(e.target.value)} style={{resize: "none"}}
      />
)}

export default MoleculeDataTextArea;