import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn as signInApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function useSignin() {
  const queryClient = useQueryClient();

  const { mutate: signin, isPending } = useMutation({
    mutationFn: signInApi,
    onError: (err) => {
      console.log("Error during Signin :==== ", err.message);
    },
    onSuccess: (user) => {
      console.log(user);
      if (user.data.authenticated) {
        console.log("USER AUTHENTICATED");
        // queryClient.setQueryData(["user"], user);
      } else {
        console.log("ACCESS DENIED!");
      }
    },
  });
  return { signin, isLoading: isPending };
}
