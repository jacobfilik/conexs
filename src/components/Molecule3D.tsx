import { useEffect, useRef } from "react";
import * as mol3d from '3dmol';

type Molecule3DProps = {
    color: string,
    moleculedata: string,
    style: string
}

function Molecule3D(props: Molecule3DProps) {
    const moleculeViewer = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (moleculeViewer.current) {
            const existingViewers = moleculeViewer.current.children
            if (existingViewers.length!=0) {
                for (let index = 0; index < existingViewers.length; index++) {
                    existingViewers[index].remove()
                }
            }
        }

        const viewer = mol3d.createViewer(moleculeViewer.current, { backgroundColor: props.color });
        const model = viewer.addModel(props.moleculedata, 'xyz');
        if (props.style == "Stick"){
            viewer.setStyle({}, { stick: { color: 'spectrum' } });
        } else if (props.style == "Sphere"){
            viewer.setStyle({}, { sphere: { color: 'spectrum', radius: 1 }})
        }
        viewer.addUnitCell(model, { box: { color: 'purple' }, alabel: 'X', blabel: 'Y', clabel: 'Z' });
        viewer.zoomTo();
        viewer.render();
    })
      
    return (<div ref={moleculeViewer} style={{height: "100%", width: "100%", position: 'relative'}} />)
}

export default Molecule3D;