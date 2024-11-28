import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Link } from "react-router-dom";

export default function SideDrawer() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem key="Input Generator" disablePadding>
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <ListItemButton>
              <ListItemIcon>
                <ViewInArIcon />
              </ListItemIcon>
              <ListItemText primary="Input Generator" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="esult Viewer" disablePadding>
          <Link
            to={"/graph"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <QueryStatsIcon />
              </ListItemIcon>
              <ListItemText primary="Result Viewer" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon fontSize="large" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
