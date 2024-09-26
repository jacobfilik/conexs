import { TextField } from "@mui/material";

type Molecule3DProps = {
    moleculedata: object,
    setmoleculeData: (moleculedata: string)=> void
}

function MoleculeDataTextArea(props: Molecule3DProps) {
      
    return (
        <>
        <TextField
            id="atomBox"
            label="Atoms"
            defaultValue={props.moleculedata["atoms"]}
            sx={{m: 2, width: "64px"}}
            disabled
        />
        <TextField
            id="Comment/Lattice"
            label="Comment/Lattice"
            defaultValue={props.moleculedata["comments"]}
            sx={{m: 2, width: "calc(100% - 128px)"}}
        />
        <TextField
        id="datafilebox"
        label="Molecule Data"
        multiline
        rows={30}
        defaultValue={props.moleculedata["data"]}
        sx={{m: 2, width: "100%"}}
        onChange={(e) => props.setmoleculeData(e.target.value)} style={{resize: "none"}}
      />
      </>
)}

export default MoleculeDataTextArea;