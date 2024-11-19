import { Typography } from "@mui/material"
import SideDrawer from "./Components/SideDrawer"

export default function FormPage() {
    return <>
        <SideDrawer />
        <Typography variant='h1' sx={{textAlign: "center"}}>Form Page</Typography>
        <Typography variant='h4' sx={{textAlign: "center"}}>Fill in the form to build a simulation input.</Typography>
    </>
}