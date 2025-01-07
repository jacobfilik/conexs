import { useState } from "react";
import Molecule3D from "./Molecule3D";
import MoleculeDataTextArea from "./MoleculeDataTextArea";
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

import axios from "axios";

const basename = import.meta.env.BASE_URL;

function MoleculeViewer() {
  const [color, setcolor] = useState("#3465A4");
  const [style, setStyle] = useState("Stick");
  const [moleculedata, setmoleculeData] = useState(
    "12\nBenzene molecule\nC   0.000000  1.402720  0.000000\nH   0.000000  2.490290  0.000000\nC  -1.214790  0.701360  0.000000\nH  -2.156660  1.245150  0.000000\nC  -1.214790 -0.701360  0.000000\nH  -2.156660 -1.245150  0.000000\nC   0.000000 -1.402720  0.000000\nH   0.000000 -2.490290  0.000000\nC   1.214790 -0.701360  0.000000\nH   2.156660 -1.245150  0.000000\nC   1.214790  0.701360  0.000000\nH   2.156660  1.245150  0.000000"
  );

  const exampleMolecules = [
    { name: "Glucose", path: "xyz/glucose.xyz" },
    { name: "Carbon Dioxide", path: "xyz/co2.xyz" },
    { name: "Water", path: "xyz/water.xyz" },
    { name: "Benzene", path: "xyz/benzene.xyz" },
    { name: "Chloroethane", path: "xyz/chloroethane.xyz" },
    { name: "Pyridine", path: "xyz/pyridine.xyz" },
    { name: "Lattice Example", path: "xyz/lattice.xyz" },
    { name: "Iron Complex", path: "xyz/fecomplex.xyz" },
    { name: "Fe(bpy)3", path: "xyz/fe(bpy)3.xyz" },
  ];

  // const getCube = () => {
  //   axios
  //     .get("https://3dmol.csb.pitt.edu/tests/test_structs/benzene-homo.cube", {
  //       headers: { "Content-Type": "application/plain" },
  //     })
  //     .then((response) => {
  //       setVolumeData(response.data);
  //     });
  // };

  const getXYZ = (path: string) => {
    axios
      .get(basename + path, {
        headers: { "Content-Type": "application/plain" },
      })
      .then((response) => {
        setmoleculeData(response.data);
      });
  };

  return (
    <Grid2 container spacing={5} height="100%">
      <Grid2 size={4}>
        <Molecule3D
          key={color}
          color={color}
          moleculedata={moleculedata}
          style={style}
          orbital={null}
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
      </Grid2>
      <Grid2 size={4}>
        <Stack>
          <MoleculeDataTextArea
            moleculedata={moleculedata}
            setmoleculeData={setmoleculeData}
          />
          <Divider variant="middle" />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ my: 1 }}>
              Examples
            </Typography>
            {exampleMolecules.map((data, index) => {
              return (
                <Button
                  variant="outlined"
                  key={index}
                  sx={{ m: 1 }}
                  value={data.name}
                  onClick={() => getXYZ(data.path)}
                >
                  {data.name}
                </Button>
              );
            })}
          </Box>
        </Stack>
      </Grid2>
      <Grid2 size={4}>
        <FormPage moleculedata={moleculedata} />
      </Grid2>
    </Grid2>
  );
}

export default MoleculeViewer;
