type Molecule3DProps = {
    moleculedata: string,
    setmoleculeData: (moleculedata: string)=> void
}

function MoleculeDataTextArea(props: Molecule3DProps) {
      
    return (<textarea name="" rows={15} cols={30} id="datafilebox" value={props.moleculedata} onChange={(e) => props.setmoleculeData(e.target.value)}></textarea>)
}

export default MoleculeDataTextArea;