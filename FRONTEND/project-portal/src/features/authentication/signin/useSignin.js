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
      console.log(user);
      if (user.authenticated) {
        console.log("USER AUTHENTICATED");
        queryClient.setQueryData(["currentUser"], user);
        if (user.role === "student") {
          navigate("/student");
        }
        if (user.role === "faculty") {
          navigate("/faculty");
        }
      } else {
        console.log("ACCESS DENIED!");
      }
    },
  });
  return { signin, isLoading };
}
