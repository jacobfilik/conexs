import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Link } from "react-router-dom";

export default function SideDrawer() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {setOpen(newOpen);};

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
              <ListItem key="Molecule Viewer" disablePadding>
                <Link to={"/Conexs/"} style={{textDecoration: "none", color: "black"}}>
                    <ListItemButton>
                        <ListItemIcon><ViewInArIcon /></ListItemIcon>
                        <ListItemText primary="Molecule Viewer" />
                    </ListItemButton>
                </Link>
              </ListItem>
              <ListItem key="Graph Viewer" disablePadding>
                <Link to={"/Conexs/graph"} style={{textDecoration: "none", color: "black"}}>
                    <ListItemButton>
                        <ListItemIcon><QueryStatsIcon /></ListItemIcon>
                        <ListItemText primary="Graph Viewer" />
                    </ListItemButton>
                </Link>
              </ListItem>
          </List>
        </Box>
      );

    return <>
        <Button onClick={toggleDrawer(true)}><MenuIcon fontSize="large" /></Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    </>
}