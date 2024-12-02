import "@h5web/lib/styles.css";
import {
  Domain,
  getDomain,
  VisCanvas,
  DataCurve,
  DefaultInteractions,
  ResetZoomButton,
  TooltipMesh,
} from "@h5web/lib";
import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import { ReactElement } from "react";
import axios from "axios";


const basename = import.meta.env.BASE_URL 

export default function GraphPage() {
  const [xdomain, setxDomain] = useState<Domain>([0, 1]);
  const [ydomain, setyDomain] = useState<Domain>([0, 1]);
  const [xValues, setXValues] = useState<number[]>([0]);
  const [yValues, setYValues] = useState<number[]>([0]);
  const [xValues2, setXValues2] = useState<number[]>([0]);
  const [yValues2, setYValues2] = useState<number[]>([0]);
  const [showExample, setShowExample] = useState<boolean>(true);

  function twoColumnToTwoArray(content : string) {
    const lines = content.split("\n");
    const xVals: number[] = [];
    const yVals: number[] = [];

    lines.forEach((line) => {
      const [x, y] = line.trim().split(/\s+/); // Split by space or tabs
      if (x && y) {
        xVals.push(parseFloat(x)); // Parse x values
        yVals.push(parseFloat(y)); // Parse y values
      }
    });

    return {x: xVals, y: yVals}
  }

  function stkFilePreprocessing(content: string) {
    const lines = content.split("\n");
    let newContent = "";
    for (let index = 0; index < lines.length; index++) {
      const currentLine = lines[index];
      const splitLine = currentLine.split(" ").filter((x) => x != "");
      newContent =
        newContent +
        [
          splitLine[0],
          "0.00000000",
          "\n",
          splitLine[0],
          splitLine[1],
          "\n",
          splitLine[0],
          "0.00000000",
          "\n",
        ].join(" ");
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
          content = stkFilePreprocessing(content);
        }

        const lines = content.split("\n");
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
        setYValues(yVals);
        const xdom = getDomain(xVals);
        const ydom = getDomain(yVals);
        setxDomain(xdom ? xdom : xdomain);
        setyDomain(ydom ? ydom : ydomain);
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
          content = stkFilePreprocessing(content);
        }

        const lines = content.split("\n");
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
        const xdom = getDomain(xVals);
        const ydom = getDomain(yVals);
        setxDomain(xdom ? xdom : xdomain);
        setyDomain(ydom ? ydom : ydomain);
      };

      reader.readAsText(file); // Read the file as text
    }
  };

  const tooltipText = (x: number, y: number): ReactElement<string> => {
    return (
      <p>
        {x.toPrecision(8)}, {y.toPrecision(8)}
      </p>
    );
  };

  const fetchExampleData = () => {
    axios.all([
    axios.get(basename + "data/orca_result.txt.xes.dat",{headers: {'Content-Type': 'application/plain'}}), axios.get(basename + "data/orca_result.txt.xes.stk", {headers: {'Content-Type': 'application/plain'}})]).then(axios.spread((data1, data2) => {

    const stk = stkFilePreprocessing(data2.data);
    const dat = data1.data;

    const stk_str = stk.toString();
    const dat_str = dat.toString();

    const stk_data = twoColumnToTwoArray(stk_str)
    const dat_data = twoColumnToTwoArray(dat_str)

    const xdom = getDomain(dat_data.x);
    const ydom = getDomain(dat_data.y);
    setxDomain(xdom ? xdom : xdomain);
    setyDomain(ydom ? ydom : ydomain);
    setXValues(stk_data.x);
    setYValues(stk_data.y);
    setXValues2(dat_data.x);
    setYValues2(dat_data.y);
    setShowExample(false)

    }));

  }

  return (
    <Stack direction="row" height="100%">
      <Stack>
        <Typography variant="h3" sx={{ textAlign: "Left" }}>
          ORCA Result Viewer
        </Typography>

        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Upload `.stk` or `.dat` file to visualize
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <input type="file" onChange={handleFileUpload1} />
          <input type="file" onChange={handleFileUpload2} />
        </Box>

        {showExample &&

        <Button variant="outlined" sx={{ m: 5 }} onClick={fetchExampleData}>
          Example of Graph
        </Button>}
      </Stack>
      <VisCanvas
        abscissaConfig={{
          showGrid: true,
          visDomain: [xdomain[0], xdomain[1]],
        }}
        ordinateConfig={{
          showGrid: true,
          visDomain: [ydomain[0], ydomain[1]],
        }}
      >
        <DefaultInteractions />
        <TooltipMesh renderTooltip={tooltipText} />
        <ResetZoomButton />
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
    </Stack>
  );
}
