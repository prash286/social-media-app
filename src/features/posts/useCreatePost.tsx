import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewPost } from "../../services/apiPosts";
import toast from "react-hot-toast";

export default function useCreatePost() {
  const queryClient = useQueryClient();
  const { mutate: createPost, isLoading: isCreating } = useMutation({
    mutationFn: createNewPost,
    onSuccess: () => {
      toast.success("New post created successfully");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
  return { createPost, isCreating };
}
