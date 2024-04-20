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
        // document.cookie =
        //   "remember_email=" +
        //   user.email +
        //   "; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/";
        // document.cookie =
        //   "remember_password=" +
        //   user.password +
        //   "; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/";
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
