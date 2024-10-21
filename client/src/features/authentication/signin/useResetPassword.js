import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../../services/apiAuth";

export default function useResetPassword() {
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    // onError: (err) => {
    //   console.log("Error during Password Reset :==== ", err.message);
    // },
    // onSuccess: (res) => {
    //   console.log(res);
    // },
  });
  return { resetPassword, isPending };
}
