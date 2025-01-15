import { Box, Button, Typography } from "@mui/material";
import Form from "@rjsf/mui";
import { RJSFSchema, TitleFieldProps, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { useRef, useState } from "react";

type formProps = {
  moleculedata: string;
};

function FormPage(props: formProps) {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const [data, setData] = useState<FormData>();

  const schema: RJSFSchema = {
    title: "Simulation Parameters",
    type: "object",
    properties: {
      Technique: {
        title: "Technique",
        enum: ["XAS", "XES", "OPT"],
        default: "XAS",
      },
      Functional: {
        title: "Functional",
        type: "string",
        enum: ["BP86", "BLYP", "B3LYP RIJCOSX"],
        default: "BP86",
      },
      Basis: {
        title: "Basis",
        type: "string",
        enum: ["def2-SVP", "def2-SV(P)", "def2-TZVP"],
        default: "def2-SVP",
      },
      "Charge Value": {
        title: "Charge Value",
        type: "number",
        default: 0,
      },
      "Multiplicity Value": {
        title: "Multiplicity Value",
        type: "number",
        default: 1,
      },
      Solvent: {
        title: "Solvent",
        type: "string",
        enum: [
          "None",
          "Water",
          "Acetone",
          "Acetonitrile",
          "Ammonia",
          "Benzene",
          "CCl4",
          "CH2C12",
          "Chloroform",
          "Cyclohexane",
          "DMF",
          "DMSO",
          "Ethanol",
          "Hexane",
          "Methanol",
          "Octanol",
          "Pyridine",
          "THF",
          "Toluene",
        ],
        default: "None",
      },
      CPUs: {
        title: "Number of Cores",
        type: "number",
        default: 4,
      },
      MemoryPerCore: {
        title: "Memory per Core",
        type: "number",
        default: 3072,
        enum: [1024, 2048, 3072, 4096, 6144, 8192, 12288],
      },
    },
    dependencies: {
      Technique: {
        oneOf: [
          {
            properties: {
              Technique: {
                enum: ["XAS"],
              },
              "OrbWin[0] Start": {
                type: "number",
                default: 0,
              },
              "OrbWin[0] Stop": {
                type: "number",
                default: 0,
              },
              "OrbWin[1] Start": {
                type: "number",
                default: 0,
              },
              "OrbWin[1] Stop": {
                type: "number",
                default: 0,
              },
            },
          },
        ],
      },
    },
  };

  const uiSchema: UiSchema = {
    textArea: {
      "ui:widget": "textarea",
    },
  };

  const conexsInformation = {
    cpus: 4,
    orca_solvents: [
      { name: "None", value: [0, 0] },
      { name: "Water", value: [80.4, 1.33] },
      { name: "Acetone", value: [20.7, 1.359] },
      { name: "Acetonitrile", value: [36.6, 1.344] },
      { name: "Ammonia", value: [22.4, 1.33] },
      { name: "Benzene", value: [2.28, 1.501] },
      { name: "CCl4", value: [2.24, 1.466] },
      { name: "CH2Cl2", value: [9.08, 1.424] },
      { name: "Chloroform", value: [4.9, 1.45] },
      { name: "Cyclohexane", value: [2.02, 1.425] },
      { name: "DMF", value: [38.3, 1.43] },
      { name: "DMSO", value: [47.2, 1.479] },
      { name: "Ethanol", value: [24.3, 1.361] },
      { name: "Hexane", value: [1.89, 1.375] },
      { name: "Methanol", value: [32.63, 1.329] },
      { name: "Octanol", value: [10.3, 1.421] },
      { name: "Pyridine", value: [12.5, 1.51] },
      { name: "THF", value: [7.25, 1.407] },
      { name: "Toluene", value: [2.4, 1.497] },
    ],
  };

  function formDataProcessing(formData: {
    Technique: string;
    Functional: string;
    Basis: string;
    "Charge Value": number;
    "Multiplicity Value": number;
    Solvent: string;
    CPUs: number;
    MemoryPerCore: number;
    "OrbWin[0] Start": number;
    "OrbWin[0] Stop": number;
    "OrbWin[1] Start": number;
    "OrbWin[1] Stop": number;
  }) {
    let formOutput = "";

    if (formData.Technique == "XAS") {
      formOutput +=
        "! " + formData.Functional + " DKH2 " + formData.Basis + " SARC/J ";

      if (formData.Solvent != "None") {
        formOutput += "CPCM(" + formData.Solvent + ") ";
      }
      formOutput += "\n";
      formOutput += "%maxcore " + formData.MemoryPerCore + "\n\n";
      formOutput += "%pal nprocs " + formData.CPUs + "\n";
      formOutput += "end" + "\n\n";
      formOutput += "%tddft" + "\n";

      formOutput +=
        "orbWin[0] = " +
        formData["OrbWin[0] Start"] +
        "," +
        formData["OrbWin[0] Stop"] +
        ",-1,-1" +
        "\n";
      formOutput +=
        "orbWin[1] = " +
        formData["OrbWin[1] Start"] +
        "," +
        formData["OrbWin[1] Stop"] +
        ",-1,-1" +
        "\n";

      formOutput += "doquad true" + "\n";
      formOutput += "nroots 20" + "\n";
      formOutput += "maxdim 10" + "\n";
      formOutput += "end" + "\n\n";
    } else if (formData.Technique == "XES") {
      formOutput =
        "! UKS " + formData.Functional + " DKH2 " + formData.Basis + " SARC/J ";
      if (formData.Solvent != "None") {
        formOutput += "CPCM(" + formData.Solvent + ") ";
      }
      formOutput += "%maxcore " + formData.MemoryPerCore + "\n\n";
      formOutput += "%pal nprocs " + formData.CPUs + "\n";
      formOutput += "end" + "\n\n";
      formOutput += "%xes" + "\n";
      formOutput += "CoreOrb 0,1" + "\n";
      formOutput += "OrbOp 0,1" + "\n";
      formOutput += "DoSOC true" + "\n";
      formOutput += "Normalize true" + "\n";
      formOutput += "MDOriginAdjustMethod 1" + "\n";
      formOutput += "end" + "\n\n";
    } else if (formData.Technique == "OPT") {
      formOutput +=
        "! " + formData.Functional + " DKH2 " + formData.Basis + " SARC/J OPT";

      if (formData.Solvent != "None") {
        formOutput += "CPCM(" + formData.Solvent + ") ";
      }
      formOutput += "\n";
      formOutput += "%maxcore " + formData.MemoryPerCore + "\n\n";
      formOutput += "%pal nprocs " + formData.CPUs + "\n";
      formOutput += "end" + "\n\n";
    }

    if (formData.Solvent != "None") {
      formOutput += "%cpcm" + "\n";
      let solventArr: number[] | string[] = [];

      for (let i = 0; i < conexsInformation.orca_solvents.length; i++) {
        if (conexsInformation.orca_solvents[i]["name"] == formData.Solvent) {
          solventArr = conexsInformation.orca_solvents[i]["value"];
          break;
        }
      }
      formOutput +=
        "epsilon " + solventArr[0] + " # Dielectric constant" + "\n";
      formOutput += "refrac " + solventArr[1] + " # Refractive index" + "\n";
      formOutput += "end" + "\n\n";
    }

    formOutput +=
      "*xyz " +
      formData["Charge Value"] +
      " " +
      formData["Multiplicity Value"] +
      "\n";
    formOutput += props.moleculedata.split("\n").slice(2).join("\n");
    formOutput += "\nend";

    const blob = new Blob([formOutput], { type: "text/plain" });
    if (downloadLinkRef.current) {
      const link = downloadLinkRef.current;
      link.href = URL.createObjectURL(blob);
      link.download = "JobInput.txt";
      link.click();
    }
  }

  function TitleFieldTemplate(props: TitleFieldProps) {
    const { title } = props;
    return <Typography>{title}</Typography>;
  }

  return (
    <>
      <Box>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          templates={{ TitleFieldTemplate }}
          onChange={({ formData }) => setData(formData)}
          formData={data}
          onSubmit={({ formData }) => formDataProcessing(formData)}
        >
          <Box textAlign="center">
            <Button variant="contained" sx={{ m: 5, p: 2 }} type="submit">
              Download Input File
            </Button>
          </Box>
        </Form>
        {/* Hidden download link */}
        <a ref={downloadLinkRef} style={{ display: "none" }} />
      </Box>
    </>
  );
}

export default FormPage;
