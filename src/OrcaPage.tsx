import { Tab, Tabs, Box } from "@mui/material";
import OrbitalPage from "./OrbitalPage";
import GraphPage from "./GraphPage";
import MoleculeViewer from "./components/MoleculeViewer";
import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    //90% height to leave room for tab headers
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ height: "90%", width: "100%" }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1, height: "100%", width: "100%" }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function OrcaPage() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Input File" {...a11yProps(0)} />
        <Tab label="Data Viewer" {...a11yProps(1)} />
        <Tab label="Oribital Viewer" {...a11yProps(2)} />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <MoleculeViewer />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GraphPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <OrbitalPage />
      </CustomTabPanel>
    </Box>
  );
}
