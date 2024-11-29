import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import { Tooltip } from '@mui/material';

type styleProps = {
  style: string,
  setStyle: (style: string)=> void
}

export default function StyleToggle(props: styleProps) {

  const handleStyle = (_event: React.MouseEvent<HTMLElement>, newStyle: string) => {
    if (newStyle !== null) {
      props.setStyle(newStyle);
    }
  };

  return (
    <ToggleButtonGroup
      value={props.style}
      exclusive
      onChange={handleStyle}
      aria-label="Style Choice"
    >
      <Tooltip title="Stick Style" arrow>
        <ToggleButton value="Stick" aria-label="Stick">
          <HorizontalRuleOutlinedIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Sphere Style" arrow>
        <ToggleButton value="Sphere" aria-label="Sphere">
          <CircleOutlinedIcon />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}