type Molecule3DProps = {
    color: string,
    moleculedata: string
}

function Molecule3D(props: Molecule3DProps) {
        const script = document.createElement('script');
        
        script.src = "https://3Dmol.org/build/3Dmol.js";
        script.async = true
        script.className = "3dmolscript"
        script.onload = () => {
            const existingViewers = document.querySelectorAll("#undefined")
            console.log(existingViewers);
            
            if (existingViewers.length!=0) {
                for (let index = 0; index < existingViewers.length; index++) {
                    existingViewers[index].remove()
                }
            }
            const viewer = $3Dmol.createViewer( document.querySelector('#container-01') );
            const v = viewer
            v.clear()
            v.addModel(props.moleculedata, "xyz")
            v.setStyle({}, {stick: {color: 'spectrum'}});
            v.setBackgroundColor(props.color)
            v.zoomTo();
            v.render();
        }
      
        document.head.appendChild(script);
      
    return (<div id="container-01" className="mol-container" style={{height: "400px", width: "400px", position: 'relative', margin: 'auto'}} />)
}

export default Molecule3D;