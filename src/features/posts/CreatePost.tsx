import { Card, TextField, Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";
import useCreatePost from "./useCreatePost";
import getUserDetails from "../../utils/localStorageData";

export default function CreatePost() {
  const [image, setImage] = useState<File[]>([]);
  const [description, setDescription] = useState<string>("");
  const { createPost, isCreating } = useCreatePost();

  const {
    avatarUrl,
    username,
    userId,
  }: { username: string; avatarUrl: string; userId: string } = getUserDetails();

  let objectURL: string = "";

  if (image.length > 0) {
    objectURL = URL.createObjectURL(image[0]);
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const inputElement = e.target as HTMLInputElement;

    if (inputElement.files) {
      const fileList = Array.from(inputElement.files);
      setImage(fileList);
    }
  }

  function handleSubmit() {
    if (description !== "") {
      const newPost: {
        imageUrl: File | null;
        description: string;
        avatarUrl: string;
        username: string;
        userId: string;
      } = {
        imageUrl: image.length > 0 ? image[0] : null,
        description: description,
        avatarUrl,
        username,
        userId,
      };
      createPost(newPost, {
        onSuccess: () => {
          setDescription("");
          setImage([]);
          URL.revokeObjectURL(objectURL);
        },
      });
    }
  }

  return (
    <Card className="mb-4 grid grid-rows-[0.6fr_auto] px-2 py-2">
      <section className="grid grid-cols-[1fr_auto] gap-2 items-center">
        <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
          <img
            src={avatarUrl}
            alt="logo"
            className="w-12 aspect-[1] rounded-full border border-solid border-indigo-500"
          />
          <TextField
            autoComplete="off"
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {objectURL && (
          <div>
            <img
              src={objectURL}
              alt={image[0].name}
              className="w-12 aspect-[1]"
            />
          </div>
        )}
      </section>
      <section className="flex justify-between items-center text-sm px-2 pt-1">
        <div className="cursor-pointer">
          <input
            type="file"
            id="addImage"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
          <label
            htmlFor="addImage"
            className="cursor-pointer flex gap-1 items-center"
          >
            <ImageIcon className="text-[#be55be]" />
            <span>Add Image</span>
          </label>
        </div>
        <Button
          disabled={isCreating}
          variant="contained"
          size="small"
          onClick={handleSubmit}
        >
          Add Post
        </Button>
      </section>
    </Card>
  );
}
