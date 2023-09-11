import { Box, Card, Typography } from "@mui/material";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../components/Logo";

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
          height: 500,
          width: 500,
          background: "#eef2ff",
          padding: "4vh",
          display: "grid",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <header className="flex flex-col items-center gap-2">
          <Logo />
          <Typography variant="h5" sx={{ fontWeight: "600" }} component="span">
            Login to your account
          </Typography>
        </header>
        <LoginForm />
      </Card>
    </Box>
  );
}
