import React, { useState } from "react";
import Molecule3D from "./Molecule3D";
import MoleculeDataTextArea from "./moleculeDataTextArea";
import {
  Box,
  Button,
  Divider,
  Grid2,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import StyleToggle from "./StyleToggle";
import FormPage from "../FormPage";

function MoleculeViewer() {
  const [color, setcolor] = useState("#3465A4");
  const [style, setStyle] = useState("Stick");
  const [moleculedata, setmoleculeData] = useState(
    "12\nBenzene molecule\nC   0.000000  1.402720  0.000000\nH   0.000000  2.490290  0.000000\nC  -1.214790  0.701360  0.000000\nH  -2.156660  1.245150  0.000000\nC  -1.214790 -0.701360  0.000000\nH  -2.156660 -1.245150  0.000000\nC   0.000000 -1.402720  0.000000\nH   0.000000 -2.490290  0.000000\nC   1.214790 -0.701360  0.000000\nH   2.156660 -1.245150  0.000000\nC   1.214790  0.701360  0.000000\nH   2.156660  1.245150  0.000000"
  );
  const moleculeTemplateList: string[] = [
    "Glucose",
    "Carbon Dioxide",
    "Water",
    "Benzene",
    "Chloroethane",
    "Pyridine",
    "Lattice Example",
    "1aof_DHE_B_1",
  ];

  const templateMolecule = (event: React.MouseEvent<HTMLInputElement>) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;

    switch (value) {
      case "Glucose":
        setmoleculeData(
          "12\nglucose from 2gbp\nC  35.884  30.895  49.120\nC  36.177  29.853  50.124\nC  37.296  30.296  51.074\nC  38.553  30.400  50.259\nC  38.357  31.290  49.044\nC  39.559  31.209  48.082\nO  34.968  30.340  48.234\nN  34.923  29.775  50.910\nO  37.441  29.265  52.113\nO  39.572  30.954  51.086\nN  37.155  30.858  48.364\nO  39.261  32.018  46.920"
        );
        break;
      case "Carbon Dioxide":
        setmoleculeData(
          "3\nCarbon Dioxide molecule\nC   0.000000  0.000000  0.000000\nO   1.160000  0.000000  0.000000\nO  -1.160000  0.000000  0.000000"
        );
        break;
      case "Water":
        setmoleculeData(
          "3\nWater molecule\nO  0.000000  0.000000  0.000000\nH  0.757000  0.586000  0.000000\nH -0.757000  0.586000  0.000000"
        );
        break;
      case "Benzene":
        setmoleculeData(
          "12\nBenzene molecule\nC   0.000000  1.402720  0.000000\nH   0.000000  2.490290  0.000000\nC  -1.214790  0.701360  0.000000\nH  -2.156660  1.245150  0.000000\nC  -1.214790 -0.701360  0.000000\nH  -2.156660 -1.245150  0.000000\nC   0.000000 -1.402720  0.000000\nH   0.000000 -2.490290  0.000000\nC   1.214790 -0.701360  0.000000\nH   2.156660 -1.245150  0.000000\nC   1.214790  0.701360  0.000000\nH   2.156660  1.245150  0.000000"
        );
        break;
      case "Chloroethane":
        setmoleculeData(
          "8\nChloroethane molecule\nC    0.0000   0.0000   0.0000\nC    1.5400   0.0000   0.0000\nH   -0.5400  -0.9270  -0.3630\nH   -0.5400   0.9270  -0.3630\nH   -0.5400   0.0000   1.0900\nH    2.0800   0.9270  -0.3630\nH    2.0800  -0.9270  -0.3630\nCl   1.5400   0.0000   1.7800"
        );
        break;
      case "Pyridine":
        setmoleculeData(
          "11\nPyridine\nC       -0.180226841      0.360945118     -1.120304970\nC       -0.180226841      1.559292118     -0.407860970\nC       -0.180226841      1.503191118      0.986935030\nN       -0.180226841      0.360945118      1.290183500\nC       -0.180226841     -0.781300882      0.986935030\nC       -0.180226841     -0.837401882     -0.407860970\nH       -0.180226841      0.360945118     -2.206546970\nH       -0.180226841      2.517950118     -0.917077970\nH       -0.180226841      2.421289118      1.572099030\nH       -0.180226841     -1.699398882      1.572099030\nH       -0.180226841     -1.796059882     -0.917077970"
        );
        break;
      case "Lattice Example":
        setmoleculeData(
          '5\nLattice="2.8910999499435217 0.0 0.0 -1.4455499749717609 2.503766001531009 0.0 0.0 0.0 12.0" size="1 1" sym_prec=0.3\nV        0.163920355   2.010556463  5.207822443\nV        1.659549808   1.146964790  2.792551218\nC        0.186758046   0.323055004  4.000202257\nO        1.641249387   1.157827410  6.208219945\nO        0.182400454   2.000036854  1.792200686'
        );
        break;
      case "1aof_DHE_B_1":
        setmoleculeData(
          "49\n1aof_DHE_B_1\nC         -3.30400       13.00300       78.18000\nC          4.35100       17.99000       81.82100\nC          0.26300       15.84100       87.88100\nC         -5.69900       13.22500       82.98300\nN         -1.12200       14.81400       80.58000\nC         -3.25700       11.57200       78.46200\nC          5.08200       16.75000       82.11900\nC          1.07600       14.64500       87.58800\nC         -6.84800       13.57900       83.41600\nN          1.18700       16.26100       81.70200\nC         -4.18400       10.68600       77.75900\nC          2.35300       19.26300       80.93000\nC         -1.09500       17.86500       87.15300\nC         -8.12300       13.05200       82.94500\nN         -2.32400       14.65900       83.25100\nC         -3.32600       13.90000       81.15700\nC          1.01300       15.26600       79.46800\nC          1.91500       17.41700       83.67400\nC         -1.86000       15.10100       85.62500\nC         -0.40200       13.89400       77.06600\nC         -4.67100       13.79900       85.99600\nO          3.50700       16.89300       79.16800\nO          1.90300       17.99600       86.58800\nC         -2.29200       14.14200       80.26600\nC          1.59200       16.07600       80.40900\nC          1.01300       16.96800       84.59700\nC         -2.66200       14.62200       84.58400\nO         -4.92100       11.14600       76.87400\nO          6.30900       16.81800       82.32700\nO          0.73300       13.55100       88.07900\nO         -9.12500       13.19300       83.66500\nC         -2.21800       13.74500       78.90700\nC          2.79000       16.91600       80.14500\nC          1.07300       17.31300       86.03600\nC         -3.96800       14.03100       84.68800\nO         -4.19400        9.49400       78.07600\nO          4.46200       15.66800       82.15600\nO          2.08500       14.75900       86.87200\nO         -8.15600       12.47700       81.84100\nC         -0.98200       14.11500       78.42900\nC          2.94800       17.83200       81.35500\nC         -0.11700       16.66200       86.70400\nC         -4.40300       13.76200       83.41200\nC         -0.28200       14.76100       79.49100\nC          1.98800       17.15800       82.32400\nC         -0.73700       15.90600       85.52600\nC         -3.35400       14.09300       82.51700\nN         -0.05800       16.14700       84.36300\nFe        -0.57700       15.48800       82.46900"
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Stack direction="row" alignItems={"center"} spacing={2}>
        <Typography variant="h4" sx={{ textAlign: "left" }}>
          ORCA XAS Input File Generator
        </Typography>
      </Stack>
      <Grid2 container spacing={2}>
        <Grid2
          offset={{ md: 1 }}
          size={5}
          sx={{ display: "grid", gridAutoRows: "50% 10%", margin: 2, gap: 0 }}
        >
          <Molecule3D
            key={color}
            color={color}
            moleculedata={moleculedata}
            style={style}
          />
          <Box sx={{ textAlign: "center" }}>
            <Tooltip title="Change Background Colour" arrow>
              <input
                style={{ margin: "50px" }}
                type="color"
                value={color}
                onChange={(e) => {
                  setcolor(e.target.value);
                }}
              />
            </Tooltip>
            <StyleToggle style={style} setStyle={setStyle} />
          </Box>
          <Box style={{ position: "relative" }}>
            <MoleculeDataTextArea
              moleculedata={moleculedata}
              setmoleculeData={setmoleculeData}
            />
          </Box>
        </Grid2>
        <Grid2 size={5}>
          <FormPage moleculedata={moleculedata} />
          <Divider variant="middle" />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ my: 5 }}>
              Molecule Examples
            </Typography>
            {moleculeTemplateList.map((data, index) => {
              return (
                <Button
                  variant="outlined"
                  key={index}
                  sx={{ m: 1 }}
                  value={data}
                  onClick={templateMolecule}
                >
                  {data}
                </Button>
              );
            })}
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}

export default MoleculeViewer;
