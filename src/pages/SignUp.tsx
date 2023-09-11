import { Box, Card, Typography } from "@mui/material";
import SignUpForm from "../features/authentication/SignUpForm";

export default function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          height: 650,
          width: 500,
          background: "#eef2ff",
          padding: "4vh",
          display: "grid",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <header className="flex flex-col items-center gap-2">
          <Typography variant="h5" sx={{ fontWeight: "600" }} component="span">
            Register your account
          </Typography>
        </header>
        <SignUpForm />
      </Card>
    </Box>
  );
}
