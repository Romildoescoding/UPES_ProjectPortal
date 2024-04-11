import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn as signInApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function useSignin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signin, isLoading } = useMutation({
    mutationFn: signInApi,
    onError: (err) => {
      console.log("Error during Signin :==== ", err.message);
    },
    onSuccess: (user) => {
      if (user.authenticated) {
        console.log("USER AUTHENTICATED");
        queryClient.setQueryData(["currentUser"], user);
        navigate("/");
      } else {
        console.log("ACCESS DENIED!");
      }
    },
  });
  return { signin, isLoading };
}
