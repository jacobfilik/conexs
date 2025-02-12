import { Box, Button, Stack, Tooltip } from "@mui/material";
import StyleToggle from "./components/StyleToggle";
import Molecule3D from "./components/Molecule3D";
import { useState } from "react";
import VisuallyHiddenInput from "./components/VisuallyHiddenInput";

import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { Form } from "@rjsf/mui";

import { TransferFunction } from "./components/Molecule3D";

export default function OrbitalPage() {
  const [color, setcolor] = useState("#3465A4");
  const [style, setStyle] = useState("Stick");
  const [volumeData, setVolumeData] = useState<string | null>(null);
  const [volumeParams, setVolumeParams] = useState<TransferFunction>({
    positiveColor: "#FF0000",
    negativeColor: "#0000FF",
    positiveMin: 0.01,
    positiveMax: 0.1,
    negativeMin: 0.01,
    negativeMax: 0.1,
    isosurface: false,
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    console.log(file.name);

    if (file.name.endsWith(".cube")) {
      const reader = new FileReader();
      console.log("To load");
      reader.onload = function () {
        const content = reader.result as string;

        setVolumeData(content);
      };
      reader.readAsText(file); // Read the file as text
    }
  };

  const schema: RJSFSchema = {
    title: "Orbital Transfer Function",
    type: "object",
    properties: {
      positiveColor: {
        title: "Positive Color",
        type: "string",
        default: volumeParams.positiveColor,
      },
      negativeColor: {
        title: "Negative Color",
        type: "string",
        default: volumeParams.negativeColor,
      },
      positiveMin: {
        title: "Positive Min",
        type: "number",
        default: volumeParams.positiveMin,
      },
      positiveMax: {
        title: "Positive Max",
        type: "number",
        default: volumeParams.positiveMax,
      },
      negativeMin: {
        title: "Negative Min",
        type: "number",
        default: volumeParams.negativeMin,
      },
      negativeMax: {
        title: "Negative Max",
        type: "number",
        default: volumeParams.negativeMax,
      },
      isosurface: {
        title: "Show as Surface",
        type: "boolean",
        default: volumeParams.isosurface,
      },
    },
  };

  const uiSchema: UiSchema = {
    positiveColor: {
      "ui:widget": "color",
    },
    negativeColor: {
      "ui:widget": "color",
    },
  };

  const onSubmit = (formData: {
    positiveColor: string;
    negativeColor: string;
    negativeMin: number;
    negativeMax: number;
    positiveMax: number;
    positiveMin: number;
    isosurface: boolean;
  }) => setVolumeParams(formData);

  return (
    <Stack direction="row" alignItems={"center"} spacing={2} height="100%">
      <Stack>
        <Button
          variant="contained"
          role={undefined}
          tabIndex={-1}
          component="label"
        >
          Upload Cube File
          <VisuallyHiddenInput
            type="file"
            name="file1"
            onChange={handleFileUpload}
          />
        </Button>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          onSubmit={(e) => onSubmit(e.formData)}
        >
          <Box textAlign="center">
            <Button variant="contained" size="medium" type="submit">
              Update
            </Button>
          </Box>
        </Form>
      </Stack>
      <Stack height="100%" width="100%">
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
        <Molecule3D
          key={color}
          color={color}
          moleculedata={null}
          orbital={
            volumeData == null
              ? null
              : { cubeData: volumeData, transferfn: volumeParams }
          }
          style={style}
        />
      </Stack>
    </Stack>
  );
}
