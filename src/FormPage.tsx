import { Box, Button, Typography } from "@mui/material"
import SideDrawer from "./Components/SideDrawer"
import Form from "@rjsf/mui"
import { RJSFSchema, UiSchema } from "@rjsf/utils"
import validator from '@rjsf/validator-ajv8'

export default function FormPage() {
    const schema: RJSFSchema = {
        title: "Simulation Form",
        type: 'object',
        properties: {
            "technique": {
                title: 'Technique',
                enum: [
                    "XAS",
                    "XES"
                ],
                default: "XAS"
            },
            "Function": {
                title: 'Functional',
                type: 'string',
                enum: [
                    "BP86",
                    "BLYP",
                    "B3LYP RIJCOSX"
                ],
                default: "BP86"
            },
            "Basis": {
                title: 'Basis',
                type: 'string',
                enum: [
                    "def2-SVP",
                    "def2-SV(P)",
                    "def2-TZVP"
                ],
                default: "def2-SVP"
            },
            "Charge Value":{
                title: "Charge Value",
                type: 'number',
                default: 0
            },
            "Multiplicity Value":{
                title: "Multiplicity Value",
                type: 'number',
                default: 1
            },
            "Solvent":{
                title: "Solvent",
                type: 'string',
                enum: [
                    "None"
                ],
                default: "None"
            },
            textArea: {
                title: "Overview",
                type: 'string'
            },
            "Spectrum Type": {
                title: "Spectrum Type",
                type: 'string',
                enum: [
                    "Foo",
                    "Bar"
                ]
            },
            "Start Value":{
                title: "Start Value",
                type: 'number',
                default: 0
            },
            "Stop Value":{
                title: "Stop Value",
                type: 'number',
                default: 1000
            },
            "Gaussian Broadenin":{
                title: "Gaussian Broadenin",
                type: 'number',
                default: 1
            },
        }
    }

    const uiSchema: UiSchema = {
        textArea: {
            'ui:widget': 'textarea',
        },
        'ui:submitButtonOptions': {
        props: {
            disabled: false,
            className: 'btn btn-info',
        },
        norender: false,
        submitText: 'Download',
        },
    }

    return <>
        <SideDrawer />
        <Typography variant='h1' sx={{textAlign: "center"}}>Form Page</Typography>
        <Typography variant='h4' sx={{textAlign: "center"}}>Fill in the form to build a simulation input.</Typography>
        <Box sx={{pr:30, pl:30}}>
            <Form schema={schema} uiSchema={uiSchema} validator={validator}>
                <Box textAlign="center">
                    <Button variant="contained" size="large" sx={{m: 5, p:2}}><Typography variant='h5'>Download</Typography></Button>
                </Box>
            </Form>
        </Box>

    </>
}