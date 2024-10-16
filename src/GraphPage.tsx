import SideDrawer from "./Components/SideDrawer";
import '@h5web/lib/styles.css'
import { Domain, LineVis, getDomain } from '@h5web/lib';
import ndarray from 'ndarray';
import { useState } from "react";
import { Box, Typography } from "@mui/material";

export default function GraphPage() {
    const [xValues, setXValues] = useState<number[]>([]);
    const [domain, setDomain] = useState<Domain>();
    const [dataArray, setDataArray] = useState<ndarray.NdArray<number[]>>();

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
        <Typography variant='h1' sx={{textAlign: "center"}}>Graph Page</Typography>
        <Typography variant='h4' sx={{textAlign: "center"}}>Upload `.stk` or `.dat` file to visualize</Typography>
        <Box sx={{textAlign: "center"}}>
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
        </Box>
    </>
  );
}