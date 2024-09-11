import { useEffect } from "react";
import $ from 'jquery'

type Molecule3DProps = {
    color: string
}

function Molecule3D(props: Molecule3DProps) {
    useEffect(() => {
        const script = document.createElement('script');
        
        script.src = "https://3Dmol.org/build/3Dmol.js";
        script.async = true
        script.className = "3dmolscript"
        script.onload = () => {
            const viewer = $3Dmol.createViewer( document.querySelector('#container-01') );
            const path = './src/assets/pyridine.xyz'
            $.ajax(path, {
                success: function(data){
                    const v = viewer
                    v.addModel(data, "xyz")
                    v.setStyle({}, {stick: {color: 'spectrum'}});
                    v.setBackgroundColor(props.color)
                    v.zoomTo();
                    v.render();
                }
            })
        }
      
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script)
        }
      }, [props.color]);
      
    return (<div id="container-01" className="mol-container" style={{height: "400px", width: "400px", position: 'relative', margin: 'auto'}} />)
}

export default Molecule3D;