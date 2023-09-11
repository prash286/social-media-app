// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { editProfile } from "../../services/apiAuth";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export default function useEditProfile() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const { mutate: updateProfile, isLoading } = useMutation({
//     mutationFn: ({
//       username,
//       password,
//     }: {
//       username: string;
//       password: string;
//     }) => editProfile(username, password),
//     onSuccess: () => {
//       toast.success("Profile update successfully");
//       queryClient.invalidateQueries([""]);
//     },
//   });
//   return { updateProfile, isLoading };
// }
