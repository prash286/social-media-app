import { TextField } from "@mui/material";
import { useState } from "react";
import useLogin from "./useLogin";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return null;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <form
      className="flex flex-col gap-4 mt-4 bg-white px-8 py-8"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Email</span>
        <TextField
          value={email}
          autoComplete="off"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Password</span>
        <TextField
          type="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
          disabled={isLoading}
        />
      </div>
      <button className="bg-[#7e22cefa] text-white px-2 py-2 rounded-lg text-sm">
        {!isLoading ? "Login" : <CircularProgress size={25} />}
      </button>

      <div className="flex justify-center">
        <span>
          New user{" "}
          <Link to="/signup" className="text-blue underline">
            click here
          </Link>
        </span>
      </div>
    </form>
  );
}
