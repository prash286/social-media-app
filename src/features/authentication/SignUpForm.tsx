import { TextField } from "@mui/material";
import { useState } from "react";
import useSignUp from "./useSignUp";
import CircularProgress from "@mui/material/CircularProgress";

export default function SignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [image, setImage] = useState<File[]>([]);
  const { signUp, isCreating } = useSignUp();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password || !image.length || !username) return null;
    const imageUrl: File = image[0];
    signUp({ email, password, username, imageUrl });
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const inputElement = e.target as HTMLInputElement;

    if (inputElement.files) {
      const fileList = Array.from(inputElement.files);
      setImage(fileList);
    }
  }
  return (
    <form
      className="flex flex-col gap-4 mt-4 bg-white px-8 py-8"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Username</span>
        <TextField
          value={username}
          autoComplete="off"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
          }}
          // disabled={isLoading}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Email</span>
        <TextField
          value={email}
          autoComplete="off"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
          // disabled={isLoading}
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
          // disabled={isLoading}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Avatar</span>
        <input type="file" accept="image/*" onChange={handleChange} />
      </div>
      <button className="bg-[#7e22cefa] text-white px-2 py-2 rounded-lg text-sm">
        {!isCreating ? "Sign Up" : <CircularProgress size={25} />}
      </button>
    </form>
  );
}
