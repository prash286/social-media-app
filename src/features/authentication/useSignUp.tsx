import toast from "react-hot-toast";
import { signUp as signUpApi } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useSignUp() {
  const navigate = useNavigate();
  const { mutate: signUp, isLoading: isCreating } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success("Account created successfully");
      navigate("/login", { replace: true });
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
  return { signUp, isCreating };
}
