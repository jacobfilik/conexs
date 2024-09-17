type Molecule3DProps = {
    color: string,
    moleculedata: string
}

function Molecule3D(props: Molecule3DProps) {
        const script = document.createElement('script');
        let isRendering = false;
        let renderRequestId: number | null = null;

        script.src = "https://3Dmol.org/build/3Dmol.js";
        script.async = true
        script.className = "3dmolscript"
        script.onload = () => {
            const existingViewers = document.querySelectorAll("#undefined")
            
            if (existingViewers.length!=0) {
                for (let index = 0; index < existingViewers.length; index++) {
                    existingViewers[index].remove()
                }
            }


            function renderViewer() {
                if (!isRendering) {
                    isRendering = true;

                    renderRequestId = window.requestAnimationFrame(() => {
                        const viewer = $3Dmol.createViewer(document.querySelector('#container-01'));
                        const v = viewer;
                        const m = v.addModel(props.moleculedata, 'xyz');
                        
                        v.addUnitCell(m, { box: { color: 'purple' }, alabel: 'X', blabel: 'Y', clabel: 'Z' });
                        v.setStyle({}, { stick: { color: 'spectrum' } });
                        v.setBackgroundColor(props.color);
                        v.zoomTo();
                        v.render();
    
                        isRendering = false;
                    });
                }
            }
            renderViewer();
        }

        document.head.appendChild(script);

        function cleanup() {
            if (renderRequestId !== null) {
                window.cancelAnimationFrame(renderRequestId);
            }
        }
        window.addEventListener('beforeunload', cleanup);
      
    return (<div id="container-01" className="mol-container" style={{height: "800px", width: "800px", position: 'relative', margin: 'auto'}} />)
}

export default Molecule3D;