import SideDrawer from "./Components/SideDrawer";
import '@h5web/lib/styles.css'
import { LineVis, getDomain } from '@h5web/lib';
import ndarray from 'ndarray';
import { useState } from "react";

export default function GraphPage() {
    // const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // const yEqual2X = x.map(x => 2 * x); // Line for y = 2x
    // const yArray = ndarray(yEqual2X)
    // const xydomain = getDomain(yArray);

    const [xValues, setXValues] = useState<number[]>([]);
    const [domain, setDomain] = useState(null);
    const [dataArray, setDataArray] = useState(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
    
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const content = reader.result as string;
                const lines = content.split('\n');
                const xVals: number[] = [];
                const yVals: number[] = [];
    
                lines.forEach((line) => {
                    const [x, y] = line.trim().split(/\s+/); // Split by space or tabs
                    if (x && y) {
                        xVals.push(parseFloat(x)); // Parse x values
                        yVals.push(parseFloat(y)); // Parse y values
                    }
                });
    
            setXValues(xVals);
            const yArray = ndarray(yVals);
            setDataArray(yArray);
            const calculatedDomain = getDomain(yArray);
            setDomain(calculatedDomain);
          };
    
          reader.readAsText(file); // Read the file as text
        }
      };
    
    

  return (
    <>
        <SideDrawer />
        {/* <LineVis dataArray={yArray} domain={xydomain} title="y=2x" showGrid /> */}
        <h1>Graph Page - ORCA Data</h1>
        <h2>Upload `.stk` or `.dat` file to visualize</h2>
        <input type="file" onChange={handleFileUpload} />

        {dataArray && domain ? (
            <LineVis
            dataArray={dataArray}                   // Y-axis values from the uploaded file
            domain={domain}                         // Calculated domain
            abscissaParams={{ value: xValues }}     // X-axis values
            showGrid                                // Display grid lines
            />
        ) : (
            <p>Please upload a valid `.stk` or `.dat` file to view the graph.</p>
        )}
    </>
  );
}