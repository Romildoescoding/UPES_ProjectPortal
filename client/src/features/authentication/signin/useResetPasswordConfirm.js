import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPasswordConfirm as resetPasswordConfirmApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useResetPasswordConfirm() {
  const queryClient = useQueryClient();
  const { mutate: resetPasswordConfirm, isPending } = useMutation({
    mutationFn: resetPasswordConfirmApi,
    onError: (err) => {
      // console.log("!!!!!!!!!!ERROR OCCURREDD!!!!!!!!!!");
      // console.log("Error during Password Reset Confirm :==== ", err.message);
      toast.error("Request Failed. Please check the mail.");
    },
    onSuccess: (res) => {
      // console.log(res);
      toast.success("Request sent");
      queryClient.setQueryData(["mail-requested"], true);
    },
  });
  return { resetPasswordConfirm, isPending };
}
