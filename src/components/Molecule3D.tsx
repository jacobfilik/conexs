import { useEffect, useRef } from "react";
import * as mol3d from "3dmol";

interface Molecule3DProps {
  color: string;
  moleculedata: string;
  style: string;
  orbital: Orbital | null;
}

interface Orbital {
  cubeData: string;
  transferfn: TransferFunction;
}

export interface TransferFunction {
  positiveColor: string;
  negativeColor: string;
  positiveMin: number;
  positiveMax: number;
  negativeMin: number;
  negativeMax: number;
}

function Molecule3D(props: Molecule3DProps) {
  const moleculeViewer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (moleculeViewer.current) {
      const existingViewers = moleculeViewer.current.children;
      if (existingViewers.length != 0) {
        for (let index = 0; index < existingViewers.length; index++) {
          existingViewers[index].remove();
        }
      }
    }

    const viewer = mol3d.createViewer(moleculeViewer.current, {
      backgroundColor: props.color,
    });
    const model = viewer.addModel(props.moleculedata, "xyz");
    if (props.style == "Stick") {
      viewer.setStyle({}, { stick: { color: "spectrum" } });
    } else if (props.style == "Sphere") {
      viewer.setStyle({}, { sphere: { color: "spectrum", radius: 1 } });
    }
    viewer.addUnitCell(model, {
      box: { color: "purple" },
      alabel: "X",
      blabel: "Y",
      clabel: "Z",
    });

    if (props.orbital) {
      const voldata = new mol3d.VolumeData(props.orbital.cubeData, "cube");

      const {
        positiveColor,
        negativeColor,
        positiveMin,
        positiveMax,
        negativeMin,
        negativeMax,
      } = props.orbital.transferfn;

      viewer.addVolumetricRender(voldata, {
        transferfn: [
          { color: positiveColor, opacity: 0.075, value: positiveMax },
          { color: positiveColor, opacity: 0.001, value: positiveMin },
          { color: "white", opacity: 0, value: 0 },
          { color: negativeColor, opacity: 0.001, value: negativeMin * -1 },
          { color: negativeColor, opacity: 0.075, value: negativeMax * -1 },
        ],
      });
    }

    viewer.zoomTo();
    viewer.render();
  });

  return (
    <div
      ref={moleculeViewer}
      style={{ height: "100%", width: "100%", position: "relative" }}
    />
  );
}

export default Molecule3D;
