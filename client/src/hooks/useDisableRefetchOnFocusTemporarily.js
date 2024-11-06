import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

function useDisableRefetchOnFocusTemporarily() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: { refetchOnFocus: false },
    });

    // Re-enable refetchOnFocus when the component unmounts
    return () => {
      queryClient.setDefaultOptions({
        queries: { refetchOnFocus: true },
      });
    };
  }, [queryClient]);
}

export default useDisableRefetchOnFocusTemporarily;
