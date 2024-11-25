import SideDrawer from "./Components/SideDrawer";
import '@h5web/lib/styles.css'
import { Domain, getDomain, VisCanvas, DataCurve, DefaultInteractions } from '@h5web/lib';
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { datxvalues, datyvalues, stkxvalues, stkyvalues, xdomainvalues, ydomainvalues } from "./Components/graphdata"

export default function GraphPage() {
    const [xdomain, setxDomain] = useState<Domain>();
    const [ydomain, setyDomain] = useState<Domain>();
    const [xValues, setXValues] = useState<number[]>([]);
    const [yValues, setYValues] = useState<number[]>([]);
    const [xValues2, setXValues2] = useState<number[]>([]);
    const [yValues2, setYValues2] = useState<number[]>([]);

    function stkFilePreprocessing(content: string) {
        const lines = content.split("\n");
        let newContent = "";
        for (let index = 0; index < lines.length; index++) {
            const currentLine = lines[index];
            const splitLine = currentLine.split(" ").filter((x) => x!="");
            newContent = newContent + [splitLine[0], "0.00000000", "\n", splitLine[0], splitLine[1], "\n", splitLine[0], "0.00000000", "\n"].join(" ");
        }
        
        return newContent;
    }

    const handleFileUpload1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
    
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                let content = reader.result as string;
                if (file.type == "application/hyperstudio") {
                    content = stkFilePreprocessing(content)
                }
                
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
            setYValues(yVals)
            setxDomain(getDomain(xVals));
            setyDomain(getDomain(yVals));
            console.log("xdomain", xdomain)
            console.log("ydomain", ydomain)
            console.log("xValues", xValues)
            console.log("yValues", yValues)
            console.log("xValues2", xValues2)
            console.log("yValues2", yValues2)
          };
    
          reader.readAsText(file); // Read the file as text
        }
    };

    const handleFileUpload2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            let content = reader.result as string;
            if (file.type == "application/hyperstudio") {
                content = stkFilePreprocessing(content)
            }
            
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
        
        setXValues2(xVals);
        setYValues2(yVals);
        setxDomain(getDomain(xVals));
        setyDomain(getDomain(yVals));
        };

        reader.readAsText(file); // Read the file as text
    };
    
    };

    const exampleGraph = () => {
        setxDomain(xdomainvalues);
        setyDomain(ydomainvalues);
        setXValues(stkxvalues)
        setYValues(stkyvalues)
        setXValues2(datxvalues);
        setYValues2(datyvalues);
    }

  return (
    <>
        <SideDrawer />
        <Typography variant='h1' sx={{textAlign: "center"}}>Graph Page</Typography>
        <Typography variant='h4' sx={{textAlign: "center"}}>Upload `.stk` or `.dat` file to visualize</Typography>
        <Box sx={{textAlign: "center"}}>
            <input type="file" onChange={handleFileUpload1} />
            <input type="file" onChange={handleFileUpload2} />

            {ydomain && xdomain ? ( // Abscissa refers to x axis and ordinate refers to the y axis
                <VisCanvas
                    abscissaConfig={{
                    showGrid: true,
                    visDomain: [xdomain[0], xdomain[1]]
                    }}
                    ordinateConfig={{
                    showGrid: true,
                    visDomain: [ydomain[0], ydomain[1]]
                    }}
                >
                    <DefaultInteractions />
                    <DataCurve
                        abscissas={xValues}
                        color="green"
                        ordinates={yValues}
                        visible
                    />
                    <DataCurve
                        abscissas={xValues2}
                        color="orange"
                        ordinates={yValues2}
                        visible
                    />
                </VisCanvas>
            ) : <>
                <p>Please upload a valid '.dat' file in the first and a '.stk' file in the second.</p>
                <Button variant="outlined" sx={{m:5}} onClick={exampleGraph} >Example of Graph</Button>
            </>}

        </Box>
    </>
  );
}