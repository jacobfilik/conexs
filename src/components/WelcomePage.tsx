import { Container, Typography } from "@mui/material";

function WelcomePage() {
  return (
    <Container maxWidth="md" sx={{ alignSelf: "center", p: "24px" }}>
      <Typography variant="h4" padding="24px">
        Prototype web components for user-friendly XAS simulation!
      </Typography>
    </Container>
  );
}

export default WelcomePage;
